import React from "react";
import { Section } from "../components/common/Section";
import { articles } from "../data/articles";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import routes from "@/routes";

export const Articles: React.FC = () => {
  return (
    <Section>
      <div className="space-y-12 pt-20">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Articles
          </h1>
          <p className="text-[var(--neutral-foreground)] text-lg">
            Thoughts on backend engineering, system design, and the occasional
            devops deep-dive.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={routes.articleDetail.getPath(article.slug)}
              className="card group flex flex-col md:flex-row md:items-center justify-between w-full p-6 md:p-8 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 text-left"
            >
              <div className="space-y-3 flex-1 text-left">
                <div className="flex items-center gap-4 text-xs font-mono text-[var(--neutral-foreground)] uppercase tracking-widest">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-[var(--neutral-foreground)] leading-relaxed max-w-2xl text-sm">
                  {article.description}
                </p>
              </div>

              <div className="mt-4 md:mt-0 md:pl-8 shrink-0">
                <div className="icon-box group-hover:bg-[var(--primary-tint)] group-hover:text-primary group-hover:border-[var(--primary-border)] transition-all">
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};
