// Exploration progress, kept only in this browser. Recorded in every theme; shown by the Pixel theme.
import { features } from "@/lib/features";

export interface Progress {
  readCaseStudy: boolean;
  hit429: boolean;
  themesSeen: string[];
}

const KEY = "achievements:v1";
export const CHANGE_EVENT = "achievements:change";
const EMPTY: Progress = { readCaseStudy: false, hit429: false, themesSeen: [] };

export function loadProgress(): Progress {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return {
      readCaseStudy: p?.readCaseStudy === true,
      hit429: p?.hit429 === true,
      themesSeen: Array.isArray(p?.themesSeen)
        ? p.themesSeen.filter((x: unknown) => typeof x === "string")
        : [],
    };
  } catch {
    return EMPTY;
  }
}

function save(next: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function recordCaseStudyRead() {
  const p = loadProgress();
  if (!p.readCaseStudy) save({ ...p, readCaseStudy: true });
}

export function recordRateLimited() {
  const p = loadProgress();
  if (!p.hit429) save({ ...p, hit429: true });
}

export function recordThemeSeen(id: string) {
  const p = loadProgress();
  if (!p.themesSeen.includes(id)) save({ ...p, themesSeen: [...p.themesSeen, id] });
}

export interface Achievement {
  id: "reader" | "rate-limited" | "explorer";
  unlocked: boolean;
  progress?: string;
}

export function evaluate(p: Progress, themeIds: readonly string[]): Achievement[] {
  const seen = themeIds.filter((id) => p.themesSeen.includes(id)).length;
  // Achievements for parked sections (LEARNING-164) can't be earned, so they aren't listed.
  return [
    ...(features.caseStudies ? [{ id: "reader" as const, unlocked: p.readCaseStudy }] : []),
    ...(features.lab ? [{ id: "rate-limited" as const, unlocked: p.hit429 }] : []),
    { id: "explorer", unlocked: seen === themeIds.length, progress: `${seen}/${themeIds.length}` },
  ];
}
