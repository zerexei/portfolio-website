export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
}

export interface ProductGallery {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  tech: string[];
  demoUrl?: string;
  githubUrl?: string;
  items: GalleryItem[];
}

export const productGalleries: ProductGallery[] = [
  {
    id: "centro",
    name: "Centro Workspace",
    tagline: "Multi-Tenant Operations ERP & Client Management Suite",
    badge: "Enterprise SaaS",
    tech: ["Laravel", "PostgreSQL", "Vue.js", "Redis", "Stripe API", "Tailwind CSS"],
    items: [
      {
        id: "centro-1",
        title: "Executive Operations Dashboard",
        caption: "Real-time revenue metrics, staff utilization tracking, and department workload counters.",
        image: "/portfolio/centro/1. OperationsDashboard.png",
      },
      {
        id: "centro-2",
        title: "Staff Attendance & Shift Telemetry",
        caption: "Automated clock-in synchronization with overtime calculation and geo-fence validation.",
        image: "/portfolio/centro/2. AttendanceWidget.png",
      },
      {
        id: "centro-3",
        title: "Multi-Tenant CRM & Account Hub",
        caption: "Customer relationship manager with deal pipelines, activity history, and lead scoring.",
        image: "/portfolio/centro/3. ClientsAndCrmHub.png",
      },
      {
        id: "centro-4",
        title: "Interactive Sprint Kanban Pipeline",
        caption: "Drag-and-drop task board with real-time WebSocket state syncing and workload distribution.",
        image: "/portfolio/centro/4. ProjectKanbanBoard.png",
      },
      {
        id: "centro-5",
        title: "Invoice Builder & Automated Billing",
        caption: "Multi-currency tax calculation engine and automated PDF generation for client billing.",
        image: "/portfolio/centro/5. InvoiceBuilderModal.png",
      },
      {
        id: "centro-6",
        title: "Client Self-Service Portal",
        caption: "External-facing portal for client approvals, milestone transparency, and invoice access.",
        image: "/portfolio/centro/6. ClientPortalProjectView.png",
      },
    ],
  },
  {
    id: "ad-sentinel",
    name: "AD. Sentinel",
    tagline: "AI-Powered Disaster Telemetry & Emergency Command Copilot",
    badge: "AI & Telemetry",
    tech: ["Python", "FastAPI", "React.js", "Snowflake CoCo", "Celery", "Redis"],
    demoUrl: "https://sentinel-ai-24ck.onrender.com",
    githubUrl: "https://github.com/AD-Technology-Inc/sentinel",
    items: [
      {
        id: "sentinel-1",
        title: "Emergency Operations Command Console",
        caption: "Commander HUD tracking live river sensor feeds, affected population figures, and warning status.",
        image: "/portfolio/sentinel/1. app.png",
      },
      {
        id: "sentinel-2",
        title: "Risk Telemetry & Sensor Models",
        caption: "Automated threat evaluation algorithm comparing telemetry with historical flood baselines.",
        image: "/portfolio/sentinel/2. problem - solution.png",
      },
      {
        id: "sentinel-3",
        title: "Tactical Response Incident Wizard",
        caption: "Guided workflow directing commanders through shelter staging, resource dispatch, and SMS alerts.",
        image: "/portfolio/sentinel/3. flood incident walkthrough.png",
      },
      {
        id: "sentinel-4",
        title: "Deterministic Architecture & Guardrails",
        caption: "Human-in-the-loop audit pipeline ensuring zero unverified public announcements.",
        image: "/portfolio/sentinel/4. architecture.png",
      },
      {
        id: "sentinel-5",
        title: "Agent Skill Matrix & Tool Contracts",
        caption: "Specification schema defining LLM function calling across telemetry query and notification tools.",
        image: "/portfolio/sentinel/5. agent skills specifications.png",
      },
    ],
  },
  {
    id: "ad-sentry",
    name: "AD. Sentry",
    tagline: "Log Ingestion Engine & Out-of-Band SLA Threat Auditing Platform",
    badge: "Infrastructure",
    tech: ["React.js", "FastAPI", "PostgreSQL", "Redis", "ReportLab", "Docker"],
    demoUrl: "https://ad-technology-inc.github.io/Sentry",
    githubUrl: "https://github.com/AD-Technology-Inc/sentry",
    items: [
      {
        id: "sentry-4",
        title: "Threat Severity & Uptime Dashboard",
        caption: "Live operational telemetry scoring application incidents from 0 to 10 by impact and frequency.",
        image: "/portfolio/sentry/4. dashboard.png",
      },
      {
        id: "sentry-5",
        title: "High-Speed Log Explorer",
        caption: "Faceted search console querying structured JSON logs across distributed microservices.",
        image: "/portfolio/sentry/5. log explorer.png",
      },
      {
        id: "sentry-6",
        title: "Fingerprinted Incident Clusters",
        caption: "Stacktrace normalization deduplicating millions of raw log entries into clean incident tickets.",
        image: "/portfolio/sentry/6. issues.png",
      },
      {
        id: "sentry-7",
        title: "Telemetry Alert Rule Triggers",
        caption: "Automated webhook dispatching system sending high-priority alerts with backoff retries.",
        image: "/portfolio/sentry/7. alerts.png",
      },
      {
        id: "sentry-8",
        title: "Executive SLA Audit Reports",
        caption: "Asynchronous PDF compilation engine creating stakeholder-ready monthly compliance reports.",
        image: "/portfolio/sentry/8. reports.png",
      },
      {
        id: "sentry-1",
        title: "Platform Architecture Overview",
        caption: "Decoupled ingestion gateway pipeline maintaining uptime during heavy traffic bursts.",
        image: "/portfolio/sentry/1. hero.png",
      },
    ],
  },
  {
    id: "kape-calle",
    name: "Kape Calle",
    tagline: "Interactive Coffee Commerce & Direct Lead Ingestion Platform",
    badge: "E-Commerce",
    tech: ["React.js", "Tailwind CSS", "TypeScript", "Responsive UI"],
    items: [
      {
        id: "kape-2",
        title: "Brand Hero & Order Experience",
        caption: "Conversion-optimized landing interface for online menu browsing and direct customer ordering.",
        image: "/portfolio/kape-calle/2. hero.png",
      },
      {
        id: "kape-4",
        title: "Artisan Coffee & Pastry Catalog",
        caption: "Interactive product matrix with live dietary filters, size options, and add-to-order state management.",
        image: "/portfolio/kape-calle/4.1. product-service catalog.png",
      },
      {
        id: "kape-6",
        title: "Instant Direct Order & Delivery Form",
        caption: "Frictionless checkout form capturing customer delivery details, payment preference, and order items.",
        image: "/portfolio/kape-calle/6. lead capture - direct order form.png",
      },
      {
        id: "kape-7",
        title: "Branch Locator & Maps Navigation",
        caption: "Store operating schedule, location directions, and transit guidance.",
        image: "/portfolio/kape-calle/7. location.png",
      },
    ],
  },
];
