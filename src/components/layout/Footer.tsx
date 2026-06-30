import React from 'react';
import { resumeData } from '../../data/resume';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-800 py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-lg font-bold tracking-tighter mb-4">
              AD<span className="text-accent">.</span>
            </h3>
            <p className="text-zinc-500 text-sm max-w-xs">
              Backend engineer building dependable, spec-compliant SaaS products, event-driven architectures, and API integrations.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex items-center gap-6">
              {resumeData.upwork && (
                <a href={resumeData.upwork} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-accent transition-colors" aria-label="Upwork">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.561 3.281a3.43 3.43 0 00-3.428 3.428v3.719h-.001c-.968-1.572-2.133-3.606-2.906-5.419H8.56v5.82a2.38 2.38 0 01-2.38 2.38 2.38 2.38 0 01-2.38-2.38V3.282H0v5.82a6.199 6.199 0 006.18 6.18 6.199 6.199 0 006.18-6.18V8.349c.563 1.25 1.488 2.979 2.32 4.195l-1.63 7.625h3.832l1.01-4.718c.203.111.417.211.64.298a6.166 6.166 0 002.329.458 6.199 6.199 0 006.18-6.18v-3.32a3.43 3.43 0 00-3.428-3.429zm-.001 8.761a2.38 2.38 0 01-2.38-2.38V6.708a2.38 2.38 0 014.76 0v2.954a2.38 2.38 0 01-2.38 2.38z"/>
                  </svg>
                </a>
              )}
              <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-accent transition-colors">
                <Github size={20} />
              </a>
              <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${resumeData.email}`} className="text-zinc-400 hover:text-accent transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-zinc-600 text-xs font-mono">
              © {new Date().getFullYear()} Angelo Dave Arcillas. Built with React & Tailwind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
