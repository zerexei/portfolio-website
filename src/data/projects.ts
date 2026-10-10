export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  hackathon?: string[];
  screenshots?: {
    thumbnail: string;
    caption: string;
  }[];
  featuredDetails?: {
    problem: string;
    architecture: string;
    challenges: string;
    solutions: string;
    impact: string;
  };
}

export const projects: Project[] = [
  // ─── Featured System Case Studies (Original Order) ───
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
        "Out-of-order webhook delivery and concurrent clicks on the same booking slot caused race conditions leading to double-charged reservations.",
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
      "Distributed asynchronous job execution and state coordination engine built to guarantee operational correctness under worker node crashes, network failures, and downstream API rate limiting.",
    tech: ["Python", "FastAPI", "Redis", "PostgreSQL", "OpenTelemetry", "Grafana", "Traefik", "Docker"],
    github: "https://github.com/AD-Technology-Inc/publish",
    demo: "https://ad-technology-inc.github.io/publish",
    featuredDetails: {
      problem:
        "Worker crashes, queue redelivery, and downstream 429s cause silent data loss and duplicate posts in distributed publishing pipelines.",
      architecture:
        "FastAPI gateway → Redis Streams consumer groups → stateless workers with lease locks, SET NX idempotency, and PostgreSQL step checkpoints. Failed jobs route to isolated DLQs.",
      challenges:
        "Five failure modes each needing its own fix: SIGKILL mid-job, redelivery duplication, 429 cascades, partial pipeline crashes, and poison message blocks.",
      solutions:
        "Lease + XAUTOCLAIM recovery. Redis SET NX idempotency (24h TTL). PostgreSQL step checkpoints on retry. DLQ isolation with replay. Jittered backoff (1s → 125s) via ZSET.",
      impact:
        "Zero data loss under crashes, 429 floods, and duplicate storms. FailureSimulator validates every recovery path before production.",
    },
  },
  {
    id: "ad-sentry",
    title: "AD. Sentry",
    description:
      "An independent log ingestion and threat telemetry auditing platform that aggregates application events and compiles automated SLA compliance reports.",
    tech: ["React.js", "Python", "FastAPI", "PostgreSQL", "Redis", "ReportLab", "Traefik", "Docker"],
    github: "https://github.com/AD-Technology-Inc/sentry",
    demo: "https://ad-technology-inc.github.io/Sentry",
    screenshots: [
      { thumbnail: "/portfolio/sentry/4. dashboard.png", caption: "Threat Severity & Uptime Dashboard" },
      { thumbnail: "/portfolio/sentry/5. log explorer.png", caption: "High-Speed Log Explorer" },
      { thumbnail: "/portfolio/sentry/6. issues.png", caption: "Fingerprinted Incident Clusters" },
      { thumbnail: "/portfolio/sentry/7. alerts.png", caption: "Telemetry Alert Rule Triggers" },
      { thumbnail: "/portfolio/sentry/8. reports.png", caption: "Executive SLA Audit Reports" },
    ],
    featuredDetails: {
      problem:
        "Logs scattered across services, threat severity is guesswork, and SLA reports are built manually after incidents instead of continuously.",
      architecture:
        "Decoupled ingestion gateway (FastAPI + Redis + PostgreSQL) feeds an out-of-band Audit Engine that scores threats and compiles PDF SLA reports via ReportLab.",
      challenges:
        "Staying online under ingestion spikes, deduplicating millions of noisy log lines, and producing stakeholder-ready SLA reports — not raw dumps.",
      solutions:
        "Redis token-bucket backpressure. MD5 normalization deduplicates logs into issues. Calibrated risk formula (Impact × Likelihood + Log(Freq)) scores 0–10. PDFs compiled off-path.",
      impact:
        "Live threat-scored issue explorer, automated SLA reports ready to share, and an ingest gateway that stays online — reactive to continuous auditing.",
    },
  },
  {
    id: "ad-sentinel",
    title: "AD. Sentinel",
    description:
      "An AI-powered Emergency Operations Copilot built with Snowflake CoCo CLI that assists disaster response agencies in assessing flood risks, recommending tactical directives, and dispatching audited multi-channel public warnings.",
    tech: ["Python", "FastAPI", "React.js", "Snowflake", "Celery", "Redis", "WebSockets"],
    github: "https://github.com/AD-Technology-Inc/sentinel",
    demo: "https://sentinel-ai-24ck.onrender.com",
    screenshots: [
      { thumbnail: "/portfolio/sentinel/1. app.png", caption: "Emergency Operations Command Console" },
      { thumbnail: "/portfolio/sentinel/2. problem - solution.png", caption: "Risk Telemetry & Sensor Models" },
      { thumbnail: "/portfolio/sentinel/3. flood incident walkthrough.png", caption: "Tactical Response Wizard" },
      { thumbnail: "/portfolio/sentinel/4. architecture.png", caption: "Audit Pipeline Architecture" },
      { thumbnail: "/portfolio/sentinel/5. agent skills specifications.png", caption: "Agent Function Calling Specs" },
    ],
    hackathon: [
      "Snowflake CoCo CLI Hackathon 2026",
      "Gen AI Academy APAC Edition",
    ],
    featuredDetails: {
      problem:
        "Disaster commanders manually collate weather, sensor, and shelter data from separate systems before issuing warnings — delays that cost lives.",
      architecture:
        "Snowflake CoCo CLI agent with six skills (flood risk, population impact, alert generation, dispatch). FastAPI + Cortex LLM grounded by RAG over official SOPs. Celery + Redis + WebSockets.",
      challenges:
        "Grounding AI directives in real SOPs from scattered telemetry, enforcing hard alert thresholds, with mandatory human approval before any broadcast.",
      solutions:
        "Cortex Search RAG grounds responses to official SOPs. Job Execution Engine retries guarantee delivery. Human Operator Guardrail blocks false alarms.",
      impact:
        "Live sensor telemetry flows into an AI risk engine that identified 28,000 affected residents in a single assessment — turning hours of manual collation into a commander-approved dispatch of 1,200+ public warnings with a full Snowflake audit trail.",
    },
  },

  // ─── Other Shipped Products & Repos ───
  {
    id: "centro",
    title: "Centro Workspace",
    description:
      "All-in-one multi-tenant operations ERP and client management platform centralizing attendance tracking, sprint Kanban pipelines, billing workflows, and client self-service portals.",
    tech: ["Laravel", "PostgreSQL", "Vue.js", "Redis", "Stripe API", "Tailwind CSS"],
    screenshots: [
      { thumbnail: "/portfolio/centro/1. OperationsDashboard.png", caption: "Executive Operations & Revenue Dashboard" },
      { thumbnail: "/portfolio/centro/2. AttendanceWidget.png", caption: "Biometric Attendance & Shift Tracking" },
      { thumbnail: "/portfolio/centro/3. ClientsAndCrmHub.png", caption: "Multi-Tenant CRM & Account Ledger" },
      { thumbnail: "/portfolio/centro/4. ProjectKanbanBoard.png", caption: "Interactive Sprint Kanban Pipeline" },
      { thumbnail: "/portfolio/centro/5. InvoiceBuilderModal.png", caption: "Automated Invoice & Billing Engine" },
      { thumbnail: "/portfolio/centro/6. ClientPortalProjectView.png", caption: "Client Self-Service Project Portal" },
    ],
  },
  {
    id: "kape-calle",
    title: "Kape Calle",
    description:
      "E-commerce storefront and digital brand platform featuring an interactive product catalog, direct order ingestion, customer reviews, and branch navigation.",
    tech: ["React.js", "Tailwind CSS", "TypeScript", "Responsive UI"],
    screenshots: [
      { thumbnail: "/portfolio/kape-calle/2. hero.png", caption: "Brand Hero & Order Experience" },
      { thumbnail: "/portfolio/kape-calle/4.1. product-service catalog.png", caption: "Artisan Coffee & Pastry Catalog" },
      { thumbnail: "/portfolio/kape-calle/6. lead capture - direct order form.png", caption: "Direct Checkout & Order Ingestion" },
      { thumbnail: "/portfolio/kape-calle/7. location.png", caption: "Store Branch Locator & Transit Info" },
    ],
  },
  {
    id: "resilient-http-client",
    title: "Resilient HTTP Client",
    description:
      "An asynchronous Python HTTP client built for resilient service-to-service communication, using Circuit Breakers, Retry Policies, Fallbacks, and a Redis Failure Store.",
    tech: ["Python", "FastAPI", "AsyncIO", "Redis", "HTTPX"],
    github: "https://github.com/AD-Technology-Inc/resilient-http-client",
  },
  {
    id: "ad-routine",
    title: "AD. Routine",
    description:
      "A deterministic scheduling engine and routine coordinator with capacity-aware planning, state-machine synchronization, and Redis concurrency locking.",
    tech: ["Laravel", "Vue.js", "Redis", "PostgreSQL", "TypeScript"],
    github: "https://github.com/AD-Technology-Inc/routine",
  },
  {
    id: "observability",
    title: "Observability Stack",
    description:
      "Centralized telemetry and observability setup utilizing OpenTelemetry and the LGTP stack (Loki, Grafana, Tempo, Prometheus) to trace latency and monitor error rates in real-time.",
    tech: [
      "FastAPI",
      "OpenTelemetry",
      "Grafana",
      "Prometheus",
      "Loki",
      "Tempo",
    ],
    github: "https://github.com/AD-Technology-Inc/Observability",
  },
  {
    id: "software-engineering",
    title: "Software Engineering Second Brain",
    description:
      "A backend engineering knowledge base covering distributed system architecture, failure recovery patterns, system design, and technical decision-making.",
    tech: ["System Design", "Architecture", "Engineering Notes", "Documentation"],
    github: "https://github.com/zerexei/software-engineering",
  },
  {
    id: "php-core",
    title: "PHP-Core Framework",
    description:
      "A lightweight, zero-dependency PHP 8.2+ MVC framework implementing a service container, request router, PDO query builder, model abstractions, and middleware pipelines.",
    tech: ["PHP", "MVC", "OOP", "System Design"],
    github: "https://github.com/zerexei/php-core",
  },
  {
    id: "botman-drivers",
    title: "BotMan Driver Integrations",
    description:
      "Multi-platform messaging drivers extending the BotMan framework to enable integrations with Web, Messenger, Viber, and WhatsApp.",
    tech: ["PHP", "BotMan", "APIs", "Webhooks"],
    github: "https://github.com/zerexei/botman-drivers",
  },
  {
    id: "p2p-transfer",
    title: "P2P File Transfer",
    description:
      "A peer-to-peer web tool built with WebRTC and React to enable direct, secure, and serverless file transfers between browsers.",
    tech: ["TypeScript", "React.js", "Peer.js", "WebRTC"],
    github: "https://github.com/zerexei/peer-to-peer-file-sharing-app",
  },
];
