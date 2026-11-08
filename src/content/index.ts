import type { ComponentType } from "react";
import type { MDXComponents } from "@/components/mdx/MdxComponents";

export interface ArticleFrontmatter {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
}

export interface SystemDesignFrontmatter {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  chart: string;
  tradeoffs: string[];
}

export interface MDXModule<T> {
  default: ComponentType<{ components?: MDXComponents }>;
  frontmatter: T;
  [key: string]: unknown;
}

// Eagerly loaded for metadata / listing
const articleModules = import.meta.glob<MDXModule<ArticleFrontmatter>>(
  "/src/content/articles/*.mdx",
  { eager: true }
);

export const articles: ArticleFrontmatter[] = Object.values(articleModules).map(
  (mod) => mod.frontmatter
);

export const getArticleBySlug = (slug?: string) => {
  if (!slug) return undefined;
  const entry = Object.values(articleModules).find(
    (mod) => mod.frontmatter.slug === slug
  );
  return entry;
};

// Eagerly loaded for system designs
const systemDesignModules = import.meta.glob<MDXModule<SystemDesignFrontmatter>>(
  "/src/content/system-designs/*.mdx",
  { eager: true }
);

export const systemDesigns: SystemDesignFrontmatter[] = Object.values(
  systemDesignModules
).map((mod) => mod.frontmatter);

export const getSystemDesignBySlug = (slug?: string) => {
  if (!slug) return undefined;
  const entry = Object.values(systemDesignModules).find(
    (mod) => mod.frontmatter.slug === slug
  );
  return entry;
};
