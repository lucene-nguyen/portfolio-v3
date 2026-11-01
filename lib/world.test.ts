import { describe, expect, it } from "vitest";
import { keyToDir, step, WORLD_RADIUS, zoneAt, zones } from "./world";

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
    expect(zoneAt({ x: 7, z: 0.5 })?.id).toBe("lab");
    expect(new Set(zones.map((z) => z.id))).toEqual(new Set(["work", "lab", "kits", "contact"]));
  });
  it("maps arrows and WASD", () => {
    expect(keyToDir("ArrowUp")).toBe("forward");
    expect(keyToDir("d")).toBe("right");
    expect(keyToDir("x")).toBeUndefined();
  });
});
