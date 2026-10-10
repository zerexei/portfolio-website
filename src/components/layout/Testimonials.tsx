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
  badgeVariant: string;
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
      badgeVariant: "badge-warning",
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
      badgeVariant: "badge-success",
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
      badgeVariant: "badge-info",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="text-primary font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
          <ShieldCheck size={14} /> Social Proof of Delivery
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          SaaS Founders & Engineering Teams Speak
        </h2>
        <p className="text-[var(--neutral-foreground)] text-sm md:text-base leading-relaxed">
          Read client testimonies on how these backend optimizations translated directly into revenue saved, hosting cost cuts, and uptime protection.
        </p>
      </div>

      {/* Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="card group relative flex flex-col justify-between p-6 md:p-8 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top quote icon decoration */}
            <div className="absolute top-6 right-6 text-border/60 group-hover:text-primary/20 transition-colors duration-300">
              <Quote size={32} />
            </div>

            <div className="space-y-5 relative z-10">
              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[var(--warning)] text-[var(--warning)] shrink-0"
                  />
                ))}
              </div>

              {/* Metric Badge */}
              <span className={`badge badge-mono ${review.badgeVariant}`}>
                {review.metric}
              </span>

              {/* Testimonial Quote */}
              <p className="text-foreground text-sm md:text-base leading-relaxed italic">
                "{review.quote}"
              </p>
            </div>

            {/* Client Bio */}
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border relative z-10">
              <div className="w-9 h-9 rounded-full bg-[var(--primary-tint)] border border-[var(--primary-border)] flex items-center justify-center font-bold font-mono text-xs text-primary shrink-0">
                {review.avatarInitials}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold truncate leading-tight">
                  {review.name}
                </h4>
                <p className="text-sm text-[var(--neutral-foreground)] font-medium leading-normal">
                  {review.role}, <span className="text-foreground">{review.company}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
