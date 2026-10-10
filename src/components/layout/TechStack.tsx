import React from "react";
import { resumeData } from "../../data/resume";
import { Server, Layout, Database, Cloud, Target } from "lucide-react";

export const TechStack: React.FC = () => {
  const categories = [
    { name: "Backend",            icon: Server,   skills: resumeData.skills.backend },
    { name: "Frontend",           icon: Layout,   skills: resumeData.skills.frontend },
    { name: "Databases",          icon: Database, skills: resumeData.skills.databases },
    { name: "Cloud & DevOps",     icon: Cloud,    skills: resumeData.skills.cloudDevops },
    { name: "Engineering Focus",  icon: Target,   skills: resumeData.skills.engineeringFocus },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight">
          Technical Arsenal
        </h2>
        <p className="text-[var(--neutral-foreground)] text-base">
          Core technologies and principles I leverage to build dependable SaaS
          architectures.
        </p>
      </div>

      <div className="relative">
        {/* System Bus Line */}
        <div className="absolute left-[46px] top-6 bottom-6 w-0.5 bg-border/50" />

        <div className="space-y-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="group relative flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-xl border border-transparent hover:border-border hover:bg-card transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="icon-box group-hover:bg-primary-tint group-hover:text-primary transition-all duration-300">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold tracking-tight text-lg min-w-[220px] group-hover:text-primary transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>

                {/* Inline Badges */}
                <div className="flex flex-wrap gap-2 md:pl-6 flex-1">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="tag">
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
