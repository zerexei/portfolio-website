import React from 'react';
import { Hero } from '../components/layout/Hero';
import { About } from '../components/layout/About';
import { TechStack } from '../components/layout/TechStack';
import { FeaturedProject } from '../components/projects/FeaturedProject';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { Section } from '../components/common/Section';
import { projects } from '../data/projects';

export const Home: React.FC = () => {
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="flex flex-col">
      <Section id="hero" className="border-b border-zinc-900/50">
        <Hero />
      </Section>
      
      <Section id="about">
        <About />
      </Section>

      <Section id="stack" className="bg-zinc-900/20">
        <TechStack />
      </Section>

      {featuredProject && (
        <Section id="featured">
          <FeaturedProject project={featuredProject} />
        </Section>
      )}


      <Section id="projects">

        <ProjectGrid projects={otherProjects} />
      </Section>

      <Section id="contact" className="text-center py-40">
        <div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Let's build something durable.</h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            I'm always open to discussing backend architecture, system design, or potential collaborations.
          </p>
          <div className="pt-4">
            <a 
              href="mailto:angeloarcillas64@gmail.com" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-accent rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_0_20px_rgba(85,255,255,0.2)] hover:shadow-[0_0_30px_rgba(85,255,255,0.4)] hover:-translate-y-1"
            >
              Get in touch
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};
