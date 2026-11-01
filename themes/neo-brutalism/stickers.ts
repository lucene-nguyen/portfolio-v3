import { kits, labels, work } from "@/content/home";
import { features } from "@/lib/features";
import { shown } from "@/lib/placeholder";

/** Loud flat sticker fills; all text on them is black (tested ≥ 4.5:1). */
export const STICKER_FILLS = [
  "#FFD60A",
  "#FF90E8",
  "#7CF29C",
  "#5EC8FF",
  "#FFA94D",
  "#C4B5FD",
] as const;

export interface BoardProject {
  key: string;
  title: string;
  tags: string[];
  href?: string;
  linkLabel: string;
}

/** What the board filters: the case studies, or the starter kits while those are parked (LEARNING-164). */
export const projects: BoardProject[] = features.caseStudies
  ? work.items.map((w) => ({
      key: w.slug,
      title: w.title,
      tags: w.tags,
      href: `/work/${w.slug}`,
      linkLabel: labels.readCaseStudy,
    }))
  : kits.items.map((k) => ({
      key: k.name,
      title: k.name,
      tags: shown(k.stack)?.split(" · ") ?? [],
      href: shown(k.href),
      linkLabel: labels.viewRepo,
    }));

/** Every technology tag used by a project, in first-seen order. */
export const skills = [...new Set(projects.flatMap((p) => p.tags))];

export const projectsWith = (skill: string) => projects.filter((p) => p.tags.includes(skill));
