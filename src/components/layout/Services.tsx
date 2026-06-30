import React, { useState } from "react";
import {
  Code,
  Database,
  Cpu,
  ArrowRight,
  DollarSign,
  Calculator,
} from "lucide-react";
import { resumeData } from "../../data/resume";

export const Services: React.FC = () => {
  const upworkUrl =
    resumeData.upwork ||
    "https://www.upwork.com/freelancers/~01ed41bc95427c452a?mp_source=share";

  const servicesList = [
    {
      title: "SaaS Feature Development",
      price: "From $1,500",
      description:
        "Build reliable backend features for your existing SaaS platform without compromising maintainability. I develop custom features, modules, and backend systems that prioritize correctness, fault tolerance, and clean architecture.",
      icon: Code,
      bullets: [
        "Administrative dashboards & database logic",
        "Concurrency-safe booking & scheduling workflows",
        "Multi-tenant isolation & Role-Based Access Control (RBAC)",
        "Asynchronous queue-based background tasks",
        "Comprehensive unit & integration testing",
        "Structured logging & exception instrumentation",
      ],
    },
    {
      title: "API & Webhook Integration",
      price: "From $800",
      description:
        "Connect your applications with integrations you can depend on. I build and integrate APIs and webhooks that deliver data consistently between your services. From payment gateways and CRMs to logistics providers, secure integration is key.",
      icon: Database,
      bullets: [
        "Secure payment gateways & subscription models",
        "Resilient CRM & social messaging channels (8+ platforms)",
        "Idempotency controls & double-submit prevention",
        "Exponential retries & token-bucket rate limiters",
        "Non-blocking background processors for webhook ingestion",
        "Strict payload schema validation",
      ],
    },
    {
      title: "Data Reliability Assessment",
      price: "Flat $600",
      description:
        "Find the weak points in your system before they become production incidents. I perform a comprehensive assessment of your application's data flows, integrations, and backend logic to uncover issues that lead to service interruptions.",
      icon: Cpu,
      bullets: [
        "Data flow and dependency analysis",
        "Identification of single points of failure",
        "Database schema & constraint review",
        "API and webhook reliability assessment",
        "Error handling and retry strategy evaluation",
        "Recommendations for monitoring, logging, and resilience",
      ],
    },
  ];

  // Estimator State
  const [selectedService, setSelectedService] = useState<string>("saas");
  const [addLocks, setAddLocks] = useState<boolean>(false);
  const [addCicd, setAddCicd] = useState<boolean>(false);
  const [addTesting, setAddTesting] = useState<boolean>(false);

  const calculateEstimate = () => {
    let base = 0;
    if (selectedService === "saas") base = 1500;
    else if (selectedService === "api") base = 800;
    else base = 600;

    if (addLocks) base += 300;
    if (addCicd) base += 250;
    if (addTesting) base += 350;

    return base;
  };

  return (
    <div className="py-20 space-y-16 animate-slide-up">
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Freelance Services
        </h2>
        <p className="text-zinc-400 text-lg">
          Practical, spec-compliant backend engineering services tailored for
          SaaS stability and operational dependability.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-6">
        {servicesList.map((service, index) => (
          <div
            key={index}
            className="card p-6 md:p-8 relative overflow-hidden hover:!bg-zinc-900/40 hover:!border-accent/15 group transition-all duration-300"
          >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[100px] rounded-full -mr-24 -mt-24 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />

            {/* Top Row: Icon, Title & Price inline */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/40">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors shrink-0">
                  <service.icon size={20} />
                </div>
                <h3 className="font-bold text-lg text-white tracking-tight group-hover:text-accent transition-colors leading-snug">
                  {service.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-semibold text-accent bg-accent/5 border border-accent/25 px-3 py-1 rounded-full">
                  {service.price}
                </span>
              </div>
            </div>

            {/* Middle: Description & Bullets */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 pt-6 items-start">
              <p className="text-zinc-400 text-sm leading-relaxed">
                {service.description}
              </p>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {service.bullets.map((bullet, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-zinc-500 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/65 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: CTA Button */}
            <div className="flex justify-end pt-6 mt-6 border-t border-zinc-800/40">
              <a
                href={upworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-black bg-accent rounded-lg hover:bg-accent-hover transition-all duration-300 gap-1.5 hover:shadow-[0_0_15px_rgba(85,255,255,0.15)]"
              >
                Inquire on Upwork <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Pricing Estimator */}
      <div className="card p-6 md:p-8 !border-dashed !border-zinc-800 !bg-zinc-950/20 space-y-8">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-900/50">
          <div className="p-2 bg-zinc-850 rounded-lg text-accent">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white tracking-tight">
              Project Cost Estimator
            </h3>
            <p className="text-xs text-zinc-500">
              Get an instant, transparent estimate for your backend
              requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                1. Select Base Service
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "saas", name: "SaaS Dev", base: "$1,500+" },
                  { id: "api", name: "API & Webhook", base: "$800+" },
                  { id: "audit", name: "Reliability Audit", base: "$600" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`px-3 py-3 rounded-lg border text-xs font-bold transition-all text-center flex flex-col items-center gap-1 ${
                      selectedService === s.id
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px] opacity-75 font-mono">
                      {s.base}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                2. Add Add-ons / Specifications
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "locks",
                    label:
                      "Concurrency Locking & Race-Condition Defense (+$300)",
                    checked: addLocks,
                    set: setAddLocks,
                  },
                  {
                    id: "cicd",
                    label: "AWS Deployment & Automated CI/CD Pipeline (+$250)",
                    checked: addCicd,
                    set: setAddCicd,
                  },
                  {
                    id: "testing",
                    label: "Unit & Integration Test Coverage (+$350)",
                    checked: addTesting,
                    set: setAddTesting,
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                      item.checked
                        ? "border-zinc-700 bg-zinc-900/40 text-zinc-200"
                        : "border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-800 hover:text-zinc-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => item.set(e.target.checked)}
                      className="accent-accent h-3.5 w-3.5 border-zinc-700 rounded bg-zinc-900 focus:ring-0 shrink-0"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="card !bg-zinc-900/40 !border-zinc-800 p-6 flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[220px]">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Estimated Budget
              </span>
              <div className="text-4xl font-extrabold text-white flex items-center justify-center gap-0.5">
                <DollarSign className="text-accent" size={28} />
                <span>{calculateEstimate().toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-zinc-500 max-w-[200px] mx-auto mt-2">
                This is a preliminary estimation based on typical workload
                scope.
              </p>
            </div>

            <a
              href={`${upworkUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-black bg-accent rounded-lg hover:bg-accent-hover transition-all duration-300 gap-1.5"
            >
              Request Quote on Upwork
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
