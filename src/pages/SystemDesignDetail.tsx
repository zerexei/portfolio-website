import React from "react";
import { useParams, Link } from "react-router-dom";
import { Section } from "../components/common/Section";
import { systemDesigns } from "../data/systemDesigns";
import { Mermaid } from "../components/common/Mermaid";
import { ArrowLeft, Cpu } from "lucide-react";
import routes from "@/routes";

export const SystemDesignDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const design = systemDesigns.find((d) => d.slug === slug);

  if (!design) {
    return (
      <Section className="text-center">
        <h1 className="text-3xl font-bold mb-6">
          System Design Spec Not Found
        </h1>
        <Link
          to={routes.systemDesign.path}
          className="text-primary hover:text-foreground transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={20} /> Back to System Design
        </Link>
      </Section>
    );
  }

  const Icon = design.icon;

  return (
    <Section>
      <div className="max-w-3xl mx-auto space-y-12 pt-20">
        <Link
          to={routes.systemDesign.path}
          className="text-[var(--neutral-foreground)] hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back to System Design
        </Link>

        <header className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="icon-box">
              <Icon size={20} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter">
              {design.title}
            </h1>
          </div>
          <p className="text-lg text-[var(--neutral-foreground)] leading-relaxed italic border-l-2 border-primary/30 pl-6">
            {design.description}
          </p>
        </header>

        {/* Mermaid Chart */}
        <div className="card p-6 md:p-8">
          <Mermaid chart={design.chart} />
        </div>

        {/* Tradeoffs list */}
        <div className="space-y-6 pt-8 border-t border-border">
          <h3 className="text-sm font-semibold text-[var(--neutral-foreground)] font-mono uppercase tracking-wider flex items-center gap-2">
            <Cpu size={16} className="text-primary" /> Architectural Decisions & Trade-offs
          </h3>
          <ul className="space-y-4">
            {design.tradeoffs.map((item, i) => {
              const parts = item.split(':** ');
              return (
                <li key={i} className="text-sm leading-relaxed text-[var(--neutral-foreground)] flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <div>
                    {parts.length > 1 ? (
                      <>
                        <strong className="text-foreground">
                          {parts[0].replace(/^\*\*/, "")}
                        </strong>: {parts[1]}
                      </>
                    ) : (
                      item
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
};
