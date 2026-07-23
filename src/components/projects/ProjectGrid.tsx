import React from "react";
import { Project } from "../../data/projects";
import { Github, ExternalLink, Flag } from "lucide-react";

interface ProjectRowProps {
  project: Project;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ project }) => {
  return (
    <div className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-zinc-900 bg-zinc-950/20 hover:border-accent/15 hover:bg-zinc-900/10 transition-all duration-300">
      {/* Title & Tech */}
      <div className="space-y-2 md:w-60 shrink-0">
        <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded"
            >
              {t}
            </span>
          ))}
        </div>
        {project.hackathon && project.hackathon.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest shrink-0">Competed in</span>
            {project.hackathon.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono text-sky-300 bg-sky-400/10 border border-sky-400/20 rounded-full"
              >
                <Flag size={9} className="shrink-0 text-sky-400" />
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-zinc-400 text-sm leading-relaxed flex-1 md:px-6">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex items-center gap-2 shrink-0 justify-start md:justify-end md:w-25">
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
