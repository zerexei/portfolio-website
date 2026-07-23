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
  const calendlyUrl =
    resumeData.calendly || "https://calendly.com/angeloarcillas64";

  const servicesList = [
    {
      title: "Feature Development (Laravel / FastAPI)",
      price: "From $1,500",
      description:
        "Build reliable backend features for your existing SaaS platform without compromising maintainability. I develop custom modules and backend systems that prioritize correctness, fault tolerance, and clean architecture.",
      icon: Code,
      bullets: [
        "Administrative dashboards & database logic",
        "Symmetric schedules & bookings (safe from concurrent clicks)",
        "Data privacy controls (secure multi-tenant & role access)",
        "Background worker queues (keeps page loading fast under load)",
        "Comprehensive regression testing (unit & integration suite)",
        "Structured logging & error telemetry systems",
      ],
    },
    {
      title: "API & Webhook Integration",
      price: "From $750",
      description:
        "Connect your applications with integrations you can depend on. I build and integrate APIs and webhooks that deliver data consistently between your services. From payment gateways and CRMs to messaging channels, 100% reliable delivery is key.",
      icon: Database,
      bullets: [
        "Subscription billing setups (Stripe & Paddle syncing)",
        "CRM & messaging channels (integrated with retry protection)",
        "Double-submit protection (guarantees payments register once)",
        "Exponential retries & token-bucket rate limiters",
        "Webhook queuing (ingests high traffic without timeouts)",
        "Strict payload schema validation",
      ],
    },
    {
      title: "Software Reliability Assessment",
      price: "Flat $1,000",
      description:
        "Find the weak points in your system before they become production incidents. I perform a comprehensive assessment of your application's data flows, integrations, and backend logic to uncover issues that lead to service interruptions.",
      icon: Cpu,
      bullets: [
        "Data flow and dependency analysis",
        "Single points of failure audits (stopping server crashes)",
        "Database schema & constraint review",
        "API and webhook reliability assessment",
        "Self-healing flow checks (ensuring API syncs recover from failures)",
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
    else if (selectedService === "api") base = 750;
    else base = 1000;

    if (addLocks) base += 350;
    if (addCicd) base += 300;
    if (addTesting) base += 400;

    return base;
  };

  return (
    <div className="py-20 space-y-16 animate-slide-up">
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Engineering Solutions
        </h2>
        <p className="text-zinc-400 text-lg">
          Practical, spec-compliant backend solutions tailored for SaaS stability, data flow integrity, and operational dependability.
        </p>
      </div>

      {/* Services Grid (3 Columns on Desktop, 1 Column on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicesList.map((service, index) => {
          const ServiceIcon = service.icon;
          return (
            <div
              key={index}
              className="card p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:!border-accent/30 transition-all duration-300 !bg-zinc-950/40"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />

              <div className="space-y-5">
                {/* Header: Icon, Title & Price */}
                <div className="space-y-3 pb-4 border-b border-zinc-900">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300 shrink-0">
                      <ServiceIcon size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold text-accent bg-accent/5 border border-accent/25 px-2.5 py-1 rounded-full">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white tracking-tight group-hover:text-accent transition-colors leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <div className="space-y-2 pt-2 border-t border-zinc-900/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-1">
                    Key Deliverables
                  </span>
                  {service.bullets.slice(0, 4).map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/70 mt-2 shrink-0" />
                      <span className="text-sm leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row: CTA Button */}
              <div className="pt-4 border-t border-zinc-900/80">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-black bg-accent rounded-lg hover:bg-accent-hover transition-all duration-300 gap-1.5 shadow-sm hover:shadow-[0_0_15px_rgba(85,255,255,0.2)]"
                >
                  Book Solution <ArrowRight size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Pricing Estimator */}
      <div className="pt-12 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-accent shrink-0">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white tracking-tight text-lg">
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
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Core Service
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "saas", name: "Feature Dev", base: "$1,500+" },
                  { id: "api", name: "API & Webhook", base: "$750+" },
                  { id: "audit", name: "Reliability Audit", base: "$1,000" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`px-3 py-3 rounded-lg border text-xs font-bold transition-all duration-300 text-center flex flex-col items-center gap-1 focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none hover:-translate-y-0.5 ${
                      selectedService === s.id
                        ? "border-accent bg-accent/5 text-accent shadow-[0_0_15px_rgba(85,255,255,0.05)]"
                        : "border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
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
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Project Specifications
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "locks",
                    label: "Double-Charge & Duplicate Booking Protection (Idempotency Locks)",
                    price: "+$350",
                    checked: addLocks,
                    set: setAddLocks,
                  },
                  {
                    id: "cicd",
                    label: "Zero-Downtime AWS Deployments (Automated CI/CD Pipeline)",
                    price: "+$300",
                    checked: addCicd,
                    set: setAddCicd,
                  },
                  {
                    id: "testing",
                    label: "Crash Prevention & Regression Testing (Automated Test Suite)",
                    price: "+$400",
                    checked: addTesting,
                    set: setAddTesting,
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center justify-between gap-4 p-3.5 rounded-lg border text-xs cursor-pointer transition-all duration-300 focus-within:ring-1 focus-within:ring-accent/50 focus-within:outline-none ${
                      item.checked
                        ? "border-accent/40 bg-zinc-900/50 text-zinc-100"
                        : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:border-zinc-750 hover:text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => item.set(e.target.checked)}
                        className="accent-accent h-4 w-4 border-zinc-700 rounded bg-zinc-900 focus:ring-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 shrink-0"
                      />
                      <span className="font-medium text-left">{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 transition-colors duration-300 ${
                        item.checked
                          ? "text-accent bg-accent/10 border border-accent/20"
                          : "text-zinc-500 bg-zinc-900 border border-zinc-800"
                      }`}
                    >
                      {item.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="card relative overflow-hidden !border-zinc-800 p-8 flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[250px] group transition-all duration-300 hover:!border-accent/15">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[100px] rounded-full -mr-24 -mt-24 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Estimated Budget
              </span>
              <div className="text-5xl font-black text-white flex items-center justify-center gap-0.5 tracking-tight font-mono">
                <DollarSign className="text-accent shrink-0" size={32} />
                <span>{calculateEstimate().toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-zinc-500 max-w-[220px] mx-auto mt-2 leading-relaxed">
                Preliminary estimate based on standard scope.
              </p>
            </div>

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full relative z-10 inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-black bg-accent rounded-lg hover:bg-accent-hover transition-all duration-300 gap-1.5 hover:shadow-[0_0_20px_rgba(85,255,255,0.25)] hover:-translate-y-0.5"
            >
              Book Call & Confirm Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
