import React from "react";
import { useParams, Link } from "react-router-dom";
import { Section } from "../components/common/Section";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import routes from "@/routes";
import { getArticleBySlug } from "@/content";
import { mdxComponents } from "../components/mdx/MdxComponents";

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const articleModule = getArticleBySlug(slug);

  if (!articleModule) {
    return (
      <Section className="py-40 text-center">
        <h1 className="text-3xl font-bold mb-6">Article not found</h1>
        <Link
          to={routes.articles.path}
          className="text-primary hover:text-foreground transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={20} /> Back to articles
        </Link>
      </Section>
    );
  }

  const { frontmatter, default: ArticleContent } = articleModule;

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
              <Calendar size={12} /> {frontmatter.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {frontmatter.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight">
            {frontmatter.title}
          </h1>
          <p className="text-lg text-[var(--neutral-foreground)] leading-relaxed italic border-l-2 border-primary/30 pl-6">
            {frontmatter.description}
          </p>
        </header>

        <article className="max-w-none pt-12 border-t border-border space-y-6">
          <ArticleContent components={mdxComponents} />
        </article>
      </div>
    </Section>
  );
};
