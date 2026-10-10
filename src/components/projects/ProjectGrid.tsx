import React, { useState } from "react";
import { Project } from "../../data/projects";
import { Github, ExternalLink, Flag, Eye, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Tag } from "../common/Tag";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectRowProps {
  project: Project;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ project }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const currentScreenshot = activeImageIndex !== null && project.screenshots
    ? project.screenshots[activeImageIndex]
    : null;

  const handleNextModal = () => {
    if (!project.screenshots || activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % project.screenshots.length);
  };

  const handlePrevModal = () => {
    if (!project.screenshots || activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + project.screenshots.length) % project.screenshots.length);
  };

  return (
    <div className="group relative flex flex-col gap-3 p-4 rounded-xl border border-border bg-card-nested hover:border-primary/40 hover:bg-neutral/40 transition-all duration-200">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Title & Tech */}
        <div className="space-y-1.5 md:w-64 shrink-0">
          <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <Tag key={t} className="text-[9px] px-1.5 py-0.2">{t}</Tag>
            ))}
          </div>
          {project.hackathon && project.hackathon.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              <span className="text-[9px] font-mono text-neutral-foreground uppercase tracking-widest shrink-0">Competed in</span>
              {project.hackathon.map((name) => (
                <span
                  key={name}
                  className="badge badge-mono text-sky-400 border-sky-500/20 bg-sky-500/10 gap-1 text-[9px] py-0 px-1.5"
                >
                  <Flag size={8} className="shrink-0 text-sky-400" />
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-neutral-foreground text-xs leading-relaxed flex-1 md:px-4">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-2 shrink-0 justify-start md:justify-end">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-neutral-foreground hover:text-primary hover:bg-primary-tint rounded-lg border border-border transition-all duration-200"
              title="View Code"
            >
              <Github size={14} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-neutral-foreground hover:text-primary hover:bg-primary-tint rounded-lg border border-border transition-all duration-200"
              title="Live Demo"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Visual Product Thumbnails Strip (if project has screenshots, e.g. Kape Calle) */}
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="pt-2 border-t border-border/60">
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
            {project.screenshots.map((s, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className="group/thumb relative w-36 sm:w-44 shrink-0 aspect-16/10 rounded-md overflow-hidden bg-neutral/40 border border-border cursor-pointer transition-all duration-200 hover:border-primary/50"
              >
                <img
                  src={s.thumbnail}
                  alt={s.caption}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105"
                />
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Maximize2 size={12} className="text-foreground" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-1 bg-background/85 backdrop-blur-xs text-[8px] text-neutral-foreground truncate px-1">
                  {s.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentScreenshot && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
            onClick={() => setActiveImageIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card-nested">
                <div className="flex items-center gap-3">
                  <span className="badge badge-mono text-primary bg-primary-tint border border-primary-border">
                    {project.title}
                  </span>
                  <span className="text-xs text-foreground font-semibold">
                    {currentScreenshot.caption}
                  </span>
                </div>
                <button
                  onClick={() => setActiveImageIndex(null)}
                  className="p-1.5 rounded-lg text-neutral-foreground hover:text-foreground hover:bg-neutral cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative flex-1 bg-neutral/30 flex items-center justify-center p-4 min-h-[300px]">
                <img
                  src={currentScreenshot.thumbnail}
                  alt={currentScreenshot.caption}
                  className="max-h-[65vh] max-w-full w-auto object-contain rounded-lg border border-border shadow-md"
                />
                {project.screenshots && project.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevModal}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-card/90 hover:bg-card border border-border text-foreground hover:text-primary transition-all shadow-md cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextModal}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-card/90 hover:bg-card border border-border text-foreground hover:text-primary transition-all shadow-md cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProjectGrid: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-bold tracking-tight text-foreground">Other Noteworthy Products & Tools</h3>
        <p className="text-neutral-foreground text-xs">
          Interactive products, open-source libraries, and backend tools. Click screenshots to preview interfaces.
        </p>
      </div>

      <div className="space-y-2.5">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
