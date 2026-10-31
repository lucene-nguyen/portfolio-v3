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
    expect(evaluate(loadProgress(), ["a", "b"]).map((a) => a.unlocked)).toEqual([
      false,
      false,
      false,
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
    const [reader, limited, explorer] = evaluate(loadProgress(), ["a", "b"]);
    expect([reader.unlocked, limited.unlocked, explorer.unlocked]).toEqual([true, true, false]);
    expect(explorer.progress).toBe("1/2");
  });

  it("unlocks explorer once every theme was seen, ignoring removed themes", () => {
    ["a", "b", "gone"].forEach(recordThemeSeen);
    expect(evaluate(loadProgress(), ["a", "b"])[2]).toMatchObject({
      unlocked: true,
      progress: "2/2",
    });
  });

  it("survives corrupt storage", () => {
    localStorage.setItem("achievements:v1", "{nope");
    expect(loadProgress()).toEqual({ readCaseStudy: false, hit429: false, themesSeen: [] });
  });
});
