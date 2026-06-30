export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  featuredDetails?: {
    problem: string;
    architecture: string;
    challenges: string;
    solutions: string;
    impact: string;
  };
}

export const projects: Project[] = [
  {
    id: "smicos",
    title: "Smicos",
    description:
      "AI customer engagement SaaS platform centralizing leads and support tickets from 8+ messaging channels into a single real-time workspace.",
    tech: [
      "Laravel",
      "Vue.js",
      "MySQL",
      "Redis",
      "AWS",
      "WebSockets",
      "Docker",
    ],
    featured: true,
    featuredDetails: {
      problem:
        "Fragmented customer communications across channels resulted in missed sales opportunities, duplicate agent assignments, and race conditions during simultaneous booking requests.",
      architecture:
        "Unified event gateway built with Laravel and Redis queues, using WebSockets for real-time bi-directional agent-to-customer communication.",
      challenges:
        "Handling out-of-order webhook delivery and double bookings from concurrent clicks.",
      solutions:
        "Implemented organization-scoped Redis locks to serialize mutative events, alongside atomic database transaction constraints.",
      impact:
        "Supported 10K+ concurrent WebSocket connections, successfully processed 50K+ daily events, and reduced database query latency by ~40% through indexing optimization.",
    },
    demo: "https://smicos.com",
  },
  {
    id: "ad-publish",
    title: "AD. Publish",
    description:
      "An event-driven task worker engine designed to execute high-reliability publishing workflows with at-least-once delivery guarantees.",
    tech: ["Python", "FastAPI", "Docker", "Redis", "PostgreSQL"],
    github: "https://github.com/zerexei/posexei",
    demo: "https://ad-technology-inc.github.io/publish",
    featuredDetails: {
      problem:
        "Network instability and transient API outages from downstream publishing channels resulted in dropped payloads and untraceable failures.",
      architecture:
        "FastAPI gateway, Redis Streams consumer groups, stateless Python worker pools, and PostgreSQL schema state tracking.",
      challenges:
        "Worker node crashes (lease expirations) and duplicate deliveries.",
      solutions:
        "Implemented worker leases, request deduplication via Redis SET NX (24h TTL), token bucket rate-limiters, and Dead Letter Queues (DLQ).",
      impact:
        "Achieved structured failure isolation; zero data loss during simulated third-party API capacity drops and worker crashes.",
    },
  },
  {
    id: "ad-sentry",
    title: "AD. Sentry",
    description:
      "An independent log ingestion and threat telemetry auditing platform that aggregates application events and compiles automated SLA compliance reports.",
    tech: ["React.js", "Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/AD-Technology-Inc/sentry",
    demo: "https://ad-technology-inc.github.io/Sentry",
    featuredDetails: {
      problem:
        "Log ingestion surges during upstream application errors caused database write saturation, high alert noise, and CPU exhaustion.",
      architecture:
        "Non-blocking FastAPI Ingress, Redis Token-Bucket rate-limiter, SQLAlchemy 2.0 AsyncPG connections, and out-of-band analytical PDF compilers.",
      challenges:
        "Processing millions of logs without storage saturation or duplicate alerts.",
      solutions:
        "Implemented regex-based log pattern normalization converting dynamic logs into deterministic MD5 signatures, grouping duplicate alerts into single issues.",
      impact:
        "Reduced downstream alert volume by aggregating logs, enforced gateway-level backpressure (HTTP 429), and isolated report generation from the hot ingest path.",
    },
  },
  {
    id: "ad-routine",
    title: "AD. Routine",
    description:
      "A scheduling engine and routine coordinator prioritizing state-machine correctness and deterministic resource allocation.",
    tech: ["Laravel", "Redis", "PostgreSQL"],
    github: "https://github.com/AD-Technology-Inc/routine",
    featuredDetails: {
      problem:
        "Overlapping scheduler runs caused duplicate cron-style events and thread conflicts, corrupting calendar states.",
      architecture:
        "Laravel scheduling layer, Redis-backed synchronization locks, PostgreSQL relational data store.",
      challenges:
        "Handling schedule generation requests that exceed daily time budgets.",
      solutions:
        "Configured composite unique database constraints (routine_id, date) to catch duplicate writes at the storage layer, combined with a greedy knapsack packing algorithm.",
      impact:
        "Eliminated calendar state corruption with absolute database-enforced scheduling constraints.",
    },
  },
  {
    id: "observability",
    title: "Observability Stack",
    description:
      "A centralized monitoring setup utilizing OpenTelemetry, Prometheus, and Grafana to track backend application performance, trace latency, and monitor error rates in real-time.",
    tech: [
      "FastAPI",
      "OpenTelemetry",
      "Grafana",
      "Prometheus",
      "Loki",
      "Tempo",
    ],
    github: "https://github.com/zerexei/observability",
  },
  {
    id: "p2p-transfer",
    title: "P2P File Transfer",
    description:
      "A peer-to-peer web tool built with WebRTC and React to enable direct, secure, and serverless file transfers between browsers.",
    tech: ["TypeScript", "React.js", "Peer.js", "WebRTC"],
    github: "https://github.com/zerexei/peer-to-peer-file-sharing-app",
  },
  {
    id: "php-core",
    title: "PHP-Core Framework",
    description:
      "A lightweight, custom PHP MVC framework developed to implement core dependency injection, request-response routing, and middleware pipelines.",
    tech: ["PHP", "MVC", "OOP", "System Design"],
    github: "https://github.com/zerexei/php-core",
  },
  {
    id: "botman-drivers",
    title: "BotMan Driver",
    description:
      "API integration drivers extending the BotMan framework, enabling messaging connections with Web, Messenger, Viber, and WhatsApp.",
    tech: ["PHP", "BotMan", "APIs", "Webhooks"],
    github: "https://github.com/zerexei/botman-drivers",
  },
];
