// @vitest-environment node
import { describe, expect, it } from "vitest";
import { memoryLimiter } from "./store";

describe("memoryLimiter", () => {
  it("keeps keys and algorithms independent", async () => {
    let now = 0;
    const l = memoryLimiter(() => now);
    for (let i = 0; i < 5; i++) await l.hit("token", "a");
    expect((await l.hit("token", "a")).allowed).toBe(false);
    expect((await l.hit("token", "b")).allowed).toBe(true);
    expect((await l.hit("window", "a")).allowed).toBe(true);
    now = 1000;
    expect((await l.hit("token", "a")).allowed).toBe(true);
  });

  it("reset clears only the given key", async () => {
    const l = memoryLimiter(() => 0);
    for (let i = 0; i < 6; i++) await l.hit("window", "a");
    await l.reset("window", "a");
    expect(await l.hit("window", "a")).toMatchObject({ allowed: true, remaining: 4 });
  });
});
