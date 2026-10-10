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
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Engineering Solutions
        </h2>
        <p className="text-neutral-foreground text-lg">
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
              className="card p-6 flex flex-col justify-between space-y-6 relative group transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Header: Icon, Title & Price */}
                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex items-center justify-between gap-2">
                    <div className="icon-box shrink-0">
                      <ServiceIcon size={20} />
                    </div>
                    <span className="badge badge-mono">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-foreground tracking-tight group-hover:text-primary transition-colors leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-neutral-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-foreground font-semibold block mb-1">
                    Key Deliverables
                  </span>
                  {service.bullets.slice(0, 4).map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-neutral-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-sm leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row: CTA Button */}
              <div className="pt-4 border-t border-border">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary w-full text-xs gap-1.5"
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
          <div className="icon-box text-primary shrink-0">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="font-bold text-foreground tracking-tight text-lg">
              Project Cost Estimator
            </h3>
            <p className="text-xs text-neutral-foreground">
              Get an instant, transparent estimate for your backend
              requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-foreground font-semibold">
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
                    className={`px-3 py-3 rounded-lg border text-xs font-bold transition-all duration-300 text-center flex flex-col items-center gap-1 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none cursor-pointer ${
                      selectedService === s.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card-nested text-neutral-foreground hover:border-neutral hover:text-foreground"
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
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-foreground font-semibold">
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
                    className={`flex items-center justify-between gap-4 p-3.5 rounded-lg border text-xs cursor-pointer transition-all duration-300 focus-within:ring-1 focus-within:ring-primary focus-within:outline-none ${
                      item.checked
                        ? "border-primary/40 bg-primary/5 text-foreground"
                        : "border-border bg-card-nested text-neutral-foreground hover:border-neutral hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => item.set(e.target.checked)}
                        className="form-checkbox accent-primary h-4 w-4 rounded shrink-0 cursor-pointer"
                      />
                      <span className="font-medium text-left">{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 transition-colors duration-300 ${
                        item.checked
                          ? "text-primary bg-primary-tint border border-primary-border"
                          : "text-neutral-foreground bg-neutral border border-border"
                      }`}
                    >
                      {item.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-8 flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[250px] transition-all duration-300">
            <div className="space-y-2 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-foreground">
                Estimated Budget
              </span>
              <div className="text-5xl font-black text-foreground flex items-center justify-center gap-0.5 tracking-tight font-mono">
                <DollarSign className="text-primary shrink-0" size={32} />
                <span>{calculateEstimate().toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-neutral-foreground max-w-[220px] mx-auto mt-2 leading-relaxed">
                Preliminary estimate based on standard scope.
              </p>
            </div>

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary w-full text-sm font-bold"
            >
              Book Call & Confirm Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
