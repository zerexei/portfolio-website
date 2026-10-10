import React, { useState } from "react";
import {
  FileText,
  Map,
  Code2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Workflow as WorkflowIcon,
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Audit & Scope Framing",
    shortTitle: "Audit",
    comms: "Async / Loom Walkthrough",
    icon: FileText,
    description:
      "We map your business rules, API schemas, and existing system constraints. I inspect your data models and endpoint contracts to establish absolute scope alignment before any code is written.",
    scope: "Technical spec, API payload contracts & clear scope boundaries.",
  },
  {
    num: "02",
    title: "Architecture Blueprint",
    shortTitle: "Blueprint",
    comms: "API & Schema Review",
    icon: Map,
    description:
      "I draft DB migrations, async event flows (Redis/queues), and API schemas for your review. You get full visibility into database locking strategies, payload contracts, and third-party safety limits.",
    scope: "Architectural blueprint draft & endpoint design review.",
  },
  {
    num: "03",
    title: "Isolated Dev & Guardrails",
    shortTitle: "Build",
    comms: "Daily PR Updates",
    icon: Code2,
    description:
      "Features are built in isolated git branches using clean stack patterns (Laravel or FastAPI). I implement atomic database operations, Redis locks, and rate-limit backpressure to handle traffic surges safely.",
    scope: "Spec-compliant PRs with zero side-effects on existing modules.",
  },
  {
    num: "04",
    title: "Testing & Validation",
    shortTitle: "Test",
    comms: "Automated Suite",
    icon: ShieldCheck,
    description:
      "I write automated unit and integration tests covering high-concurrency race conditions, worker node retries, and network timeout edge cases so your production service never crashes under load.",
    scope: "Passing automated test suite with full edge-case coverage.",
  },
  {
    num: "05",
    title: "Zero-Downtime Handover",
    shortTitle: "Launch",
    comms: "Direct Deploy Assistance",
    icon: CheckCircle2,
    description:
      "I deliver clean, fully documented PRs with DB migration scripts, API docs, and rollback plans. I provide direct deployment support to guarantee a 100% zero-downtime production release.",
    scope: "Merged code, migration guide & post-launch verification.",
  },
];

export const Workflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const current = STEPS[activeStep];
  const CurrentIcon = current.icon;

  return (
    <div className="space-y-14 animate-slide-up">
      {/* ── Section Header ── */}
      <div className="space-y-3 max-w-2xl">
        <div className="text-primary font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
          <WorkflowIcon size={14} /> Collaboration Blueprint
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          How We Build Together
        </h2>
        <p className="text-neutral-foreground text-sm md:text-base leading-relaxed">
          A transparent, structured engineering process — from kickoff to production — with zero friction.
        </p>
      </div>

      {/* ── Interactive Timeline ── */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step nodes row */}
        <div className="relative flex items-start justify-between">
          {/* Horizontal connector */}
          <div className="absolute top-5 left-[10%] right-[10%] h-px bg-border pointer-events-none hidden sm:block" />

          {STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = activeStep === idx;
            const isDone = idx < activeStep;

            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className="group relative flex flex-col items-center gap-2.5 flex-1 focus:outline-none cursor-pointer"
                aria-label={`Step ${step.num}: ${step.title}`}
              >
                {/* Circle node */}
                <div
                  className={`
                    relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isActive
                      ? "border-primary bg-primary-tint text-primary scale-110 shadow-xs"
                      : isDone
                      ? "border-border bg-neutral text-neutral-foreground"
                      : "border-border bg-card text-neutral-foreground group-hover:border-neutral group-hover:text-foreground group-hover:scale-105"
                    }
                  `}
                >
                  {isDone ? (
                    <CheckCircle2 size={16} className="text-neutral-foreground" />
                  ) : (
                    <StepIcon
                      size={16}
                      className={`transition-colors ${isActive ? "text-primary" : "text-neutral-foreground group-hover:text-foreground"}`}
                    />
                  )}
                </div>

                {/* Labels */}
                <div className="flex flex-col items-center gap-0.5 px-1">
                  <span
                    className={`text-[10px] font-mono font-bold leading-none transition-colors ${
                      isActive ? "text-primary" : "text-neutral-foreground group-hover:text-foreground"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`text-[10px] font-semibold text-center leading-tight block sm:hidden transition-colors max-w-16 truncate ${
                      isActive ? "text-foreground" : "text-neutral-foreground group-hover:text-foreground"
                    }`}
                  >
                    {step.shortTitle}
                  </span>
                  <span
                    className={`text-[10px] font-semibold text-center leading-tight hidden sm:block transition-colors max-w-20 ${
                      isActive ? "text-foreground" : "text-neutral-foreground group-hover:text-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail card */}
        <div
          key={activeStep}
          className="card relative overflow-hidden"
        >
          <div className="p-6 md:p-8 space-y-5 animate-fade-in">
            {/* Card header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="icon-box text-primary shrink-0">
                  <CurrentIcon size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[10px] font-mono text-neutral-foreground uppercase tracking-widest">
                      Step {current.num} of {STEPS.length}
                    </p>
                    <span className="text-neutral-foreground opacity-50">•</span>
                    <span className="badge badge-mono">
                      {current.comms}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight leading-snug">
                    {current.title}
                  </h3>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5 self-start sm:self-center shrink-0">
                {STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                      idx === activeStep
                        ? "w-5 h-1.5 bg-primary"
                        : idx < activeStep
                        ? "w-1.5 h-1.5 bg-neutral-foreground"
                        : "w-1.5 h-1.5 bg-border hover:bg-neutral"
                    }`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-foreground/90 text-base leading-relaxed">
              {current.description}
            </p>

            {/* Subtle spec guarantee note */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-foreground pt-1">
              <ShieldCheck size={14} className="text-primary shrink-0" />
              <span>
                Spec Guarantee: Up to 3 revision rounds included if code deviates from agreed architecture.
              </span>
            </div>

            {/* Footer row: scope + next CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-card-nested border border-border rounded-xl max-w-xl">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-xs font-mono text-neutral-foreground uppercase tracking-widest shrink-0">
                    Deliverable:
                  </span>
                  <span className="text-foreground text-sm font-medium leading-snug">
                    {current.scope}
                  </span>
                </div>
              </div>

              {activeStep < STEPS.length - 1 ? (
                <button
                  onClick={() => setActiveStep((s) => s + 1)}
                  className="button button-primary button-sm shrink-0 self-start sm:self-auto gap-2"
                >
                  Next Step <ArrowRight size={13} />
                </button>
              ) : (
                <div className="badge badge-mono text-primary border-primary-border bg-primary-tint shrink-0 self-start sm:self-auto gap-1.5">
                  <CheckCircle2 size={13} /> All Steps Complete
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
