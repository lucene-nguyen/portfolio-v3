import { work } from "@/content/home";

/** Loud flat sticker fills; all text on them is black (tested ≥ 4.5:1). */
export const STICKER_FILLS = [
  "#FFD60A",
  "#FF90E8",
  "#7CF29C",
  "#5EC8FF",
  "#FFA94D",
  "#C4B5FD",
] as const;

/** Every technology tag used by a case study, in first-seen order. */
export const skills = [...new Set(work.items.flatMap((w) => w.tags))];

export const projectsWith = (skill: string) => work.items.filter((w) => w.tags.includes(skill));
