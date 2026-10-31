import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { ArchitectureDiagram } from "@/components/work/architecture-diagram";

// Case study typography. Colors only via theme tokens.
const slugify = (children: ReactNode) =>
  String(children)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const components: MDXComponents = {
  // Ids make sections linkable (Editorial's table of contents).
  h2: (props) => (
    <h2
      id={slugify(props.children)}
      className="mt-14 mb-4 font-heading text-[28px] font-bold tracking-[-0.01em] sm:text-[32px]"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-8 mb-3 text-xl font-semibold" {...props} />,
  p: (props) => <p className="my-4 text-[17px] leading-[1.7] text-text-secondary" {...props} />,
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
