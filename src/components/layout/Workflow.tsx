import React, { useState } from "react";
import {
  FileText,
  Map,
  Code2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
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
    glowColor: "bg-accent/10",
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
    glowColor: "bg-blue-400/10",
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
    glowColor: "bg-purple-400/10",
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
    glowColor: "bg-amber-400/10",
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
    glowColor: "bg-emerald-400/10",
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
        <div className="text-accent font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
          <Sparkles size={13} /> Collaboration Blueprint
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          How We Build Together
        </h2>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          A transparent, structured engineering process — from kickoff to production — with zero friction.
        </p>
      </div>

      {/* ── Interactive Timeline ── */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step nodes row */}
        <div className="relative flex items-start justify-between">
          {/* Horizontal connector */}
          <div className="absolute top-5 left-[10%] right-[10%] h-px bg-linear-to-r from-zinc-800 via-zinc-700 to-zinc-800 pointer-events-none hidden sm:block" />

          {STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = activeStep === idx;
            const isDone = idx < activeStep;

            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className="group relative flex flex-col items-center gap-2.5 flex-1 focus:outline-none"
                aria-label={`Step ${step.num}: ${step.title}`}
              >
                {/* Circle node */}
                <div
                  className={`
                    relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isActive
                      ? "border-accent bg-accent/10 shadow-lg shadow-accent/25 scale-110"
                      : isDone
                      ? "border-zinc-700 bg-zinc-800/80"
                      : "border-zinc-800 bg-zinc-900/60 group-hover:border-zinc-600 group-hover:scale-105"
                    }
                  `}
                >
                  {isDone ? (
                    <CheckCircle2 size={16} className="text-zinc-500" />
                  ) : (
                    <StepIcon
                      size={16}
                      className={`transition-colors ${isActive ? "text-accent" : "text-zinc-500 group-hover:text-zinc-300"}`}
                    />
                  )}

                  {/* Pulse ring on active */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-accent/20 pointer-events-none" />
                  )}
                </div>

                {/* Labels */}
                <div className="flex flex-col items-center gap-0.5 px-1">
                  <span
                    className={`text-[10px] font-mono font-bold leading-none transition-colors ${
                      isActive ? "text-accent" : "text-zinc-600 group-hover:text-zinc-400"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`text-[10px] font-semibold text-center leading-tight block sm:hidden transition-colors max-w-16 truncate ${
                      isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {step.shortTitle}
                  </span>
                  <span
                    className={`text-[10px] font-semibold text-center leading-tight hidden sm:block transition-colors max-w-20 ${
                      isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
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
          className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50"
        >
          {/* Ambient blob */}
          <div
            className={`absolute -top-20 -right-20 w-72 h-72 ${current.glowColor} blur-[100px] rounded-full pointer-events-none`}
          />

          <div className="relative z-10 p-6 md:p-8 space-y-5 animate-fade-in">
            {/* Card header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-zinc-800/80">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl shrink-0">
                  <CurrentIcon size={22} className="text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Step {current.num} of {STEPS.length}
                    </p>
                    <span className="text-zinc-700">•</span>
                    <span className="text-[10px] font-mono text-accent/80 bg-accent/5 px-2 py-0.5 rounded border border-accent/20">
                      {current.comms}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
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
                    className={`rounded-full transition-all duration-300 focus:outline-none ${
                      idx === activeStep
                        ? "w-5 h-1.5 bg-accent"
                        : idx < activeStep
                        ? "w-1.5 h-1.5 bg-zinc-600"
                        : "w-1.5 h-1.5 bg-zinc-800 hover:bg-zinc-700"
                    }`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-300 text-base leading-relaxed">
              {current.description}
            </p>

            {/* Subtle spec guarantee note */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-1">
              <ShieldCheck size={14} className="text-zinc-400 shrink-0" />
              <span>
                Spec Guarantee: Up to 3 revision rounds included if code deviates from agreed architecture.
              </span>
            </div>

            {/* Footer row: scope + next CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl max-w-xl">
                <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest shrink-0">
                    Deliverable:
                  </span>
                  <span className="text-zinc-200 text-sm font-medium leading-snug">
                    {current.scope}
                  </span>
                </div>
              </div>

              {activeStep < STEPS.length - 1 ? (
                <button
                  onClick={() => setActiveStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-accent hover:bg-accent-hover rounded-lg transition-all duration-200 shadow-sm shrink-0 self-start sm:self-auto"
                >
                  Next Step <ArrowRight size={13} />
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-accent border border-accent/30 bg-accent/5 rounded-lg shrink-0 self-start sm:self-auto">
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
