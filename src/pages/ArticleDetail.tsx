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
        <h1 className="text-3xl font-bold mb-6">
          Article not found
        </h1>
        <Link
          to={routes.articles.path}
          className="text-primary hover:text-foreground transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={20} /> Back to articles
        </Link>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-3xl mx-auto space-y-12 pt-20">
        <Link
          to={routes.articles.path}
          className="text-[var(--neutral-foreground)] hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back to articles
        </Link>

        <header className="space-y-6">
          <div className="flex items-center gap-4 text-xs font-mono text-[var(--neutral-foreground)] uppercase tracking-widest">
            <span className="flex items-center gap-1.5 text-primary">
              <Calendar size={12} /> {article.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {article.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight">
            {article.title}
          </h1>
          <p className="text-lg text-[var(--neutral-foreground)] leading-relaxed italic border-l-2 border-primary/30 pl-6">
            {article.description}
          </p>
        </header>

        <article className="max-w-none pt-12 border-t border-border space-y-6">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mt-12 mb-6">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-10 mb-4 tracking-tight border-b border-border pb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mt-8 mb-4 tracking-tight">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-[var(--neutral-foreground)] text-base leading-relaxed mb-6">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-[var(--neutral-foreground)]">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-[var(--neutral-foreground)]">{children}</li>
              ),
              code: ({ className, children }) => {
                const isBlock = className?.includes("language-");
                if (isBlock) {
                  return (
                    <code className="text-primary font-mono text-sm block">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="text-primary font-mono text-sm">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-card-nested border border-border p-6 rounded-xl overflow-x-auto mb-8 my-8 font-mono text-sm text-foreground relative">
                  <div className="absolute top-0 right-0 p-2 text-[10px] text-(--neutral-foreground) uppercase tracking-widest font-mono select-none">
                    Code
                  </div>
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary/40 pl-6 italic text-[var(--neutral-foreground)] my-8 bg-[var(--primary-tint)] py-4 rounded-r-lg">
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
