import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-3xl font-bold mt-12 mb-6" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-2xl font-bold mt-10 mb-4 tracking-tight border-b border-border pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-xl font-bold mt-8 mb-4 tracking-tight" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className="text-[var(--neutral-foreground)] text-base leading-relaxed mb-6"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="list-disc list-outside ml-6 mb-6 space-y-2 text-[var(--neutral-foreground)]"
      {...props}
    >
      {children}
    </ul>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className="text-[var(--neutral-foreground)]" {...props}>
      {children}
    </li>
  ),
  code: ({
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    return (
      <code
        className={`text-primary font-mono text-sm ${className || ""}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="bg-card-nested border border-border p-6 rounded-xl overflow-x-auto mb-8 my-8 font-mono text-sm text-foreground relative"
      {...props}
    >
      <div className="absolute top-0 right-0 p-2 text-[10px] text-[var(--neutral-foreground)] uppercase tracking-widest font-mono select-none">
        Code
      </div>
      {children}
    </pre>
  ),
  blockquote: ({
    children,
    ...props
  }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-primary/40 pl-6 italic text-[var(--neutral-foreground)] my-8 bg-[var(--primary-tint)] py-4 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
};
