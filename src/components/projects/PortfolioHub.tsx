import React, { useState } from "react";
import { Project } from "../../data/projects";
import { systemDesigns, SystemDesignItem } from "../../data/systemDesigns";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectGrid } from "./ProjectGrid";
import { Mermaid } from "../common/Mermaid";
import { Trophy, Cpu, Code2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import routes from "@/routes";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioHubProps {
  caseStudies: Project[];
  otherProjects: Project[];
}

interface ArchitectureSpecCardProps {
  design: SystemDesignItem;
}

const ArchitectureSpecCard: React.FC<ArchitectureSpecCardProps> = ({ design }) => {
  return (
    <div className="card p-6 md:p-8 space-y-6 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border relative z-10">
        <div>
          <h3 className="text-xl font-bold text-foreground tracking-tight">
            {design.title}
          </h3>
          <p className="text-neutral-foreground text-xs mt-1">
            {design.description}
          </p>
        </div>
        <Link
          to={routes.systemDesignDetail.getPath(design.slug)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
        >
          Full Specification Spec <ExternalLink size={13} />
        </Link>
      </div>

      {/* Mermaid Diagram Container */}
      <div className="w-full bg-card-nested border border-border rounded-xl p-4 md:p-6 overflow-x-auto relative z-10">
        <Mermaid chart={design.chart} />
      </div>

      {/* Architectural Trade-offs List */}
      <div className="space-y-3 pt-2 relative z-10">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-foreground font-semibold block">
          Key Architectural Trade-offs & Fail-Safes
        </span>
        <ul className="space-y-2">
          {design.tradeoffs.map((item, i) => (
            <li key={i} className="text-xs text-neutral-foreground flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>{item.replace(/\*\*/g, "")}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const PortfolioHub: React.FC<PortfolioHubProps> = ({
  caseStudies,
  otherProjects,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedDesignSlug, setSelectedDesignSlug] = useState<string>("ad-sentinel");

  const tabs = [
    {
      id: "case-studies",
      label: "System Case Studies",
      icon: Trophy,
      badge: `${caseStudies.length} Deep Dives`,
    },
    {
      id: "architecture",
      label: "System Architecture Specs",
      icon: Cpu,
      badge: `${systemDesigns.length} Specs`,
    },
    {
      id: "open-source",
      label: "Open-Source & Repos",
      icon: Code2,
      badge: `${otherProjects.length} Repos`,
    },
  ];

  const currentDesign =
    systemDesigns.find((d) => d.slug === selectedDesignSlug) || systemDesigns[0];

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="space-y-3 max-w-2xl">
        <div className="text-primary font-mono text-xs uppercase tracking-widest font-semibold">
          Engineering Proof & Portfolio
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Technical Proof & System Architecture
        </h2>
        <p className="text-neutral-foreground text-sm md:text-base leading-relaxed">
          Filter below to inspect production case studies, interactive system design blueprints, or open-source tooling.
        </p>
      </div>

      {/* Tab Controls */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-card-nested border border-border rounded-xl w-fit relative z-10">
        {tabs.map((tab, idx) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors duration-300 cursor-pointer z-10 ${
                isActive
                  ? "text-foreground"
                  : "text-neutral-foreground hover:text-foreground hover:bg-neutral"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePortfolioTab"
                  className="absolute inset-0 bg-card border border-border rounded-lg z-0 shadow-xs"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <TabIcon
                size={14}
                className={`relative z-10 ${isActive ? "text-primary" : "text-neutral-foreground"}`}
              />
              <span className="relative z-10">{tab.label}</span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded relative z-10 transition-colors duration-300 ${
                  isActive
                    ? "bg-primary-tint text-primary border border-primary-border"
                    : "bg-neutral text-neutral-foreground"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display with Smooth Transitions */}
      <div className="min-h-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeTab === 0 && (
              <div className="space-y-8">
                {caseStudies.map((project, index) => (
                  <FeaturedProject
                    key={project.id}
                    project={project}
                    defaultExpanded={index === 0 || project.id === "ad-sentinel"}
                  />
                ))}
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-6">
                {/* Spec selector buttons */}
                <div className="flex flex-wrap gap-2 pb-2 border-b border-border">
                  {systemDesigns.map((design) => {
                    const isSelected = selectedDesignSlug === design.slug;
                    return (
                      <button
                        key={design.slug}
                        onClick={() => setSelectedDesignSlug(design.slug)}
                        className={`relative px-3.5 py-2 rounded-lg text-xs font-mono transition-colors duration-300 cursor-pointer z-10 ${
                          isSelected
                            ? "text-primary font-bold"
                            : "text-neutral-foreground hover:text-foreground"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeSpecTab"
                            className="absolute inset-0 bg-primary-tint border border-primary-border rounded-lg z-0"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{design.title.split(":")[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Spec Card with Mermaid Diagram */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDesignSlug}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArchitectureSpecCard design={currentDesign} />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <ProjectGrid projects={otherProjects} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
