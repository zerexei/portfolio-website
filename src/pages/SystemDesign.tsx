import React from "react";
import { Link } from "react-router-dom";
import { Section } from "../components/common/Section";
import { systemDesigns } from "../data/systemDesigns";
import { ArrowRight, Cpu } from "lucide-react";
import routes from "@/routes";

export const SystemDesign: React.FC = () => {
  return (
    <Section>
      <div className="space-y-12 pt-20">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-3">
            <Cpu className="text-primary" size={32} /> System Design
          </h1>
          <p className="text-[var(--neutral-foreground)] text-lg">
            Visualizing the components, failure boundaries, and execution models
            of key backend infrastructures.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {systemDesigns.map((design) => {
            const Icon = design.icon;
            return (
              <Link
                key={design.id}
                to={routes.systemDesignDetail.getPath(design.slug)}
                className="card group flex flex-col md:flex-row md:items-center justify-between w-full p-6 md:p-8 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 text-left"
              >
                <div className="flex-1 text-left">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-4">
                      <div className="icon-box group-hover:bg-[var(--primary-tint)] group-hover:text-primary group-hover:border-[var(--primary-border)] transition-all shrink-0">
                        <Icon size={18} />
                      </div>
                      <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {design.title}
                      </h2>
                    </div>
                    <p className="text-[var(--neutral-foreground)] leading-relaxed max-w-2xl text-sm pl-10">
                      {design.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pl-8 shrink-0">
                  <div className="icon-box group-hover:bg-[var(--primary-tint)] group-hover:text-primary group-hover:border-[var(--primary-border)] transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
