import { contents } from "@/content";
import { homeHref, homePath, locales, type Locale } from "@/lib/i18n";
import { features } from "@/lib/features";

export interface IdeFile {
  path: string; // shown in the explorer, e.g. "work/ai-image-pipeline.md"
  href: string; // the real page or section it opens (deep-linkable)
}

/** Site sections presented as files; every href is an existing page or anchor. */
const sections = [
  { path: "about.ts", href: "#top" },
  { path: "skills.json", href: "#skills" },
  { path: "resume.json", href: "#experience" },
  ...(features.caseStudies ? [{ path: "work/README.md", href: "#work" }] : []),
  ...contents.en.publicStudies.map((c) => ({ path: `work/${c.slug}.md`, href: `/work/${c.slug}` })),
  ...(features.lab ? [{ path: "lab/rate-limiter.ts", href: "#lab" }] : []),
  { path: "kits/README.md", href: "#kits" },
  { path: "services.md", href: "#work-with-me" },
  { path: "contact.md", href: "#contact" },
];

/** The files for a locale: section links point at that locale's home page. */
// Built once per locale: components compare files by identity.
const byLocale = Object.fromEntries(
  locales.map((l) => [
    l,
    sections.map((f) => (f.href.startsWith("#") ? { ...f, href: homeHref(l, f.href) } : f)),
  ]),
) as Record<Locale, IdeFile[]>;
export const filesFor = (locale: Locale): IdeFile[] => byLocale[locale];

/** Which file the current location shows; undefined when no file matches (no fake "current"). */
export function fileFor(
  files: IdeFile[],
  pathname: string,
  hash: string,
  home = "/",
): IdeFile | undefined {
  return (
    files.find((f) => f.href === pathname) ??
    files.find((f) => f.href === `${pathname}${hash}`) ??
    (pathname === home && !hash ? files[0] : undefined)
  );
}

export { homePath };

export const basename = (path: string) => path.split("/").pop()!;
