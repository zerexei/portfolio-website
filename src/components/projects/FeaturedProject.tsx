import React, { useState } from "react";
import { Project } from "../../data/projects";
import { ExternalLink, Github, ChevronDown, ChevronUp, Flag, Eye, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Tag } from "../common/Tag";
import { motion, AnimatePresence } from "framer-motion";

interface FeaturedProjectProps {
  project: Project;
  defaultExpanded?: boolean;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!project.featuredDetails) return null;

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
    <div className="card p-5 md:p-6 space-y-5 relative overflow-hidden group transition-all duration-300">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-3 border-b border-border">
        <div className="space-y-2 max-w-3xl">
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-neutral-foreground text-xs md:text-sm leading-relaxed">
            {project.description}
          </p>
          {/* Hackathon badges */}
          {project.hackathon && project.hackathon.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="text-[9px] font-mono text-neutral-foreground uppercase tracking-widest shrink-0">Competed in</span>
              {project.hackathon.map((name) => (
                <span
                  key={name}
                  className="badge badge-mono text-sky-400 border-sky-500/20 bg-sky-500/10 gap-1.5"
                >
                  <Flag size={9} className="shrink-0 text-sky-400" />
                  {name}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {project.tech.map((t) => (
              <Tag key={t} className="text-[10px] px-2 py-0.5">{t}</Tag>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary button-sm text-xs"
            >
              <ExternalLink size={12} className="mr-1" /> Visit Site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary button-sm text-xs"
            >
              <Github size={12} className="mr-1" /> GitHub
            </a>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="button button-ghost button-sm text-xs cursor-pointer"
          >
            {isExpanded ? (
              <>
                Hide Details <ChevronUp size={13} className="ml-1" />
              </>
            ) : (
              <>
                View Deep Dive <ChevronDown size={13} className="ml-1" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── Compact Visual Screenshot Carousel Strip ─── */}
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-foreground font-semibold flex items-center gap-1.5">
              <Eye size={12} className="text-primary" /> Visual Previews ({project.screenshots.length})
            </span>
            <span className="text-[10px] text-neutral-foreground font-mono">
              Click thumbnail for high-res preview
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1.5 scrollbar-thin">
            {project.screenshots.map((s, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className="group/thumb relative w-40 sm:w-48 shrink-0 aspect-16/10 rounded-lg overflow-hidden bg-neutral/40 border border-border cursor-pointer transition-all duration-200 hover:border-primary/50 hover:shadow-xs"
              >
                <img
                  src={s.thumbnail}
                  alt={s.caption}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105"
                />
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Maximize2 size={13} className="text-foreground" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-1 bg-background/85 backdrop-blur-xs text-[9px] text-neutral-foreground truncate px-1.5">
                  {s.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3-Column Narrative Case Study (Collapsible to save vertical space) */}
      {isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-border animate-fade-in">
          {/* Column 1: Friction */}
          <div className="space-y-3 lg:pr-6 lg:border-r lg:border-border">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              01 / Operational Friction
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">The Problem</h4>
                <p className="text-neutral-foreground text-xs leading-relaxed">
                  {project.featuredDetails.problem}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">Key Challenges</h4>
                <p className="text-neutral-foreground text-xs leading-relaxed">
                  {project.featuredDetails.challenges}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Resolution */}
          <div className="space-y-3 lg:px-4 lg:border-r lg:border-border">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              02 / System Engineering
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">Architecture</h4>
                <p className="text-neutral-foreground text-xs leading-relaxed">
                  {project.featuredDetails.architecture}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">Implemented Solutions</h4>
                <p className="text-neutral-foreground text-xs leading-relaxed">
                  {project.featuredDetails.solutions}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Outcome */}
          <div className="space-y-3 lg:pl-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-emerald-400 relative z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              03 / Business Outcome
            </div>
            <div className="space-y-1.5 relative z-10">
              <h4 className="text-xs font-bold text-emerald-300">Measurable Impact</h4>
              <p className="text-foreground/90 text-xs leading-relaxed">
                {project.featuredDetails.impact}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Lightbox Modal for Full Preview ─── */}
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
                <div className="flex items-center gap-2">
                  <a
                    href={currentScreenshot.thumbnail}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-ghost button-sm text-xs gap-1 hidden sm:inline-flex"
                  >
                    Open Full Size <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => setActiveImageIndex(null)}
                    className="p-1.5 rounded-lg text-neutral-foreground hover:text-foreground hover:bg-neutral cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
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
