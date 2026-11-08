export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: string[];
  technologies: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  website: string;
  medium?: string;
  upwork?: string;
  calendly?: string;
  skills: {
    languages: string[];
    databases: string[];
    cloudDevops: string[];
    engineering: string[];
  };
  experience: Experience[];
  education: {
    degree: string;
    school: string;
    location: string;
  };
}

export const resumeData: ResumeData = {
  name: "Angelo Dave F. Arcillas",
  title: "Software Engineer | Full-Stack, Backend & Systems",
  summary:
    "Product-minded Software Engineer with 4+ years of experience building scalable SaaS platforms using Laravel, FastAPI, PostgreSQL, Redis, and AWS/Azure. Specializing in real-time and event-driven architectures, resilient APIs, and distributed backend workflows. Collaborative technical leader skilled at mentoring engineers, unblocking cross-functional goals, and translating business challenges into innovative, resilient solutions.",
  location: "Zamboanga City, Philippines (Open to Remote / Relocation)",
  email: "angeloarcillas64@gmail.com",
  phone: "+63 936-2547-611",
  github: "https://github.com/zerexei",
  linkedin: "https://linkedin.com/in/angeloarcillas",
  website: "https://angeloarcillas.pages.dev",
  medium: "https://medium.com/@angeloarcillas64",
  upwork:
    "https://www.upwork.com/freelancers/~01ed41bc95427c452a?mp_source=share",
  calendly: "https://calendly.com/angeloarcillas64/discovery-call",
  skills: {
    languages: [
      "PHP (Laravel)",
      "Python (FastAPI)",
      "JavaScript (ES6+)",
      "TypeScript",
      "Vue.js",
      "React.js",
      "Inertia.js",
      "HTML5",
      "CSS3",
    ],
    databases: [
      "MySQL",
      "PostgreSQL",
      "Redis (Streams, Caching, Pub/Sub)",
      "MongoDB",
      "Supabase",
      "Azure Cosmos DB",
    ],
    cloudDevops: [
      "AWS (EC2, RDS, S3, IAM)",
      "Azure (AKS, Container Apps, Functions)",
      "Docker",
      "Kubernetes",
      "Linux",
      "CI/CD",
    ],
    engineering: [
      "Unit / Integration / E2E Testing",
      "Authentication & Authorization",
      "REST APIs",
      "WebSockets",
      "System Reliability",
      "Structured Logging",
      "Distributed Tracing (OTel/LGTM)",
      "Git Workflows",
      "Code Reviews",
      "Technical Leadership",
    ],
  },
  experience: [
    {
      company: "Independent Software Engineer",
      role: "Independent Software Engineer",
      location: "Remote",
      period: "Jan 2026 - Present",
      achievements: [
        "Developing a fault-tolerant distributed job engine using the Transactional Outbox Pattern (PostgreSQL + Redis Streams), implementing worker heartbeat leases, DLQ routing, and idempotency keys to guarantee at-least-once task execution across worker crashes and network failures.",
        "Designing a high-throughput log ingestion and telemetry platform, aggregating structured service logs to generate operational insights, calculate SLA metrics, and track error trends.",
        "Prototyping RAG retrieval pipelines in Python, implementing chunking strategies, high-dimensional vector embeddings, and hybrid semantic search to improve query retrieval performance and context accuracy.",
        "Developed a fault-tolerant Python HTTP client package implementing circuit breaker patterns, exponential backoff retries, and failure isolation to prevent cascading outages across third-party service boundaries.",
      ],
      technologies: [
        "Python",
        "FastAPI",
        "React.js",
        "PostgreSQL",
        "Redis",
        "Docker",
      ],
    },
    {
      company: "PurpleBug Inc.",
      role: "Mid. Sr. Web Developer",
      location: "Makati City, Philippines - Remote",
      period: "Jun 2022 - Dec 2025",
      achievements: [
        "Led the design and development of an AI customer engagement SaaS platform, building a real-time messaging system via WebSockets supporting 10K+ concurrent connections and 50K+ daily events across 8+ CRM and social channel integrations.",
        "Built an async processing system with retries and idempotency to ensure reliable message delivery and data consistency across third-party integrations.",
        "Eliminated race conditions and duplicate bookings in high-concurrency booking workflows using transactional locking and concurrency-safe validation to ensure accurate scheduling data.",
        "Designed a live-agent routing system using asynchronous queues, enabling real-time customer support workflows with seamless agent transfers and multi-agent communication.",
        "Architected a multi-tenant SaaS platform using usage and feature-based billing models and Role-Based Access Control (RBAC) to support subscription-based customer access and permissions.",
        "Managed AWS infrastructure (EC2, RDS, S3, IAM) and automated CI/CD pipelines, ensuring high availability and zero-downtime production deployments.",
        "Provided technical leadership for a small team and drove cross-department alignment, mentoring junior engineers through strict code reviews and unified standards that optimize development and product quality.",
      ],
      technologies: ["PHP", "Laravel", "Vue.js", "MySQL", "WebSockets", "AWS"],
    },
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "Western Mindanao State University",
    location: "Philippines",
  },
};
