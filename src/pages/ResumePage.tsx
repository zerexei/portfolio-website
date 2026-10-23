import React from "react";
import { Section } from "../components/common/Section";
import { About } from "../components/layout/About";
import { TechStack } from "../components/layout/TechStack";
import { resumeData } from "../data/resume";
import { Download, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { Button } from "../components/common/Button";

export const ResumePage: React.FC = () => {
  const resumePdfUrl =
    "https://docs.google.com/document/d/1ntE36TFH7bNb9cD55czwiqYrgiu4jTjfyip4PqRO4qA";

  return (
    <div className="flex flex-col">
      {/* Header Banner for Recruiters */}
      <Section className="border-b border-border">
        <div className="space-y-6 max-w-3xl animate-fade-in pt-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-primary font-mono text-xs uppercase tracking-widest font-semibold mb-1">
                Engineering Resume
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {resumeData.name}
              </h1>
            </div>

            <Button
              variant="primary"
              onClick={() => window.open(resumePdfUrl, "_blank")}
              className="shrink-0"
            >
              <Download size={16} className="mr-2" /> Download PDF Resume
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--neutral-foreground)] font-mono py-3 border-y border-border">
            <span className="flex items-center gap-1"><MapPin size={14} /> {resumeData.location}</span>
            <a
              href={`mailto:${resumeData.email}`}
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Mail size={14} /> {resumeData.email}
            </a>
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Github size={14} /> GitHub
            </a>
          </div>

          <p className="text-[var(--neutral-foreground)] text-base leading-relaxed">
            {resumeData.summary}
          </p>
        </div>
      </Section>

      {/* Experience Timeline */}
      <Section id="experience" className="bg-card/40">
        <About />
      </Section>

      {/* Complete Skill Arsenal */}
      <Section id="skills" className="">
        <TechStack />
      </Section>
    </div>
  );
};
