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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Articles
          </h1>
          <p className="text-zinc-400 text-lg">
            Thoughts on backend engineering, system design, and the occasional
            devops deep-dive.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={routes.articleDetail.getPath(article.slug)}
              className="group relative overflow-hidden flex flex-col md:!flex-row md:items-center justify-between w-full p-8 card hover:!bg-zinc-900 hover:!border-accent/15 transition-all duration-300 !border-zinc-800 text-left"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[100px] rounded-full -mr-24 -mt-24 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />

              <div className="space-y-3 flex-1 text-left">
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest group-hover:text-accent/70 transition-colors">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-accent/40" />
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                  {article.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-2xl">
                  {article.description}
                </p>
              </div>

              <div className="mt-6 md:mt-0 md:pl-8">
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-accent group-hover:border-accent/50 transition-all shadow-sm group-hover:shadow-accent/10">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};
