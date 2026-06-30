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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white flex items-center gap-3">
            <Cpu className="text-accent" size={32} /> System Design
          </h1>
          <p className="text-zinc-400 text-lg">
            Visualizing the components, failure boundaries, and execution models
            of key backend infrastructures.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {systemDesigns.map((design) => {
            const Icon = design.icon;
            return (
              <Link
                key={design.id}
                to={routes.systemDesignDetail.getPath(design.slug)}
                className="group relative overflow-hidden flex flex-col md:!flex-row md:items-center justify-between w-full p-8 card hover:!bg-zinc-900 hover:!border-accent/15 transition-all duration-300 !border-zinc-800 text-left"
              >
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[100px] rounded-full -mr-24 -mt-24 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />

                <div className="flex-1 text-left">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-zinc-900 rounded-xl text-accent shrink-0 w-fit">
                        <Icon size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                        {design.title}
                      </h2>
                    </div>
                    <p className="text-zinc-400 leading-relaxed max-w-2xl">
                      {design.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:pl-8 shrink-0">
                  <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-accent group-hover:border-accent/50 transition-all shadow-sm group-hover:shadow-accent/10">
                    <ArrowRight size={20} />
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
