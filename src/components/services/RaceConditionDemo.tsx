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

    // Phase 1: In Flight (0ms to 1000ms)
    // Phase 2: Processing / Locking (1000ms to 2000ms)
    setTimeout(() => {
      setAnimationStep("checking");
      setReqAState("success");
      if (lockEnabled) {
        setReqBState("blocked");
      } else {
        setReqBState("success");
      }
    }, 1200);

    // Phase 3: Final Outcomes (2000ms+)
    setTimeout(() => {
      setAnimationStep("result");
      setAnimating(false);
    }, 2400);
  };

  return (
    <div className="card p-6 md:p-8 bg-zinc-950/40! border border-zinc-900 rounded-2xl relative overflow-hidden space-y-6">
      {/* Ambient background glow */}
      <div className={`absolute top-0 right-0 w-80 h-80 blur-[130px] rounded-full -mr-40 -mt-40 transition-colors duration-500 pointer-events-none ${
        animationStep === "result"
          ? lockEnabled
            ? "bg-emerald-500/10"
            : "bg-red-500/10"
          : "bg-accent/5"
      }`} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5 relative z-10">
        <div>
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Interactive Visualizer
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">
            How Concurrency & Race Conditions Hurt Your SaaS
          </h3>
          <p className="text-xs text-zinc-400 max-w-xl leading-relaxed mt-1">
            Simulate a customer clicking the "Checkout" button twice at the exact same millisecond. Toggle the lock to see how backend architecture prevents billing duplicate claims.
          </p>
        </div>

        {/* Switch Control */}
        <div className="flex items-center gap-3 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800 shrink-0 self-start md:self-auto">
          <span className="text-xs font-mono font-bold text-zinc-400">Lock Switch:</span>
          <button
            onClick={() => !animating && setLockEnabled(!lockEnabled)}
            disabled={animating}
            className={`relative flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-300 ${
              lockEnabled
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            } border cursor-pointer disabled:opacity-50`}
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
        <div className="md:col-span-4 flex flex-col items-center justify-center p-5 bg-zinc-900/20 border border-zinc-900 rounded-xl space-y-4 text-center">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
            User Action
          </span>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white leading-tight">Double-Click Checkout</h4>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Simulates two billing checks arriving simultaneously.
            </p>
          </div>
          
          <button
            onClick={runDemo}
            disabled={animating}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-black bg-accent hover:bg-accent-hover disabled:bg-zinc-800 disabled:text-zinc-500 rounded-lg transition-all duration-300 cursor-pointer disabled:cursor-not-allowed shadow-sm"
          >
            {animating ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> In Flight...
              </>
            ) : (
              <>
                <Play size={14} /> Simulate Clicks
              </>
            )}
          </button>
        </div>

        {/* Center: Interactive Animation Tracks */}
        <div className="md:col-span-4 flex flex-col justify-center space-y-6 py-4">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest text-center block leading-none">
            Server Ingress Pipeline
          </span>
          
          {/* Tracks Container */}
          <div className="space-y-4 relative px-4">
            {/* Track 1 */}
            <div className="h-6 w-full bg-zinc-950/80 border border-zinc-900 rounded-full relative overflow-hidden flex items-center px-1">
              {animationStep === "sending" && (
                <div className="absolute left-2 h-4 w-28 bg-linear-to-r from-accent to-accent-hover rounded-full animate-marquee text-[9px] font-bold text-black flex items-center justify-center font-mono uppercase tracking-wider shrink-0 leading-none">
                  Request A
                </div>
              )}
              {animationStep === "checking" && (
                <div className="absolute right-2 h-4 w-24 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-[9px] font-bold font-mono flex items-center justify-center uppercase tracking-wider shrink-0 leading-none">
                  Processing
                </div>
              )}
              {animationStep === "result" && (
                <div className="absolute right-2 h-4 w-24 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-full text-[9px] font-bold font-mono flex items-center justify-center uppercase tracking-wider shrink-0 leading-none">
                  Success
                </div>
              )}
              {animationStep === "idle" && (
                <span className="text-[9px] font-mono text-zinc-600 pl-3">Queue Track 1 Idle</span>
              )}
            </div>

            {/* Track 2 */}
            <div className="h-6 w-full bg-zinc-950/80 border border-zinc-900 rounded-full relative overflow-hidden flex items-center px-1">
              {animationStep === "sending" && (
                <div className="absolute left-2 h-4 w-28 bg-linear-to-r from-accent to-accent-hover rounded-full animate-marquee text-[9px] font-bold text-black flex items-center justify-center font-mono uppercase tracking-wider shrink-0 leading-none">
                  Request B
                </div>
              )}
              {animationStep === "checking" && (
                <div className={`absolute right-2 h-4 w-24 rounded-full text-[9px] font-bold font-mono flex items-center justify-center uppercase tracking-wider shrink-0 leading-none ${
                  lockEnabled
                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                }`}>
                  {lockEnabled ? "Deduplicating" : "Processing"}
                </div>
              )}
              {animationStep === "result" && (
                <div className={`absolute right-2 h-4 w-24 rounded-full text-[9px] font-bold font-mono flex items-center justify-center uppercase tracking-wider shrink-0 leading-none ${
                  lockEnabled
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                    : "bg-red-500/20 border-red-500/40 text-red-300 animate-pulse"
                }`}>
                  {lockEnabled ? "Blocked" : "Double Charge"}
                </div>
              )}
              {animationStep === "idle" && (
                <span className="text-[9px] font-mono text-zinc-600 pl-3">Queue Track 2 Idle</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Database Outcomes */}
        <div className={`md:col-span-4 flex flex-col justify-center p-5 border rounded-xl space-y-4 transition-all duration-500 ${
          animationStep === "result"
            ? lockEnabled
              ? "bg-emerald-950/10 border-emerald-900/30"
              : "bg-red-950/10 border-red-900/30"
            : "bg-zinc-900/20 border-zinc-900"
        }`}>
          <div className="text-center space-y-1">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block leading-none">
              SaaS Database State
            </span>
            <h4 className="text-sm font-bold text-white leading-tight">Transaction Log</h4>
          </div>

          <div className="space-y-2 font-mono text-[10px]">
            <div className="flex items-center justify-between p-2 bg-zinc-950/40 rounded border border-zinc-900">
              <span className="text-zinc-500">Request A:</span>
              <span className={reqAState === "success" ? "text-emerald-400 font-bold" : "text-zinc-600"}>
                {reqAState === "success" ? "$49.00 Charged" : "Pending"}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-zinc-950/40 rounded border border-zinc-900">
              <span className="text-zinc-500">Request B:</span>
              <span className={`font-bold ${
                reqBState === "success"
                  ? "text-red-400"
                  : reqBState === "blocked"
                  ? "text-amber-400"
                  : "text-zinc-600"
              }`}>
                {reqBState === "success" && "$49.00 Charged"}
                {reqBState === "blocked" && "Deduplicated (Blocked)"}
                {reqBState === "idle" && "Pending"}
              </span>
            </div>
          </div>

          {/* Banner */}
          {animationStep === "result" && (
            <div className={`p-3 rounded-lg border text-center text-xs font-semibold leading-relaxed animate-fade-in ${
              lockEnabled
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {lockEnabled ? (
                <div className="flex items-center gap-1.5 justify-center">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>Double Charge Prevented Safely</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 justify-center">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>Double Charged ($98 total) & Refund Triggered</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
