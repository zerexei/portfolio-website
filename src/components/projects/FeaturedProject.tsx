import React from "react";
import { Project } from "../../data/projects";
import { ExternalLink, Github } from "lucide-react";

interface FeaturedProjectProps {
  project: Project;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  if (!project.featuredDetails) return null;

  return (
    <div className="card !bg-zinc-950/20 !border !border-zinc-900 p-6 md:p-10 space-y-8 relative overflow-hidden group hover:!border-accent/15 transition-all duration-300">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[120px] rounded-full -mr-32 -mt-32 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-zinc-900/60">
        <div className="space-y-4 max-w-3xl">
          <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800/80 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-black bg-accent rounded-lg hover:bg-accent-hover transition-colors shadow-sm"
            >
              <ExternalLink size={13} className="mr-1.5" /> Visit Site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-zinc-300 border border-zinc-800 bg-zinc-900/40 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <Github size={13} className="mr-1.5" /> GitHub
            </a>
          )}
        </div>
      </div>

      {/* 3-Column Narrative Case Study */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
        {/* Column 1: Friction */}
        <div className="space-y-4 lg:pr-8 lg:border-r lg:border-zinc-900/60">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            01 / Operational Friction
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-zinc-300">The Problem</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {project.featuredDetails.problem}
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-zinc-300">Key Challenges</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {project.featuredDetails.challenges}
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Resolution */}
        <div className="space-y-4 lg:px-4 lg:border-r lg:border-zinc-900/60">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
            02 / System Engineering
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-zinc-300">Architecture</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {project.featuredDetails.architecture}
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-zinc-300">Implemented Solutions</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {project.featuredDetails.solutions}
              </p>
            </div>
          </div>
        </div>

        {/* Column 3: Outcome */}
        <div className="space-y-4 lg:pl-8">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            03 / Business Outcome
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-300">Measurable Impact</h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              {project.featuredDetails.impact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
