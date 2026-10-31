import { describe, expect, it } from "vitest";
import { project, windowResetsIn } from "./meter";

describe("project", () => {
  it("is full before any request", () => expect(project("token", undefined, 0)).toBe(5));

  it("refills the token bucket one per second, capped", () => {
    // 1 token left -> 4 missing -> full in 4000ms
    const s = { remaining: 1, resetMs: 4000, limit: 5, at: 1000 };
    expect(project("token", s, 1000)).toBe(1);
    expect(project("token", s, 1999)).toBe(1);
    expect(project("token", s, 2000)).toBe(2);
    expect(project("token", s, 60_000)).toBe(5);
  });

  it("keeps the window count until the window ends", () => {
    const s = { remaining: 0, resetMs: 3000, limit: 5, at: 0 };
    expect(project("window", s, 2999)).toBe(0);
    expect(project("window", s, 3000)).toBe(5);
  });
});

describe("windowResetsIn", () => {
  it("counts down in whole seconds and stops at zero", () => {
    const s = { remaining: 0, resetMs: 2500, limit: 5, at: 0 };
    expect(windowResetsIn(s, 0)).toBe(3);
    expect(windowResetsIn(s, 2000)).toBe(1);
    expect(windowResetsIn(s, 2500)).toBeNull();
  });
});
