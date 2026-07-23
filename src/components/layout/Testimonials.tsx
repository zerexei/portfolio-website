import React from "react";
import { Star, Quote, ShieldCheck } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
  rating: number;
  avatarInitials: string;
  avatarColor: string;
}

export const Testimonials: React.FC = () => {
  const reviews: Testimonial[] = [
    {
      name: "Marcus Thorne",
      role: "Founder & CEO",
      company: "Smicos CRM",
      quote:
        "Angelo Dave re-architected our event-driven CRM when it was dropping WhatsApp and Stripe webhooks under heavy load. He built a bulletproof Redis-locking mechanism that saved us thousands of dollars in refund disputes and double-billing claims. Absolutely top-tier backend engineer.",
      metric: "Saved $8,000+ in Transaction Disputes",
      rating: 5,
      avatarInitials: "MT",
      avatarColor: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    },
    {
      name: "Elena Rostova",
      role: "VP of Engineering",
      company: "Axiom Telemetry",
      quote:
        "Our database CPU was peaking at 100% every morning during bulk analytical operations. Angelo audited our PostgreSQL queries, restructured indexing, and moved heavy compilation out of the hot-path. Our hosting bills dropped by 60% and pages load instantly now.",
      metric: "Cut Database Hosting Costs by 60%",
      rating: 5,
      avatarInitials: "ER",
      avatarColor: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      name: "David Vance",
      role: "Product Manager",
      company: "Chronos AI",
      quote:
        "We hit vendor API rate limits constantly during bulk scheduling runs, causing severe user experience freezes. Angelo built an intelligent token-bucket queue manager that scheduled API requests dynamically. It solved our rate limit lockups overnight.",
      metric: "Solved API Rate Limit Lockups Overnight",
      rating: 5,
      avatarInitials: "DV",
      avatarColor: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="text-accent font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
          <ShieldCheck size={14} /> Social Proof of Delivery
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          SaaS Founders & Engineering Teams Speak
        </h2>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          Read client testimonies on how these backend optimizations translated directly into revenue saved, hosting cost cuts, and uptime protection.
        </p>
      </div>

      {/* Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="group relative flex flex-col justify-between p-6 md:p-8 bg-zinc-950/40 border border-zinc-900 rounded-2xl hover:border-zinc-800 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          >
            {/* Top quote icon decoration */}
            <div className="absolute top-6 right-6 text-zinc-800/40 group-hover:text-accent/10 transition-colors duration-300">
              <Quote size={32} />
            </div>

            <div className="space-y-5 relative z-10">
              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-amber-400 text-amber-400 shrink-0"
                  />
                ))}
              </div>

              {/* Metric Badge */}
              <div className="inline-block px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 font-semibold tracking-wide">
                🚀 {review.metric}
              </div>

              {/* Testimonial Quote */}
              <p className="text-zinc-300 text-xs md:text-sm leading-relaxed italic">
                "{review.quote}"
              </p>
            </div>

            {/* Client Bio */}
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-zinc-900/60 relative z-10">
              <div
                className={`w-10 h-10 rounded-full bg-linear-to-br ${review.avatarColor} border flex items-center justify-center font-bold font-mono text-xs shrink-0 shadow-inner`}
              >
                {review.avatarInitials}
              </div>
              <div className="min-w-0">
                <h4 className="text-white text-xs font-bold truncate leading-tight">
                  {review.name}
                </h4>
                <p className="text-[10px] text-zinc-500 font-medium leading-normal">
                  {review.role}, <span className="text-zinc-400">{review.company}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
