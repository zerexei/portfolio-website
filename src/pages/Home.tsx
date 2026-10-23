import React from 'react';
import { Hero } from '../components/layout/Hero';
import { PortfolioHub } from '../components/projects/PortfolioHub';
import { Services } from '../components/layout/Services';
import { ProblemSolutions } from '../components/services/ProblemSolutions';
import { Workflow } from '../components/layout/Workflow';
import { Section } from '../components/common/Section';
import { projects } from '../data/projects';
import { resumeData } from '../data/resume';
import { Calendar, Mail } from 'lucide-react';

export const Home: React.FC = () => {
  const caseStudies = projects.filter(p => p.featuredDetails);
  const otherProjects = projects.filter(p => !p.featuredDetails);
  const calendlyUrl = resumeData.calendly || "https://calendly.com/angeloarcillas64";

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Section id="hero" className="border-b border-border">
        <Hero />
      </Section>

      {/* 2. Technical Proof & Portfolio */}
      <Section id="case-studies" className="border-b border-border bg-card/40">
        <PortfolioHub caseStudies={caseStudies} otherProjects={otherProjects} />
      </Section>

      {/* 3. Problem -> Solution Architecture (Backend pain points resolved) */}
      <Section id="problems-solved" className="border-b border-border">
        <ProblemSolutions />
      </Section>

      {/* 4. Engineering Solutions & Pricing Estimator */}
      <Section id="services" className="border-b border-border bg-card/40">
        <Services />
      </Section>

      {/* 5. Collaboration Blueprint */}
      <Section id="workflow" className="border-b border-border">
        <Workflow />
      </Section>

      {/* 6. Final CTA */}
      <Section id="contact" className="bg-card text-center pt-16 md:pt-24">
        <div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let's build something durable.
          </h2>
          <p className="text-(--neutral-foreground) text-base md:text-lg leading-relaxed">
            Whether you need to secure your SaaS backend against race conditions, integrate complex third-party APIs, or perform a reliability audit, I deliver production-ready, spec-compliant code.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary button-lg"
            >
              <Calendar size={18} className="mr-1.5" /> Schedule a Strategy Call
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="button button-secondary button-lg"
            >
              <Mail size={18} className="mr-1.5" /> Email Directly
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};
