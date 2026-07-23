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
    backend: string[];
    frontend: string[];
    databases: string[];
    cloudDevops: string[];
    engineeringFocus: string[];
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
  title: "Backend Engineer | SaaS Platforms, Real-Time & Event-Driven Systems",
  summary:
    "Product-Minded Backend Engineer with 3.5+ years of experience building SaaS platforms using Laravel, Vue.js, MySQL, Redis, and AWS. Experienced in real-time & event-driven systems, APIs & webhooks, cloud infrastructure, and third-party integrations. Strong technical leader skilled at mentoring junior engineers, improving system reliability, and translating business requirements into scalable production systems.",
  location: "Zamboanga City, Philippines (Open to Remote / Relocation)",
  email: "angeloarcillas64@gmail.com",
  phone: "+63 936-2547-611",
  github: "https://github.com/zerexei",
  linkedin: "https://linkedin.com/in/angeloarcillas",
  website: "https://angeloarcillas.pages.dev",
  medium: "https://medium.com/@angeloarcillas64",
  upwork: "https://www.upwork.com/freelancers/~01ed41bc95427c452a?mp_source=share",
  calendly: "https://calendly.com/angeloarcillas64",
  skills: {
    backend: [
      "PHP (Laravel)",
      "Python (FastAPI)",
      "REST APIs",
      "WebSockets",
      "async processing",
      "event-driven systems",
      "authentication & authorization",
      "third-party integrations",
    ],
    frontend: [
      "Vue.js",
      "React.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
    databases: ["MySQL", "PostgreSQL", "Redis", "MongoDB", "Supabase"],
    cloudDevops: [
      "AWS (EC2, RDS, S3, IAM)",
      "Docker",
      "Linux",
      "CI/CD pipelines",
    ],
    engineeringFocus: [
      "SaaS architecture",
      "system reliability",
      "structured logging",
      "monitoring",
      "unit/integration testing",
      "Git workflows",
      "code reviews",
      "technical leadership",
    ],
  },
  experience: [
    {
      company: "Independent Software Engineer",
      role: "Independent Software Engineer",
      location: "Remote",
      period: "Jan 2026 - Present",
      achievements: [
        "Developing an asynchronous job execution and state coordination engine for publishing workflows that ensures operational correctness under network failures, worker crashes, and downstream API rate limits.",
        "Designing a telemetry and reliability platform for service log ingestion, building structured data pipelines that aggregate log events to deliver operational insights, compute threat risk scores, and export SLA audits.",
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
        "**Led the design and development** of an AI customer engagement SaaS platform, building real-time WebSockets supporting **10K+ concurrent connections** and **50K+ daily events** across 8+ CRM and social integrations.",
        "Built **fault-tolerant async processing systems** with retries, idempotency, and transactional locking to ensure data consistency and eliminate race conditions in high-concurrency workflows.",
        "Architected a **multi-tenant SaaS platform** using usage/feature-based billing models and **Role-Based Access Control (RBAC)** to govern customer permissions.",
        "Managed **AWS infrastructure (EC2, RDS, S3, IAM)** and automated zero-downtime CI/CD pipelines while providing technical leadership and code-review mentorship.",
      ],
      technologies: [
        "PHP",
        "Laravel",
        "Vue.js",
        "MySQL",
        "WebSockets",
        "AWS",
      ],
    },
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "Western Mindanao State University",
    location: "Philippines",
  },
};
