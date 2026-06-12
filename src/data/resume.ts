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
  title: "Backend Engineer",
  summary:
    "Backend Engineer with 3.5+ years of experience building and scaling SaaS platforms using Laravel, Vue.js, MySQL, Redis, and AWS. Experienced in real-time systems, API & webhook, cloud infrastructure, and third-party integrations. SaaS product builder focused on translating business requirements into scalable production systems.",
  location: "Zamboanga City, Philippines",
  email: "angeloarcillas64@gmail.com",
  phone: "+63 936-2547-611",
  github: "https://github.com/zerexei",
  linkedin: "https://linkedin.com/in/angeloarcillas",
  website: "https://angeloarcillas.pages.dev",
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
    databases: ["MySQL", "PostgreSQL", "Redis", "MongoDB"],
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
      company: "Distributed Publishing Platform (Independent Project)",
      role: "Software Engineer",
      location: "Remote",
      period: "Jan 2026 - Present",
      achievements: [
        "Developing a containerized, asynchronous multi-service backend using FastAPI, Python, and Docker, implementing fault-tolerant event delivery with fanout scaling, failure recovery, and ensuring  transactional correctness under high concurrency workloads. ",
      ],
      technologies: ["Python", "FastAPI", "Docker", "Redis", "PostgreSQL"],
    },
    {
      company: "PurpleBug Inc.",
      role: "Senior Full-Stack Engineer",
      location: "Makati City, Philippines - Remote",
      period: "Jun 2022 - Dec 2025",
      achievements: [
        "**Led the design and development** of an AI customer engagement SaaS  platform, building a real-time messaging system with Laravel, Redis, WebSockets supporting **10K+ concurrent connections** and **50K+ daily events** across **8+ CRM and social channel integrations**.",
        "Built a **fault-tolerant async processing system** with retries and idempotency to ensure **reliable message delivery** and **data consistency** across third-party integrations.",
        "Eliminated **race conditions** and duplicate bookings in **high-concurrency booking workflows** using transactional locking and concurrency-safe validation to ensure **accurate scheduling data**.",
        "Reduced query latency by **~40%** through strategic **database schema optimization** and **indexing**, improving responsiveness for **high-traffic real-time workloads**.",
        "Designed a **queue-based live-agent routing system** using asynchronous queues, enabling **real-time customer support workflows** with seamless **agent transfers** and **multi-agent communication**.",
        "Architected a **multi-tenant SaaS platform** using usage and feature-based billing models and **Role-Based Access Control (RBAC)** to support **subscription-based customer access and permissions**.",
        "Managed **AWS infrastructure** (EC2, RDS, S3, IAM) and **automated CI/CD pipelines**, ensuring **high availability** and **zero-downtime** production deployments.",
      ],
      technologies: [
        "Laravel",
        "Vue.js",
        "MySQL",
        "Redis",
        "AWS",
        "WebSockets",
        "Docker",
      ],
    },
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "Western Mindanao State University",
    location: "Philippines",
  },
};
