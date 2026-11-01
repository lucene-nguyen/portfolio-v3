import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ReactNode } from "react";
import { hasPlaceholder, SHOW_PLACEHOLDERS, stripPlaceholders } from "@/lib/placeholder";
import { slugify } from "@/lib/slug";
import { ArchitectureDiagram } from "@/components/work/architecture-diagram";

// Case study typography. Colors only via theme tokens.
// Only plain-text headings get an id; rich ones would all become "[object Object]".
const headingId = (children: ReactNode) =>
  typeof children === "string" ? slugify(children) : undefined;

const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((c) =>
      typeof c === "string"
        ? c
        : isValidElement<{ children?: ReactNode }>(c)
          ? textOf(c.props.children)
          : "",
    )
    .join("");

// A list item with a placeholder is an unfinished metric/constraint: drop it whole.
const unfinished = (children: ReactNode) => !SHOW_PLACEHOLDERS && hasPlaceholder(textOf(children));

// In paragraphs, placeholders are notes after real sentences: strip them; drop the paragraph if nothing is left.
const stripChildren = (children: ReactNode) =>
  Children.map(children, (c) => (typeof c === "string" ? stripPlaceholders(c) : c));

const components: MDXComponents = {
  // Ids make sections linkable (Editorial's table of contents).
  h2: (props) => (
    <h2
      id={headingId(props.children)}
      className="mt-14 mb-4 font-heading text-[28px] font-bold tracking-[-0.01em] sm:text-[32px]"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-8 mb-3 text-xl font-semibold" {...props} />,
  p: ({ children, ...props }) => {
    const kept = stripChildren(children);
    if (!textOf(kept).trim()) return null;
    return (
      <p className="my-4 text-[17px] leading-[1.7] text-text-secondary" {...props}>
        {kept}
      </p>
    );
  },
  li: (props) => (unfinished(props.children) ? null : <li {...props} />),
  ul: (props) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-text-secondary"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7] text-text-secondary"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-text" {...props} />,
  a: (props) => <a className="text-accent underline underline-offset-2" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-text-2"
      {...props}
    />
  ),
  ArchitectureDiagram,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
