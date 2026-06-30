import React from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";
import { Section } from "../components/common/Section";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import routes from "@/routes";

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <Section className="py-40 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Article not found
        </h1>
        <Link
          to={routes.articles.path}
          className="text-accent hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={20} /> Back to articles
        </Link>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-3xl mx-auto space-y-12">
        <Link
          to={routes.articles.path}
          className="text-zinc-500 hover:text-accent transition-colors flex items-center gap-2 text-sm font-medium mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back to articles
        </Link>

        <header className="space-y-6">
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5 text-accent/80">
              <Calendar size={12} /> {article.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {article.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed italic border-l-2 border-accent/30 pl-6">
            {article.description}
          </p>
        </header>

        <article className="prose prose-invert prose-zinc max-w-none pt-12 border-t border-zinc-900">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mt-12 mb-6">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mt-10 mb-4 tracking-tight border-b border-zinc-900 pb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-white mt-8 mb-4 tracking-tight">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-zinc-400">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-zinc-400">{children}</li>
              ),
              code: ({ children }) => (
                <code className="bg-zinc-900 text-accent/90 px-1.5 py-0.5 rounded font-mono text-sm border border-zinc-800">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl overflow-x-auto mb-8 my-8 font-mono text-sm text-zinc-300 shadow-2xl relative">
                  <div className="absolute top-0 right-0 p-2 text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
                    Code
                  </div>
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-accent/50 pl-6 italic text-zinc-500 my-8 bg-accent/5 py-4 rounded-r-lg">
                  {children}
                </blockquote>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>
      </div>
    </Section>
  );
};
