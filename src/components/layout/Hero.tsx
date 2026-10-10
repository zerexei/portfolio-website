import React from "react";
import { Link } from "react-router-dom";
import { resumeData } from "../../data/resume";
import { Button } from "../common/Button";
import { Github, Linkedin, Calendar, FileText } from "lucide-react";
import routes from "@/routes";

export const Hero: React.FC = () => {
  const calendlyUrl = resumeData.calendly || "https://calendly.com/angeloarcillas64";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 animate-fade-in pt-20">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <div className="space-y-4">
          <div className="text-primary font-mono text-sm tracking-wider uppercase font-semibold">
            {resumeData.name} • Product Engineer
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Scale Your <span className="text-primary">SaaS Backend</span> Without Server Crashes or Revenue Leaks.
          </h1>
          <p className="text-base text-[var(--neutral-foreground)] max-w-xl leading-relaxed">
            I help SaaS founders and dev teams build fault-tolerant backend architectures, fix revenue-leaking concurrency bugs, and integrate third-party APIs with zero downtime.
          </p>
        </div>

        {/* Proof Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--neutral-foreground)] py-2 border-y border-border justify-center md:justify-start">
          <span className="flex items-center gap-1.5 text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            10K+ Concurrent Connections
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5 text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            50K+ Daily Events
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5 text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Resilient Workflows
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start pt-1">
          <Button
            variant="primary"
            onClick={() => window.open(calendlyUrl, "_blank")}
          >
            <Calendar className="mr-2 h-4 w-4" /> Book a Call
          </Button>
          <a href="#case-studies">
            <Button variant="secondary">
              Explore Case Studies
            </Button>
          </a>
          <Link to={routes.resume.path}>
            <Button variant="secondary">
              <FileText className="mr-2 h-4 w-4" /> Resume
            </Button>
          </Link>
          <div className="flex items-center gap-4 ml-2">
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--neutral-foreground)] hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--neutral-foreground)] hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border bg-card group-hover:border-primary/40 transition-colors duration-500 shadow-md">
          <img
            src="https://github.com/zerexei.png"
            alt={resumeData.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
