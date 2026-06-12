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
        "Businesses lost up to 20% of sales leads and delayed support responses due to fragmented messaging channels.",
      architecture:
        "Unified routing engine built with WebSockets and Redis-backed queues.",
      challenges:
        "Handling out-of-order webhook delivery and bursty API retries under high-concurrency loads.",
      solutions:
        "Atomic locks with idempotency keys for duplicate retries, and timestamp sequence tracking for out-of-order webhooks.",
      impact:
        "Sustained 10K+ concurrent sessions, reduced response times to <500ms, and eliminated lead capture data loss.",
    },
    demo: "https://smicos.com",
  },
  {
    id: "distributed-publishing-platform",
    title: "Distributed Publishing Platform",
    description:
      "A containerized, asynchronous multi-service backend using FastAPI, Python, and Docker, implementing fault-tolerant event delivery with fanout scaling, failure recovery, and ensuring transactional correctness under high concurrency workloads.",
    tech: ["Python", "FastAPI", "Docker", "Redis", "PostgreSQL"],
    github: "https://github.com/zerexei/posexei",
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
    id: "botman-drivers",
    title: "BotMan Driver",
    description:
      "API integration drivers extending the BotMan framework, enabling seamless messaging connections with Web, Messenger, Viber, and WhatsApp.",
    tech: ["PHP", "BotMan", "APIs", "Webhooks"],
    github: "https://github.com/zerexei/botman-drivers",
  },
  {
    id: "centralize-logging",
    title: "Centralized Logging System",
    description:
      "A centralized logging service built with FastAPI and PostgreSQL to aggregate, query, and store application logs from multiple environments.",
    tech: ["FastAPI", "Python", "Supabase", "PostgreSQL"],
    github: "https://github.com/zerexei/centralize-logging-system",
  },
  {
    id: "php-core",
    title: "PHP-Core Framework",
    description:
      "A lightweight, custom PHP MVC framework developed to implement core dependency injection, request-response routing, and middleware pipelines.",
    tech: ["PHP", "MVC", "OOP", "System Design"],
    github: "https://github.com/zerexei/PHP-Core",
  },
  {
    id: "p2p-file-transfer",
    title: "P2P File Transfer",
    description:
      "A peer-to-peer web tool built with WebRTC and React to enable direct, secure, and serverless file transfers between browsers.",
    tech: ["TypeScript", "React.js", "Peer.js", "WebRTC"],
    github: "https://github.com/zerexei/p2p-file-transfer",
  },
];
