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
    // Case studies and the lab are parked (LEARNING-164): only Explorer can be earned.
    expect(evaluate(loadProgress(), ["a", "b"]).map((a) => [a.id, a.unlocked])).toEqual([
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
