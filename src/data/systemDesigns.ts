import { Server, ShieldAlert, Activity, LucideIcon } from "lucide-react";

export interface SystemDesignItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  chart: string;
  tradeoffs: string[];
}

export const systemDesigns: SystemDesignItem[] = [
  {
    id: "ad-publish",
    slug: "ad-publish",
    title: "AD. Publish: At-Least-Once Task Worker Engine",
    description: "An event-driven task worker engine designed to execute high-reliability publishing workflows with at-least-once delivery guarantees under network instability.",
    icon: Server,
    chart: `flowchart TD
    Client[Client / Ingress API] -->|HTTP POST Payload| Gateway[FastAPI Gateway]
    
    Gateway -->|1. Idempotency Check: SETNX / Unique Key| Redis[(Redis Cache)]
    Gateway -->|2. Transactional Write| DB[(PostgreSQL State & Outbox Table)]
    
    DB -->|3. Outbox Relay Poller| Stream[Redis Streams / Queue]
    
    Stream -->|4. Consumer Group Dispatch| Workers[Stateless Worker Pool]
    
    Workers -->|5. Execute Step & Checkpoint State| DB
    Workers -->|6. Retry & Backoff on Failure| Stream
    Workers -->|7. Max Retries Exhausted| DLQ[(Dead Letter Queue / DLQ)]

    classDef default fill:#ffffff,stroke:#000000,stroke-width:1.5px,color:#000000;
    classDef storage fill:#f4f4f4,stroke:#000000,stroke-width:1.5px,color:#000000;

    class Redis,DB,DLQ storage;`,
    tradeoffs: [
      "**Redis Streams vs. Standard Queues:** Selected Redis Streams over standard list queues to leverage consumer groups, enabling load balancing across multiple workers with native acknowledgment states (`ACK`).",
      "**At-Least-Once Guarantee:** Workers do not acknowledge the stream event until downstream calls return success. If a worker crashes mid-task, the event is re-delivered via lease-expiration listeners.",
      "**Deduplication Strategy:** Implemented a Redis-based signature check (`SETNX` with a 24-hour TTL) at the ingress gateway to drop duplicate payloads during network retry storms."
    ]
  },
  {
    id: "ad-sentry",
    slug: "ad-sentry",
    title: "AD. Sentry: High-Throughput Log Ingestion & Threat Telemetry",
    description: "An out-of-band log auditing platform designed to aggregate error logs and compile automated SLA compliance reports without degrading hot paths.",
    icon: ShieldAlert,
    chart: `flowchart TD
    Apps[App Services] -->|Tenant Logs| Gateway[FastAPI Ingress]
    Gateway -->|Rate Limit & Validate| Redis[(Redis Cluster)]
    Gateway -->|Buffer Logs| Queue[Redis Streams / Kafka]
    
    Queue -->|Async Consumption| Worker[Processing Workers]
    Worker -->|Deduplicate| Redis
    Worker -->|Batch Insert| DB[(PostgreSQL)]
    Worker -->|Archival Parquet| S3[(S3 Storage)]
    
    DB --> Dashboard[React Dashboard & Alerts]
    S3 --> Reports[PDF Audit Engine]

    classDef default fill:#ffffff,stroke:#000000,stroke-width:1.5px,color:#000000;
    classDef database fill:#f5f5f5,stroke:#000000,stroke-width:1.5px,color:#000000,stroke-dasharray: 0;

    class Redis,DB,S3 database;`,
    tradeoffs: [
      "**Log Signature Deduplication:** Used MD5 pattern signatures to normalize dynamic logs (e.g. stripping specific IDs). This groups identical errors into a single entity, reducing DB insert pressure by up to 90% during outage cascades.",
      "**Backpressure Enforcement:** The API gateway uses a Redis-backed token bucket rate-limiter. If log volume exceeds thresholds, it rejects logs with `HTTP 429` (Too Many Requests) to safeguard database storage.",
      "**Out-of-Band Compilers:** SLA analytical reports (PDF compilation) are decoupled from the ingest path entirely. Report generation executes asynchronously to avoid CPU starvation on the web server."
    ]
  },
  {
    id: "ad-sentinel",
    slug: "ad-sentinel",
    title: "AD. Sentinel: Telemetry, Audit & Job Execution Engine",
    description: "An asynchronous telemetry and reliability platform for service log ingestion, threat risk score computation, SLA audit exports, and async job state coordination.",
    icon: Activity,
    chart: `flowchart TD
    Sources[Telemetry Sources & Ingress API] -->|Log Event / Job Exec| Gateway[FastAPI Backend Service]
    
    Gateway -->|Rate-Limiter & State| Redis[(Redis State & Cache)]
    Gateway -->|Cortex SOP Search & AI Complete| Snowflake[(Snowflake DB & Cortex AI)]
    
    Snowflake -->|Threat Risk & SOP RAG Context| Copilot[AI Copilot & SLA Audit Compiler]
    Copilot -->|Directives & Alerts| Engine[Multi-Channel Job Execution Engine]
    
    Engine --> Dashboard[Live EOC Dashboard & Map]

    classDef default fill:#ffffff,stroke:#000000,stroke-width:1.5px,color:#000000;
    classDef storage fill:#f4f4f4,stroke:#000000,stroke-width:1.5px,color:#000000;

    class Redis,Snowflake storage;`,
    tradeoffs: [
      "**Structured Log Aggregation & Threat Scoring:** Implemented structured data ingestion pipelines that aggregate log events to compute dynamic threat risk scores without causing database write saturation.",
      "**Async Job Execution & State Coordination:** Built a state coordination engine with worker lease management and Redis heartbeat pings to ensure operational correctness under network blips, worker crashes, and rate limits.",
      "**Out-of-Band AI Copilot & Audit Decoupling:** Decoupled AI Copilot telemetry analysis and PDF SLA audit exports from the ingress path to maintain low API latency during high-throughput log surges."
    ]
  }
];
