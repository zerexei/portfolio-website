import React from 'react';
import { Project } from '../../data/projects';
import { Tag } from '../common/Tag';
import { Button } from '../common/Button';
import { ExternalLink, Github, Layers, Cpu, Shield, Zap, CheckCircle2 } from 'lucide-react';

interface FeaturedProjectProps {
  project: Project;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  if (!project.featuredDetails) return null;

  return (
    <div className="py-20 space-y-12">
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">Featured Project</h2>

        <p className="text-zinc-400 text-lg italic">
          Deep dive into the architecture and scaling of {project.title}.
        </p>
      </div>



      <div className="card bg-zinc-900/40 border-zinc-800 p-8 md:p-12 space-y-12 relative overflow-hidden group hover:border-accent/20">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[120px] rounded-full -mr-32 -mt-32 group-hover:bg-accent/10 transition-colors duration-500" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-extrabold tracking-tighter text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
              {project.demo && (
                <Button variant="primary" onClick={() => window.open(project.demo, '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                </Button>
              )}
              {project.github && (
                <Button variant="secondary" onClick={() => window.open(project.github, '_blank')}>
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm">
                <Cpu size={16} className="text-accent/70" /> Problem
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.featuredDetails.problem}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm">
                <Layers size={16} className="text-accent/70" /> Architecture
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.featuredDetails.architecture}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm">
                <Shield size={16} className="text-accent/70" /> Challenges
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.featuredDetails.challenges}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm">
                <CheckCircle2 size={16} className="text-accent/70" /> Solutions
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.featuredDetails.solutions}
              </p>
            </div>
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm">
                <Zap size={16} className="text-accent/70" /> Impact
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.featuredDetails.impact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
