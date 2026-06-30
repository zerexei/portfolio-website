import React from "react";
import { Project } from "../../data/projects";
import { Github, ExternalLink } from "lucide-react";

interface ProjectRowProps {
  project: Project;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ project }) => {
  return (
    <div className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-zinc-900 bg-zinc-950/20 hover:border-accent/15 hover:bg-zinc-900/10 transition-all duration-300">
      {/* Title & Tech */}
      <div className="space-y-2 md:w-[240px] shrink-0">
        <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-zinc-400 text-xs leading-relaxed flex-1 md:px-6">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex items-center gap-2 shrink-0 justify-start md:justify-end md:w-[100px]">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-500 hover:text-accent hover:bg-accent/5 rounded-lg border border-zinc-900/50 hover:border-accent/20 transition-all duration-300"
            title="View Code"
          >
            <Github size={15} />
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-500 hover:text-accent hover:bg-accent/5 rounded-lg border border-zinc-900/50 hover:border-accent/20 transition-all duration-300"
            title="Live Demo"
          >
            <ExternalLink size={15} />
          </a>
        )}
      </div>
    </div>
  );
};

export const ProjectGrid: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">Other Noteworthy Projects</h2>
        <p className="text-zinc-400 text-sm">
          A collection of backend tools, open-source libraries, and experiments.
        </p>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
