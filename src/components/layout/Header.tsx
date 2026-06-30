import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Menu, X, Github, Mail } from "lucide-react";
import { resumeData } from "../../data/resume";
import routes from "@/routes";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: routes.home.title, path: routes.home.path },
    { name: routes.services.title, path: routes.services.path },
    { name: routes.articles.title, path: routes.articles.path },
    { name: routes.systemDesign.title, path: routes.systemDesign.path },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-zinc-800 py-4"
          : "bg-transparent border-transparent py-6",
      )}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link to={routes.home.path} className="text-lg font-bold tracking-tighter">
          AD<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                location.pathname === link.path
                  ? "text-accent"
                  : "text-zinc-400",
              )}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-4 w-px bg-zinc-800" />
          <div className="flex items-center gap-4">
            {resumeData.upwork && (
              <a
                href={resumeData.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-accent transition-colors"
                aria-label="Upwork"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.561 3.281a3.43 3.43 0 00-3.428 3.428v3.719h-.001c-.968-1.572-2.133-3.606-2.906-5.419H8.56v5.82a2.38 2.38 0 01-2.38 2.38 2.38 2.38 0 01-2.38-2.38V3.282H0v5.82a6.199 6.199 0 006.18 6.18 6.199 6.199 0 006.18-6.18V8.349c.563 1.25 1.488 2.979 2.32 4.195l-1.63 7.625h3.832l1.01-4.718c.203.111.417.211.64.298a6.166 6.166 0 002.329.458 6.199 6.199 0 006.18-6.18v-3.32a3.43 3.43 0 00-3.428-3.429zm-.001 8.761a2.38 2.38 0 01-2.38-2.38V6.708a2.38 2.38 0 014.76 0v2.954a2.38 2.38 0 01-2.38 2.38z"/>
                </svg>
              </a>
            )}
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-accent transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="text-zinc-400 hover:text-accent transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-6 animate-fade-in">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-lg font-medium",
                  location.pathname === link.path
                    ? "text-white"
                    : "text-zinc-400",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
              {resumeData.upwork && (
                <a
                  href={resumeData.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-accent transition-colors"
                  aria-label="Upwork"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.561 3.281a3.43 3.43 0 00-3.428 3.428v3.719h-.001c-.968-1.572-2.133-3.606-2.906-5.419H8.56v5.82a2.38 2.38 0 01-2.38 2.38 2.38 2.38 0 01-2.38-2.38V3.282H0v5.82a6.199 6.199 0 006.18 6.18 6.199 6.199 0 006.18-6.18V8.349c.563 1.25 1.488 2.979 2.32 4.195l-1.63 7.625h3.832l1.01-4.718c.203.111.417.211.64.298a6.166 6.166 0 002.329.458 6.199 6.199 0 006.18-6.18v-3.32a3.43 3.43 0 00-3.428-3.429zm-.001 8.761a2.38 2.38 0 01-2.38-2.38V6.708a2.38 2.38 0 014.76 0v2.954a2.38 2.38 0 01-2.38 2.38z"/>
                  </svg>
                </a>
              )}
              <a
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400"
              >
                <Github size={20} />
              </a>
              <a href={`mailto:${resumeData.email}`} className="text-zinc-400">
                <Mail size={20} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
