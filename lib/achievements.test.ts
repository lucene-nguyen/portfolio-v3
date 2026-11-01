import { features } from "@/lib/features";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  CHANGE_EVENT,
  evaluate,
  loadProgress,
  recordCaseStudyRead,
  recordRateLimited,
  recordThemeSeen,
} from "./achievements";

describe("achievements", () => {
  beforeEach(() => localStorage.clear());

  it("starts locked", () => {
    // Achievements for parked sections (LEARNING-164) aren't listed.
    expect(evaluate(loadProgress(), ["a", "b"]).map((a) => [a.id, a.unlocked])).toEqual([
      ...(features.caseStudies ? [["reader", false]] : []),
      ...(features.lab ? [["rate-limited", false]] : []),
      ["explorer", false],
    ]);
  });

  it("records progress, emits a change event once per new fact", () => {
    const onChange = vi.fn();
    window.addEventListener(CHANGE_EVENT, onChange);
    recordCaseStudyRead();
    recordCaseStudyRead();
    recordRateLimited();
    recordThemeSeen("a");
    recordThemeSeen("a");
    window.removeEventListener(CHANGE_EVENT, onChange);
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(loadProgress()).toMatchObject({ readCaseStudy: true, hit429: true });
    const unlocked = evaluate(loadProgress(), ["a", "b"]).filter((a) => a.unlocked);
    expect(unlocked.map((a) => a.id)).toEqual([
      ...(features.caseStudies ? ["reader"] : []),
      ...(features.lab ? ["rate-limited"] : []),
    ]);
    const explorer = evaluate(loadProgress(), ["a", "b"]).find((a) => a.id === "explorer");
    expect(explorer).toMatchObject({ unlocked: false, progress: "1/2" });
  });

  it("unlocks explorer once every theme was seen, ignoring removed themes", () => {
    ["a", "b", "gone"].forEach(recordThemeSeen);
    expect(evaluate(loadProgress(), ["a", "b"]).find((a) => a.id === "explorer")).toMatchObject({
      unlocked: true,
      progress: "2/2",
    });
  });

  it("ignores well-formed JSON of the wrong shape", () => {
    localStorage.setItem("achievements:v1", JSON.stringify({ themesSeen: "a", hit429: "yes" }));
    expect(loadProgress()).toEqual({ readCaseStudy: false, hit429: false, themesSeen: [] });
    expect(() => recordThemeSeen("a")).not.toThrow();
  });

  it("survives corrupt storage", () => {
    localStorage.setItem("achievements:v1", "{nope");
    expect(loadProgress()).toEqual({ readCaseStudy: false, hit429: false, themesSeen: [] });
  });
});
