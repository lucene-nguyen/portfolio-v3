import { expect, it } from "vitest";
import { contrast } from "@/lib/theme/contrast";
import { projects, projectsWith, skills, STICKER_FILLS } from "./stickers";

it("black sticker text reaches 4.5:1 on every saturated fill", () => {
  for (const fill of STICKER_FILLS)
    expect(contrast("#000000", fill), fill).toBeGreaterThanOrEqual(4.5);
});

it("lists each starter-kit skill once and filters the kits by it (case studies parked)", () => {
  expect(new Set(skills).size).toBe(skills.length);
  expect(projectsWith("Redis").map((p) => p.key)).toEqual(["rate-limiting-lab"]);
  expect(projectsWith("Nope")).toEqual([]);
  // Unfinished stacks and links never become stickers or dead links.
  expect(skills.some((s) => s.includes("PLACEHOLDER"))).toBe(false);
  expect(projects.filter((p) => p.href).map((p) => p.key)).toEqual(["rate-limiting-lab"]);
});
