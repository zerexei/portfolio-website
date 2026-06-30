import React from "react";
import { resumeData } from "../../data/resume";
import { Button } from "../common/Button";
import { Github, Linkedin, FileText } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 animate-fade-in">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <div className="space-y-4">
          <div className="text-accent font-mono text-sm tracking-wider uppercase font-semibold">
            {resumeData.name}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Product-Focused Backend Engineer specializing in SaaS Development,
            Real-Time & Event-Driven Systems.
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl text-zinc-400 pt-2">
          {[
            "SaaS Platform Development",
            "Real-time Systems",
            "API & Webhook",
            "Reliability engineering",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-zinc-400 max-w-xl leading-relaxed italic">
          "I translate complex business requirements into scalable production
          systems. I focus on data flow integrity and real-time observability so
          your platform runs reliably 24/7."
        </p>

        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
          {resumeData.skills.backend.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400"
            >
              {skill}
            </span>
          ))}
          <span className="text-zinc-600 text-xs font-mono">& more</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <Button
            variant="primary"
            onClick={() =>
              window.open(
                "https://www.upwork.com/freelancers/~01ed41bc95427c452a?mp_source=share",
                "_blank",
              )
            }
          >
            Hire Me on Upwork
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.open(resumeData.github, "_blank")}
          >
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>
          <div className="flex items-center gap-4 ml-2">
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://docs.google.com/document/d/1ntE36TFH7bNb9cD55czwiqYrgiu4jTjfyip4PqRO4qA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <FileText size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-zinc-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900 group-hover:border-accent/30 transition-colors duration-500">
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
