import React, { useState } from "react";
import { Lock, Unlock, Play, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

export const RaceConditionDemo: React.FC = () => {
  const [lockEnabled, setLockEnabled] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const [animationStep, setAnimationStep] = useState<"idle" | "sending" | "checking" | "result">("idle");
  const [reqAState, setReqAState] = useState<"idle" | "success">("idle");
  const [reqBState, setReqBState] = useState<"idle" | "success" | "blocked">("idle");

  const runDemo = () => {
    if (animating) return;
    setAnimating(true);
    setAnimationStep("sending");
    setReqAState("idle");
    setReqBState("idle");

    setTimeout(() => {
      setAnimationStep("checking");
      setReqAState("success");
      if (lockEnabled) {
        setReqBState("blocked");
      } else {
        setReqBState("success");
      }
    }, 1200);

    setTimeout(() => {
      setAnimationStep("result");
      setAnimating(false);
    }, 2400);
  };

  return (
    <div className="card p-6 md:p-8 relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5 relative z-10">
        <div>
          <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold block mb-1">
            Interactive Visualizer
          </span>
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            How Concurrency & Race Conditions Hurt Your SaaS
          </h3>
          <p className="text-xs text-neutral-foreground max-w-xl leading-relaxed mt-1">
            Simulate a customer clicking the "Checkout" button twice at the exact same millisecond. Toggle the lock to see how backend architecture prevents billing duplicate claims.
          </p>
        </div>

        {/* Switch Control */}
        <div className="flex items-center gap-3 bg-card-nested p-2.5 rounded-xl border border-border shrink-0 self-start md:self-auto">
          <span className="text-xs font-mono font-bold text-neutral-foreground">Lock Switch:</span>
          <button
            onClick={() => !animating && setLockEnabled(!lockEnabled)}
            disabled={animating}
            className={`relative flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-300 border cursor-pointer disabled:opacity-50 ${
              lockEnabled
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
          >
            {lockEnabled ? (
              <>
                <Lock size={12} className="animate-pulse" /> LOCK ACTIVE
              </>
            ) : (
              <>
                <Unlock size={12} /> NO LOCK
              </>
            )}
          </button>
        </div>
      </div>

      {/* Animation Arena */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6 relative z-10">
        {/* Left Side: Client Checkout Action */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-5 bg-card-nested border border-border rounded-xl space-y-4 text-center">
          <span className="text-[9px] font-mono text-neutral-foreground uppercase tracking-widest leading-none">
            User Action
          </span>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground leading-tight">Double-Click Checkout</h4>
            <p className="text-[11px] text-neutral-foreground leading-normal">
              Simulates two billing checks arriving simultaneously.
            </p>
          </div>

          <button
            onClick={runDemo}
            disabled={animating}
            className="button button-primary w-full text-xs font-bold gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {animating ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> In Flight...
              </>
            ) : (
              <>
                <Play size={14} /> Send Concurrent Requests
              </>
            )}
          </button>
        </div>

        {/* Center: Concurrent Requests Flow / Pipeline */}
        <div className="md:col-span-4 flex flex-col justify-center space-y-4 px-2">
          {/* Request A lane */}
          <div className="relative h-12 bg-neutral/40 border border-border rounded-lg flex items-center px-3 overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-foreground z-10">Request 1 (0ms)</span>
            {animationStep !== "idle" && (
              <div className="absolute top-2.5 w-6 h-6 rounded-md bg-primary flex items-center justify-center text-[10px] font-bold text-white shadow-xs animate-marquee">
                A
              </div>
            )}
            {reqAState === "success" && (
              <span className="absolute right-3 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={12} /> Processed
              </span>
            )}
          </div>

          {/* Request B lane */}
          <div className="relative h-12 bg-neutral/40 border border-border rounded-lg flex items-center px-3 overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-foreground z-10">Request 2 (+5ms)</span>
            {animationStep !== "idle" && (
              <div
                className={`absolute top-2.5 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-xs animate-marquee ${
                  lockEnabled && animationStep === "checking"
                    ? "bg-rose-500"
                    : "bg-sky-500"
                }`}
                style={{ animationDelay: "100ms" }}
              >
                B
              </div>
            )}
            {reqBState === "blocked" && (
              <span className="absolute right-3 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Lock size={12} /> Intercepted (409)
              </span>
            )}
            {reqBState === "success" && (
              <span className="absolute right-3 text-xs font-mono text-rose-400 font-bold flex items-center gap-1">
                <AlertTriangle size={12} /> Double-Charged!
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Database State */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-5 bg-card-nested border border-border rounded-xl space-y-4 text-center">
          <span className="text-[9px] font-mono text-neutral-foreground uppercase tracking-widest leading-none">
            Ledger Outcome
          </span>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground leading-tight">Transaction Log</h4>
            <p className="text-[11px] text-neutral-foreground leading-normal">
              State recorded in production ledger.
            </p>
          </div>

          <div className="w-full space-y-2 text-left font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-neutral border border-border flex items-center justify-between">
              <span className="text-neutral-foreground text-[11px]">Tx #1041:</span>
              <span className={reqAState === "success" ? "text-emerald-400 font-bold" : "text-neutral-foreground"}>
                {reqAState === "success" ? "$50.00 Claimed" : "Pending"}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral border border-border flex items-center justify-between">
              <span className="text-neutral-foreground text-[11px]">Tx #1042:</span>
              <span
                className={`font-bold ${
                  reqBState === "blocked"
                    ? "text-emerald-400"
                    : reqBState === "success"
                    ? "text-rose-400"
                    : "text-neutral-foreground"
                }`}
              >
                {reqBState === "blocked"
                  ? "Rejected (Idempotent)"
                  : reqBState === "success"
                  ? "$50.00 Claimed (BUG)"
                  : "Pending"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome Banner */}
      {animationStep === "result" && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 text-xs animate-fade-in ${
            lockEnabled
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          {lockEnabled ? (
            <>
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-200">Protected by Redis Lock & DB Idempotency:</strong>
                Request 2 was instantly rejected with HTTP 409 Conflict. The customer’s card was charged once, zero coupon leaks occurred, and system logs remained balanced.
              </div>
            </>
          ) : (
            <>
              <AlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-200">Vulnerable to Race Condition:</strong>
                Both checkout threads read the database balance simultaneously. Both charges succeeded, causing duplicate billing fees, inventory deficits, and chargeback disputes.
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
