import React from 'react';
import { Hero } from '../components/layout/Hero';
import { ProblemSolutions } from '../components/services/ProblemSolutions';
import { Services } from '../components/layout/Services';
import { Workflow } from '../components/layout/Workflow';
import { PortfolioHub } from '../components/projects/PortfolioHub';
import { Section } from '../components/common/Section';
import { projects } from '../data/projects';
import { resumeData } from '../data/resume';
import { Calendar } from 'lucide-react';

export const Home: React.FC = () => {
  const caseStudies = projects.filter(p => p.featuredDetails);
  const otherProjects = projects.filter(p => !p.featuredDetails);
  const calendlyUrl = resumeData.calendly || "https://calendly.com/angeloarcillas64";

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Section id="hero" className="border-b border-zinc-900/50">
        <Hero />
      </Section>

      {/* 2. Problem -> Solutions (Tabbed with Animated Transition) */}
      <Section id="problems-solved" className="border-b border-zinc-900/50">
        <ProblemSolutions />
      </Section>

      {/* 3. Services & Solutions (3 Core Offers & Interactive Pricing Estimator) */}
      <Section id="services" className="border-b border-zinc-900/50">
        <Services />
      </Section>

      {/* 3.5. Collaboration Blueprint (How We Build) */}
      <Section id="workflow" className="border-b border-zinc-900/50">
        <Workflow />
      </Section>
      
      {/* 4. Portfolio (Interactive Engineering Proof & Portfolio Hub) */}
      <Section id="portfolio" className="border-b border-zinc-900/50 bg-zinc-900/10">
        <PortfolioHub caseStudies={caseStudies} otherProjects={otherProjects} />
      </Section>

      {/* 5. Final Call-to-Action */}
      <Section id="contact" className="text-center">
        <div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Let's build something durable.
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            Whether you need to secure your SaaS backend against race conditions, integrate complex third-party APIs, or perform a reliability audit, I deliver production-ready, spec-compliant code.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-accent rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_0_20px_rgba(85,255,255,0.2)] hover:shadow-[0_0_30px_rgba(85,255,255,0.4)] hover:-translate-y-1 gap-2"
            >
              <Calendar size={18} /> Schedule a Strategy Call
            </a>
            <a 
              href={`mailto:${resumeData.email}`}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-zinc-300 border border-zinc-700 rounded-full hover:bg-zinc-800 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              Email Directly
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};
