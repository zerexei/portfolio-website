import React, { useState } from "react";
import { resumeData } from "../../data/resume";
import { Zap, RefreshCw, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, Layers, Key, Lock, DollarSign, Cloud, Mail } from "lucide-react";
import { RaceConditionDemo } from "./RaceConditionDemo";

export const ProblemSolutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const calendlyUrl = resumeData.calendly || "https://calendly.com/angeloarcillas64";

  const tabs = [
    {
      id: "webhooks",
      label: "Lost Leads & Double Charges",
      icon: RefreshCw,
      problemTitle: "Stop Lost Sales & Duplicate Customer Charges",
      painPoint:
        "When customers submit checkout requests twice or messaging webhooks retry, systems can double-charge users or drop their data entirely. This leads to user frustration, chargeback fees, and lost sales leads.",
      solvedByService: "API & Webhook Integration",
      servicePrice: "From $750",
      solutionHighlight:
        "I build dynamic request validation locks that detect repeat checkouts in milliseconds. This guarantees your customers are only charged once and no sales leads ever slip through the cracks.",
      proofCase:
        "Smicos System: Saved thousands in transaction refund disputes by handling 50K+ daily sales events with 0 lost leads and 0 double-billing errors.",
      badgeColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    },
    {
      id: "workers",
      label: "System Crashes & Hangs",
      icon: Zap,
      problemTitle: "Keep Your App Online During High-Traffic Surges",
      painPoint:
        "A sudden spike in user signups or a brief outage of an external API can overload your servers. Without proper job throttling, background queues crash, causing frozen pages and direct client churn.",
      solvedByService: "Backend Feature Development",
      servicePrice: "From $1,500",
      solutionHighlight:
        "I engineer fail-safe queue monitors. If an external service fails, your app buffers the requests safely and retries them automatically when the system recovers—without crashing your main site.",
      proofCase:
        "AD. Publish: Guaranteed 100% website uptime and zero data loss during high-traffic surges and third-party service outages.",
      badgeColor: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    },
    {
      id: "database",
      label: "Slow Pages & Server Bills",
      icon: ShieldAlert,
      problemTitle: "Speed Up App Loading Times & Cut Hosting Bills",
      painPoint:
        "Overloaded servers bloat your database and spike monthly hosting bills. Slow page response times damage your customer retention rates and hurt your application's SEO rankings.",
      solvedByService: "Software Reliability Assessment",
      servicePrice: "Flat $1,000",
      solutionHighlight:
        "I audit your database, optimize heavy search queries, and move slow operations out of the main page-loading path. This cuts server hosting fees and makes pages load instantly.",
      proofCase:
        "AD. Sentry: Accelerated report compilation times, reduced server CPU load, and eliminated error warning noise by 90%.",
      badgeColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    },
    {
      id: "rate-limits",
      label: "AI & API Rate Limits",
      icon: Key,
      problemTitle: "Prevent API Limits From Throttling Your Users",
      painPoint:
        "Relying on external APIs (like OpenAI or Salesforce) means high-volume usage spikes can hit vendor rate limits, locking your users out and showing them spinning loaders or error messages.",
      solvedByService: "API & Webhook Integration",
      servicePrice: "From $1,000",
      solutionHighlight:
        "I implement smart client queues and credential rotators that buffer sudden outbound requests and schedule them dynamically, keeping your third-party integrations active and stable.",
      proofCase:
        "AD. Sentinel: Provided uninterrupted AI queries and system sync pipelines under heavy usage spikes and vendor rate thresholds.",
      badgeColor: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    },
    {
      id: "race-conditions",
      label: "Coupon & Booking Leaks",
      icon: Lock,
      problemTitle: "Block Duplicate Coupon Claims & Booking Collisions",
      painPoint:
        "When multiple users try to claim a limited discount code, coupon, or event ticket at the exact same millisecond, systems can double-allocate inventory or leak promo codes, causing direct revenue loss.",
      solvedByService: "Backend Feature Development",
      servicePrice: "From $1,200",
      solutionHighlight:
        "I build atomic database locks and transaction checks that block concurrent checkouts from claiming the same resource, protecting your billing catalog and catalog margins.",
      proofCase:
        "Smicos System: Protected critical promo catalogs and ticket stock with 0 duplicate checkouts or resource collisions under heavy launch traffic.",
      badgeColor: "text-rose-400 border-rose-400/30 bg-rose-400/10",
    },
    {
      id: "billing-sync",
      label: "Stripe & Billing Out of Sync",
      icon: DollarSign,
      problemTitle: "Reconcile Stripe Subscription & Customer Access Automatically",
      painPoint:
        "When customers upgrade, cancel, or fail subscription billing, your local database must update instantly. Webhook failures or delayed syncs lock out paying users or let non-payers keep premium access.",
      solvedByService: "API & Webhook Integration",
      servicePrice: "From $1,000",
      solutionHighlight:
        "I build self-healing webhook listeners and fallback background sync engines. If Stripe experiences a network blip, the system catches up automatically, keeping billing statuses perfectly unified.",
      proofCase:
        "Billing Sync Engine: Secured subscription upgrades and cancellations for over 10K+ users with 0 access delays or double-billing conflicts.",
      badgeColor: "text-green-400 border-green-400/30 bg-green-400/10",
    },
    {
      id: "media-uploads",
      label: "Slow File Uploads & Timeouts",
      icon: Cloud,
      problemTitle: "Process Avatar & Document Uploads Without Server Crashes",
      painPoint:
        "Users uploading large attachments (avatars, PDFs, or CSV logs) directly to your web server blocks processing threads, freezing the page and causing server timeouts.",
      solvedByService: "Backend Feature Development",
      servicePrice: "From $850",
      solutionHighlight:
        "I implement secure, client-side pre-signed uploads straight to cloud bucket storage (S3/Cloudflare R2). Large files bypass your server entirely, saving CPU and bandwidth bills.",
      proofCase:
        "Presigned Storage Module: Migrated media ingest streams out-of-band, reducing main web server bandwidth and CPU usage by 60%.",
      badgeColor: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    },
    {
      id: "email-deliverability",
      label: "Emails Going to Spam",
      icon: Mail,
      problemTitle: "Ensure Critical Verification Codes & Invoices Land in Inboxes",
      painPoint:
        "Password resets, magic links, or invoice receipts landing in the Spam folder or getting delayed halts user onboarding, spikes support tickets, and damages your brand.",
      solvedByService: "Backend Feature Development",
      servicePrice: "From $750",
      solutionHighlight:
        "I configure DMARC/DKIM/SPF domain policies, transition email alerts to background workers (so user threads never wait), and setup feedback handlers to bounce dead mail addresses.",
      proofCase:
        "Transactional Mail Module: Maintained a 99.9% inbox delivery rate with under 3-second delivery speeds for critical verification alerts.",
      badgeColor: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    },
  ];

  const current = tabs[activeTab];
  const CurrentIcon = current.icon;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Section Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="text-accent font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
          <Layers size={14} /> Problem → Solution Architecture
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Real SaaS Problems Solved By Service
        </h2>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          Select an operational pain point below to see how targeted backend engineering resolves it.
        </p>
      </div>

      {/* Symmetrical Grid Tab Navigation (2x4 on Mobile, 4x2 on Desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-zinc-950/60 border border-zinc-900 rounded-xl">
        {tabs.map((tab, idx) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[11px] font-semibold transition-all duration-300 border text-left justify-start ${
                isActive
                  ? "bg-zinc-900 border-zinc-800 text-white shadow-sm shadow-accent/5"
                  : "bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
              }`}
            >
              <TabIcon size={14} className={isActive ? "text-accent shrink-0" : "text-zinc-500 shrink-0"} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Card display */}
      <div className="card p-6 md:p-8 relative overflow-hidden bg-zinc-950/40! border border-zinc-800/80 rounded-2xl min-h-90 flex flex-col justify-between">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />

        <div className="space-y-6 relative z-10 animate-fade-in flex-1 flex flex-col justify-between" key={activeTab}>
          <div className="space-y-6">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-accent shrink-0">
                  <CurrentIcon size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {current.problemTitle}
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Solves: <strong className="text-zinc-300 font-semibold">{current.solvedByService}</strong>
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${current.badgeColor}`}>
                {current.servicePrice}
              </span>
            </div>

            {/* Grid Layout: Pain vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Operational Pain Point */}
              <div className="space-y-2 p-5 bg-red-950/10 border border-red-900/20 rounded-xl">
                <div className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold flex items-center gap-1.5 leading-none">
                  <AlertTriangle size={12} /> Operational Pain
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  {current.painPoint}
                </p>
              </div>

              {/* Right: Solution Strategy */}
              <div className="space-y-2 p-5 bg-emerald-950/10 border border-emerald-900/20 rounded-xl">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5 leading-none">
                  <CheckCircle2 size={12} /> Solution Strategy
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  {current.solutionHighlight}
                </p>
              </div>
            </div>
          </div>

          {/* Footer: Proven Case Proof & Booking CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-zinc-900/20 border-t border-zinc-900 rounded-b-2xl -mx-6 -mb-6 mt-6">
            <div className="space-y-1 flex-1">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block leading-none">
                Validated Case Proof
              </span>
              <p className="text-zinc-200 text-xs font-medium max-w-xl leading-normal">
                {current.proofCase}
              </p>
            </div>

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-black bg-accent rounded-lg hover:bg-accent-hover transition-all duration-300 gap-1.5 shrink-0 shadow-sm"
            >
              Book Solution <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Concurrency Visualizer */}
      <RaceConditionDemo />
    </div>
  );
};
