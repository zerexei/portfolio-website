import React from 'react';
import { Hero } from '../components/layout/Hero';
import { About } from '../components/layout/About';
import { TechStack } from '../components/layout/TechStack';
import { FeaturedProject } from '../components/projects/FeaturedProject';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { Section } from '../components/common/Section';
import { projects } from '../data/projects';
import { resumeData } from '../data/resume';

export const Home: React.FC = () => {
  const caseStudies = projects.filter(p => p.featuredDetails);
  const otherProjects = projects.filter(p => !p.featuredDetails);

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

      <Section id="case-studies" className="space-y-8">
        <div className="space-y-4 max-w-2xl mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Case Studies</h2>
          <p className="text-zinc-400 text-lg">
            Deep-dives into the architecture, failure recovery, and concurrency controls of core systems.
          </p>
        </div>
        <div className="space-y-16">
          {caseStudies.map((project) => (
            <FeaturedProject key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <Section id="projects">
        <ProjectGrid projects={otherProjects} />
      </Section>

      <Section id="contact" className="text-center py-40">
        <div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Let's build something durable.</h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Whether you are looking to secure your SaaS backend against race conditions, integrate third-party APIs reliably, or assess your database workflows, I deliver production-ready code built strictly to your specifications.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href={resumeData.upwork} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-accent rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_0_20px_rgba(85,255,255,0.2)] hover:shadow-[0_0_30px_rgba(85,255,255,0.4)] hover:-translate-y-1"
            >
              Hire Me on Upwork
            </a>
            <a 
              href={`mailto:${resumeData.email}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-zinc-300 border border-zinc-700 rounded-full hover:bg-zinc-800 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              Email Directly
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};
