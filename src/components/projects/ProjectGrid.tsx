import React from "react";
import { Project } from "../../data/projects";
import { Github, ExternalLink, Flag } from "lucide-react";
import { Tag } from "../common/Tag";

interface ProjectRowProps {
  project: Project;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ project }) => {
  return (
    <div className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-border bg-card-nested hover:border-primary/40 hover:bg-neutral transition-all duration-300">
      {/* Title & Tech */}
      <div className="space-y-2 md:w-60 shrink-0">
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        {project.hackathon && project.hackathon.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[10px] font-mono text-neutral-foreground uppercase tracking-widest shrink-0">Competed in</span>
            {project.hackathon.map((name) => (
              <span
                key={name}
                className="badge badge-mono text-sky-400 border-sky-500/20 bg-sky-500/10 gap-1"
              >
                <Flag size={9} className="shrink-0 text-sky-400" />
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-neutral-foreground text-sm leading-relaxed flex-1 md:px-6">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex items-center gap-2 shrink-0 justify-start md:justify-end md:w-25">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-foreground hover:text-primary hover:bg-primary-tint rounded-lg border border-border transition-all duration-300"
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
            className="p-2 text-neutral-foreground hover:text-primary hover:bg-primary-tint rounded-lg border border-border transition-all duration-300"
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
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Other Noteworthy Projects</h2>
        <p className="text-neutral-foreground text-sm">
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
