export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "solving-out-of-order-webhooks-smicos",
    title: "Solving Out-of-Order Webhooks and Retries in Real-Time Messaging",
    description: "How we used idempotency keys and message timestamps to guarantee message order and prevent duplicates in a multi-channel SaaS inbox.",
    date: "2026-06-13",
    readTime: "5 min read",
    category: "Backend Engineering",
    content: "# Solving Out-of-Order Webhooks and Retries in Real-Time Messaging\n\nWhen building **Smicos**, a real-time customer engagement platform, one of our biggest engineering challenges was integrating webhooks from multiple messaging channels (Facebook Messenger, WhatsApp, Instagram). Because these platforms process millions of events per second, they do not guarantee in-order delivery of webhooks.\n\nThis non-deterministic delivery, coupled with automatic webhook retries during network blips, frequently led to:\n- **Out-of-order messages**: Users or support agents seeing replies in the wrong sequence.\n- **Duplicate tickets**: Multiple agents assigned to the same conversation due to retried webhook payloads.\n- **State corruption**: Older status updates overwriting newer ones.\n\nHere is how we designed a bulletproof system to handle out-of-order webhooks and ensure zero lead loss.\n\n## 1. Using Idempotency Keys for Webhook Retries\nTo prevent duplicate side-effects (like creating duplicate message records or triggering multiple CRM syncs), we implemented an **idempotency layer**.\n\nFor each incoming webhook, we extract a unique identifier provided by the third-party platform (such as WhatsApp's `message_id` or Messenger's `mid`). \nBefore processing the payload:\n1. We attempt to acquire a lock in Redis using the message ID.\n2. If the message ID already exists in our processed cache, we discard the payload and return a `200 OK` immediately to acknowledge the retry.\n3. If it is new, we store the ID with a TTL and proceed to queue the job.\n\nThis completely eliminated duplicate entries during high-frequency API retries.\n\n## 2. Resolving Out-of-Order Delivery via Message Timestamps\nEven with idempotency keys, webhooks can arrive out of order (e.g., Message B arrives before Message A). To handle sequencing:\n- We track the source-of-truth **message timestamp** (`sent_at`) from the third-party payload, not the database insertion time.\n- In our message routing engine, we verify if the incoming message's `sent_at` timestamp is older than the last recorded message in that conversation thread.\n- If it is older, the message is inserted historically but does **not** trigger real-time routing updates or alter the conversation's \"unread\" status, preventing agent inbox confusion.\n\n## 3. Database Locks on Thread Routing\nUnder high concurrency (multiple events hitting the server for the same conversation thread at once), race conditions can occur. We implemented **pessimistic locking** on the database thread record:\n\n```php\nDB::transaction(function () use ($threadId) {\n    $thread = Thread::where('id', $threadId)->lockForUpdate()->first();\n    // Safely assign agent and route message\n});\n```\n\nThis guarantees that only one webhook process can read and update the routing state of a specific conversation at a time, ensuring reliable routing.",
  },
  {
    id: "2",
    slug: "preventing-double-bookings-concurrency",
    title: "Preventing Double Bookings: Database Locking for High-Concurrency Scheduling",
    description: "How to use pessimistic locking and unique constraints to prevent race conditions and double bookings in scheduling workflows.",
    date: "2026-05-18",
    readTime: "6 min read",
    category: "System Design",
    content: "# Preventing Double Bookings: Database Locking for High-Concurrency Scheduling\n\nIn scheduling systems, the \"double booking\" problem is a classic race condition known as **Time-of-Check to Time-of-Use (TOCTOU)**. If two users request the same slot at the exact same moment, both transactions check availability, see that the slot is open, and write their bookings—resulting in an oversold slot.\n\nHere is how to design a backend that guarantees concurrency safety.\n\n## The Flawed Check-then-Write Pattern\nA standard naive implementation looks like this:\n1. Query availability: `SELECT COUNT(*) FROM bookings WHERE slot_id = 10`\n2. If count is 0, insert booking: `INSERT INTO bookings (user_id, slot_id) VALUES (42, 10)`\n\nUnder concurrent load, two requests will execute step 1 simultaneously, both get `0`, and both proceed to write to step 2.\n\n## Solution 1: Pessimistic Locking (SELECT ... FOR UPDATE)\nTo prevent other transactions from reading or writing the selected slot until the current transaction is finished, use a pessimistic lock:\n\n```sql\nSTART TRANSACTION;\n\n-- Lock the slot row so no other request can check it\nSELECT * FROM slots WHERE id = 10 FOR UPDATE;\n\n-- Verify if already booked\nSELECT COUNT(*) FROM bookings WHERE slot_id = 10;\n\n-- Insert if free\nINSERT INTO bookings (user_id, slot_id) VALUES (42, 10);\n\nCOMMIT;\n```\n\nWith `FOR UPDATE`, the second transaction blocks and waits at the first query until the first transaction commits or rolls back, ensuring strict serialization.\n\n## Solution 2: Unique Index Constraints\nFor absolute safety, backing up your database logic with a unique constraint is crucial. \nBy defining a unique index on `slot_id` (or a composite index on `room_id` and `booking_time`):\n\n```sql\nALTER TABLE bookings ADD UNIQUE KEY unique_booking_slot (slot_id);\n```\n\nEven if a race condition somehow bypasses the application code layer, the database engine will reject the second insert with a duplicate key error, which the backend can catch and return as a clean `409 Conflict` response to the user.",
  },
  {
    id: "3",
    slug: "live-agent-routing-redis",
    title: "Designing a Real-Time Live-Agent Routing Engine",
    description: "A deep dive into building concurrent ticket-to-agent routing engines with priority queues, agent state machines, and heartbeat listeners.",
    date: "2026-04-12",
    readTime: "7 min read",
    category: "Backend Engineering",
    content: "# Designing a Real-Time Live-Agent Routing Engine\n\nIn customer support platforms, routing conversations to available agents efficiently and fairly requires a sophisticated matching system. If two agents are assigned the same conversation, or if an agent goes offline while a ticket is leased to them, customer experience breaks down.\n\nHere is the architecture behind our live-agent routing engine.\n\n## 1. Agent State Machine\nAn agent's state is dynamic, transitioning between `Online`, `Busy`, `Away`, and `Offline`. We represent agent availability using a Redis Hash:\n- **`agent:active_count`**: Tracks how many active conversations are currently assigned to the agent.\n- **`agent:max_capacity`**: The maximum concurrent tickets an agent can handle.\n\n## 2. Queue-Based Assignment with Redis\nWhen a new conversation requires routing, it is added to a Redis sorted set (`routing_queue`) where the score represents priority (based on customer wait time and tier).\n\nA worker constantly processes the queue:\n1. Fetch the highest priority ticket.\n2. Query available online agents whose current active count is less than their max capacity.\n3. Acquire an atomic lock on the selected agent using Redis `SETNX` to prevent double-assignment.\n4. Update the ticket's status and assign it to the agent.\n\n## 3. Handling Agent Disconnections (Heartbeats)\nIf an agent loses connection or closes their browser tab, tickets assigned to them could get stuck. \n- Agents send a periodic ping (heartbeat) every 10 seconds via WebSockets.\n- Redis stores this ping with a TTL.\n- If a heartbeat expires, a background scheduler releases the agent's active tickets back into the `routing_queue` for other agents to claim, guaranteeing zero lost conversations.",
  },
  {
    id: "4",
    slug: "optimizing-mysql-indexing",
    title: "Optimizing MySQL Indexes for High-Traffic Query Paths",
    description: "How to analyze query plans, avoid index merge overhead, and design optimal composite indexes for high-throughput SaaS databases.",
    date: "2026-03-05",
    readTime: "8 min read",
    category: "Databases",
    content: "# Optimizing MySQL Indexes for High-Traffic Query Paths\n\nIn high-traffic applications, database query latency is the most common scaling bottleneck. Often, developers add indexes blindly, leading to write performance degradation and unused index bloat. Here is how I approached optimizing query paths to reduce MySQL latency by 40%.\n\n## 1. Demystifying EXPLAIN Plans\nBefore writing any index, analyze how MySQL executes the query using `EXPLAIN`:\n\n```sql\nEXPLAIN SELECT id, status, created_at \nFROM customer_leads \nWHERE agent_id = 45 AND status = 'active' \nORDER BY created_at DESC;\n```\n\nLook for:\n- **`type`**: Avoid `ALL` (full table scan) and aim for `ref` or `range`.\n- **`rows`**: Represents the number of rows MySQL estimates it must examine.\n- **`Extra`**: Watch out for `Using filesort` or `Using temporary`, which indicate inefficient ordering/grouping.\n\n## 2. Designing Optimal Composite Indexes\nWhen querying on multiple columns, a single composite index is far more efficient than multiple single-column indexes. Order of columns in the composite index matters (Leftmost Prefix Rule):\n1. **Equality columns first**: `agent_id = 45` and `status = 'active'`\n2. **Range / Sort columns last**: `created_at DESC`\n\nFor the query above, the optimal index is:\n```sql\nCREATE INDEX idx_agent_status_created ON customer_leads (agent_id, status, created_at);\n```\nThis allows MySQL to filter and sort the rows using the index tree directly, eliminating the expensive filesort step entirely.",
  },
];
