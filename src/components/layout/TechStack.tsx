import React from "react";
import { resumeData } from "../../data/resume";
import { Server, Layout, Database, Cloud, Target } from "lucide-react";

export const TechStack: React.FC = () => {
  const categories = [
    {
      name: "Backend",
      icon: Server,
      skills: resumeData.skills.backend,
    },
    {
      name: "Frontend",
      icon: Layout,
      skills: resumeData.skills.frontend,
    },
    {
      name: "Databases",
      icon: Database,
      skills: resumeData.skills.databases,
    },
    {
      name: "Cloud & DevOps",
      icon: Cloud,
      skills: resumeData.skills.cloudDevops,
    },
    {
      name: "Engineering Focus",
      icon: Target,
      skills: resumeData.skills.engineeringFocus,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">Technical Arsenal</h2>
        <p className="text-zinc-400 text-base">
          Core technologies and principles I leverage to build dependable SaaS architectures.
        </p>
      </div>

      <div className="relative">
        {/* System Bus Line (Vertical Connector) */}
        <div className="absolute left-[46px] top-6 bottom-6 w-0.5 bg-zinc-900/50" />

        <div className="space-y-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="group relative flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-xl border border-transparent hover:border-zinc-900 hover:bg-zinc-950/20 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-11 h-11 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center relative z-10 text-zinc-400 group-hover:text-accent group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300 shadow-sm">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-white tracking-tight text-lg min-w-[220px] group-hover:text-accent transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>

                {/* Inline Badges */}
                <div className="flex flex-wrap gap-2 md:pl-6 flex-1">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-mono text-zinc-400 bg-zinc-900/60 border border-zinc-800 group-hover:border-zinc-700 rounded-md transition-colors duration-250"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
