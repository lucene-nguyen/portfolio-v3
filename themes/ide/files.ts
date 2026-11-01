import { work } from "@/content/home";

export interface IdeFile {
  path: string; // shown in the explorer, e.g. "work/ai-image-pipeline.md"
  href: string; // the real page or section it opens (deep-linkable)
}

/** Site sections presented as files; every href is an existing page or anchor. */
export const files: IdeFile[] = [
  { path: "about.ts", href: "/#top" },
  { path: "work/README.md", href: "/#work" },
  ...work.items.map((c) => ({ path: `work/${c.slug}.md`, href: `/work/${c.slug}` })),
  { path: "lab/rate-limiter.ts", href: "/#lab" },
  { path: "kits/README.md", href: "/#kits" },
  { path: "resume.json", href: "/#experience" },
  { path: "contact.md", href: "/#contact" },
];

/** Which file the current location shows; undefined when no file matches (no fake "current"). */
export function fileFor(pathname: string, hash: string): IdeFile | undefined {
  return (
    files.find((f) => f.href === pathname) ??
    files.find((f) => f.href === `${pathname}${hash}`) ??
    (pathname === "/" && !hash ? files[0] : undefined)
  );
}

export const basename = (path: string) => path.split("/").pop()!;
