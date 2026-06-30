# Angelo Arcillas — Product-Focused Backend Engineer Portfolio

The source code for [zerexei.github.io](https://zerexei.github.io), a production-grade personal portfolio and technical blog built to showcase distributed systems architecture, backend reliability case studies, and engineering services.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React 18, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS v4, custom utility layers, Framer Motion (for smooth micro-animations and route transitions).
- **Theme Strategy:** System-responsive dark mode by default (`.dark`) with dynamic brand accent branding.
- **Key Renderers:** `react-markdown` for technical writing, `mermaid` for interactive architecture diagrams.
- **Hosting & Deployment:** Automated production builds deployed directly to GitHub Pages.

---

## 🚀 Key Modules

### 1. High-Reliability Case Studies
Interactive breakdown of actual backend engineering projects (e.g., **Smicos**, **AD. Publish**, **AD. Sentry**, **AD. Routine**). Each case study outlines:
- **Problem Statement:** The core distributed system failure, race condition, or bottleneck.
- **Architecture:** The structural data flow, messaging, and storage layer choices.
- **Challenges:** Hard engineering limits (e.g., worker crashes, out-of-order webhook delivery, database lock contention).
- **Solutions:** Applied patterns including Redis stream consumer groups, token-bucket rate limiters, composite database constraints, and custom MVC framework pipelines.
- **Business Impact:** Concrete performance metrics, latency reductions, and data safety guarantees.

### 2. Project Cost Estimator
A transparent project scope calculator that allows prospective clients and recruiters to estimate development costs in real-time. Built with interactive state bindings to calculate:
- **Core Service Scopes:** SaaS Development, API & Webhook Integration, Data Reliability Audits.
- **Project Specifications:** Concurrency locking, CI/CD automation pipelines, and unit/integration testing coverage.

### 3. Technical Articles
A lightweight, markdown-based blogging module that parses and displays system design principles, backend optimization strategies, and DevOps methodologies.

---

## 📂 Project Structure

```text
├── public/                # Static assets, manifests, and favicons
└── src/
    ├── components/
    │   ├── common/        # Shared buttons, section wrappers, tag/badge components
    │   ├── layout/        # Navbar, footer, hero, tech stack, services
    │   └── projects/      # Featured case studies and project grids
    ├── css/               # Core design system configuration and Tailwind layers
    ├── data/              # Static schema-enforced project, article, and resume data
    ├── pages/             # Route-level page views (Home, Services, Articles, Case Studies)
    ├── App.tsx            # Main application router and scroll utilities
    ├── main.tsx           # React mounting and entrypoint
    └── routes.ts          # Centralized route registry
```

---

## 💻 Local Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zerexei/zerexei.github.io.git
   cd zerexei.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📦 Deployment

The application is deployed using the `gh-pages` package:

```bash
npm run deploy
```

---

## 📄 License

This project is licensed under the MIT License.
