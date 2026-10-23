import React from "react";
import { resumeData } from "../../data/resume";
import { Tag } from "../common/Tag";
import { Briefcase } from "lucide-react";

export const About: React.FC = () => {
  return (
    <div className="space-y-16 animate-slide-up">
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Briefcase className="text-primary" size={24} /> Experience
        </h2>
        <p className="text-[var(--neutral-foreground)] text-lg">
          I build and scale reliable SaaS platforms, specializing in real-time
          and event-driven architectures, resilient API integrations, and scalable
          backend solutions that deliver business impact.
        </p>
      </div>

      <div className="space-y-0">
        {resumeData.experience.map((exp, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[160px_auto_1fr] gap-x-8 group"
          >
            {/* Date Column */}
            <div className="hidden md:block text-right pt-1">
              <span className="text-xs font-mono text-[var(--neutral-foreground)] uppercase tracking-widest group-hover:text-primary transition-colors">
                {exp.period}
              </span>
            </div>

            {/* Timeline Line & Dot Column */}
            <div className="relative flex flex-col items-center">
              {/* Dot */}
              <div className="w-3 h-3 rounded-full border-2 border-border bg-card z-10 mt-1.5 group-hover:border-primary group-hover:bg-primary transition-all duration-300" />
              {/* Vertical Line */}
              {index !== resumeData.experience.length - 1 && (
                <div className="w-px flex-1 bg-border group-hover:bg-primary/20 transition-colors" />
              )}
            </div>

            {/* Content Column */}
            <div className="pb-16 pt-0.5 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <span className="md:hidden text-xs font-mono text-[var(--neutral-foreground)] uppercase tracking-widest">
                    {exp.period}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[var(--neutral-foreground)] text-sm">
                  <span className="font-semibold text-foreground">
                    {exp.company}
                  </span>
                  <span>•</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              <div className="space-y-4 text-[var(--neutral-foreground)] leading-relaxed max-w-2xl">
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-border shrink-0 group-hover:bg-primary/40 transition-colors" />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: achievement.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-foreground">$1</strong>',
                          ),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {exp.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-12">
        <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          Education
        </h3>
        <div className="border-l-2 border-border ml-1.5 pl-8 space-y-2">
          <h4 className="text-lg font-bold">
            {resumeData.education.degree}
          </h4>
          <p className="text-[var(--neutral-foreground)] font-medium">
            {resumeData.education.school} • {resumeData.education.location}
          </p>
        </div>
      </div>
    </div>
  );
};
