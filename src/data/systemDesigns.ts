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
    chart: `graph TD
    Client[Client / Ingress API] -->|HTTP POST Payload| Gateway[FastAPI Gateway]
    Gateway -->|Deduplicate: SETNX 24h| RedisCache[(Redis Cache)]
    Gateway -->|Publish Event| RedisStream[(Redis Streams: Consumer Group)]
    RedisStream -->|Acknowledge / Consume| Workers[Stateless Worker Pool]
    Workers -->|Process & Send| Channels[Downstream Pub Channels]
    Workers -->|Failed Events| DLQ[(Dead Letter Queue)]
    Workers -->|Update State| PostgreSQL[(PostgreSQL State Tracking)]`,
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
    chart: `graph TD
    AppLogs[Application Error Logs] -->|Stream Logs| Gateway[FastAPI Ingress]
    Gateway -->|Rate-Limiter: Token Bucket| RedisLimiter[(Redis Limiter)]
    Gateway -->|Log Normalization MD5| Deduplicator[Deduplication Layer]
    Deduplicator -->|Async Batch Writes| PostgreSQL[(PostgreSQL Store)]
    PostgreSQL -->|Out-of-band Compilation| PDFCompiler[Analytical PDF Compiler]
    PDFCompiler -->|Generate SLA Report| Admin[SLA Dashboard]`,
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
    chart: `graph TD
    Client[Telemetry Sources / Ingress API] -->|Log Event / Job Exec| Gateway[FastAPI Ingress]
    Gateway -->|Rate-Limiter: Token Bucket| RedisCache[(Redis State & Rate Limiter)]
    Gateway -->|Async Ingest Pipeline| Services[Audit & Telemetry Services]
    Services -->|State Coordination & Leases| JobEngine[Job Execution Engine]
    Services -->|Structured Data Ingestion| PostgreSQL[(PostgreSQL Audit Store)]
    PostgreSQL -->|Threat Risk Computation| Copilot[AI Copilot & SLA Audit Compiler]
    Copilot -->|Operational Insights & SLA Reports| Dashboard[Live Dashboard / Render Demo]`,
    tradeoffs: [
      "**Structured Log Aggregation & Threat Scoring:** Implemented structured data ingestion pipelines that aggregate log events to compute dynamic threat risk scores without causing database write saturation.",
      "**Async Job Execution & State Coordination:** Built a state coordination engine with worker lease management and Redis heartbeat pings to ensure operational correctness under network blips, worker crashes, and rate limits.",
      "**Out-of-Band AI Copilot & Audit Decoupling:** Decoupled AI Copilot telemetry analysis and PDF SLA audit exports from the ingress path to maintain low API latency during high-throughput log surges."
    ]
  }
];
