import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Menu, X, Github, Mail, Sun, Moon } from "lucide-react";
import { resumeData } from "../../data/resume";
import routes from "@/routes";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navLinks = [
    { name: "Solutions", path: "/#services" },
    { name: "Process", path: "/#workflow" },
    { name: "Portfolio", path: "/#case-studies" },
    { name: routes.systemDesign.title, path: routes.systemDesign.path },
    { name: routes.articles.title, path: routes.articles.path },
    { name: routes.resume.title, path: routes.resume.path },
  ];

  const calendlyUrl = resumeData.calendly || "https://calendly.com/angeloarcillas64";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-card/90 backdrop-blur-md border-border py-4"
          : "bg-transparent border-transparent py-6",
      )}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link to={routes.home.path} className="text-lg font-bold tracking-tighter text-foreground">
          AD<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path.startsWith("/#") &&
                location.pathname === "/" &&
                location.hash === link.path.substring(1));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive ? "text-primary" : "text-(--neutral-foreground)",
                )}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-(--neutral-foreground) hover:text-foreground transition-colors rounded-lg hover:bg-neutral cursor-pointer"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary button-sm"
            >
              Book a Call
            </a>
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--neutral-foreground) hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="text-(--neutral-foreground) hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </nav>

        {/* Mobile Toggle & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-(--neutral-foreground) hover:text-foreground transition-colors rounded-lg hover:bg-neutral cursor-pointer"
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="button button-ghost button-icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border p-6">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path.startsWith("/#") &&
                  location.pathname === "/" &&
                  location.hash === link.path.substring(1));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-lg font-medium",
                    isActive ? "text-primary" : "text-(--neutral-foreground)",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              {resumeData.upwork && (
                <a
                  href={resumeData.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--neutral-foreground) hover:text-foreground transition-colors"
                  aria-label="Upwork"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.561 3.281a3.43 3.43 0 00-3.428 3.428v3.719h-.001c-.968-1.572-2.133-3.606-2.906-5.419H8.56v5.82a2.38 2.38 0 01-2.38 2.38 2.38 2.38 0 01-2.38-2.38V3.282H0v5.82a6.199 6.199 0 006.18 6.18 6.199 6.199 0 006.18-6.18V8.349c.563 1.25 1.488 2.979 2.32 4.195l-1.63 7.625h3.832l1.01-4.718c.203.111.417.211.64.298a6.166 6.166 0 002.329.458 6.199 6.199 0 006.18-6.18v-3.32a3.43 3.43 0 00-3.428-3.429zm-.001 8.761a2.38 2.38 0 01-2.38-2.38V6.708a2.38 2.38 0 014.76 0v2.954a2.38 2.38 0 01-2.38 2.38z" />
                  </svg>
                </a>
              )}
              <a
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--neutral-foreground) hover:text-foreground transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${resumeData.email}`}
                className="text-(--neutral-foreground) hover:text-foreground transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
