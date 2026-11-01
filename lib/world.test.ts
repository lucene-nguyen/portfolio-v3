import { describe, expect, it } from "vitest";
import { keyToDir, step, WORLD_RADIUS, ZONE_RADIUS, zoneAt, zones } from "./world";
import { features } from "@/lib/features";

const none = { forward: false, back: false, left: false, right: false };

describe("world", () => {
  it("moves with normalized speed and stays still without input", () => {
    expect(step({ x: 0, z: 0 }, none, 1)).toEqual({ x: 0, z: 0 });
    expect(step({ x: 0, z: 0 }, { ...none, forward: true }, 0.5)).toEqual({ x: 0, z: -3 });
    const diag = step({ x: 0, z: 0 }, { ...none, forward: true, right: true }, 1);
    expect(Math.hypot(diag.x, diag.z)).toBeCloseTo(6, 5);
  });
  it("is bounded by the world circle", () => {
    const p = step({ x: 10.9, z: 0 }, { ...none, right: true }, 1);
    expect(Math.hypot(p.x, p.z)).toBeCloseTo(WORLD_RADIUS, 5);
  });
  it("detects zones", () => {
    expect(zoneAt({ x: 0, z: 0 })).toBeUndefined();
    expect(zoneAt({ x: 0, z: -6.5 })?.id).toBe("experience");
    // Parked sections (LEARNING-164) get no pad.
    expect(zoneAt({ x: 7, z: 0.5 })?.id).toBe(features.lab ? "lab" : undefined);
    expect(zoneAt({ x: 5, z: -5 })?.id).toBe(features.caseStudies ? "work" : undefined);
    expect(new Set(zones.map((z) => z.id))).toEqual(
      new Set([
        "experience",
        ...(features.caseStudies ? ["work"] : []),
        ...(features.lab ? ["lab"] : []),
        "kits",
        "contact",
      ]),
    );
    // Pads never overlap.
    for (const a of zones)
      for (const b of zones)
        if (a !== b) expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeGreaterThan(2 * ZONE_RADIUS);
  });
  it("maps arrows and WASD", () => {
    expect(keyToDir("ArrowUp")).toBe("forward");
    expect(keyToDir("d")).toBe("right");
    expect(keyToDir("x")).toBeUndefined();
  });
});
