import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Menu, X, Github, Mail } from "lucide-react";
import { resumeData } from "../../data/resume";
import ROUTES from "@/routes";

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
    { name: ROUTES.home.title, path: ROUTES.home.path },
    { name: ROUTES.articles.title, path: ROUTES.articles.path },
    { name: ROUTES.systemDesign.title, path: ROUTES.systemDesign.path },
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
        <Link to={ROUTES.home.path} className="text-lg font-bold tracking-tighter">
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
