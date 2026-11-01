import { expect, it } from "vitest";
import { contrast } from "@/lib/theme/contrast";
import { projectsWith, skills, STICKER_FILLS } from "./stickers";

it("black sticker text reaches 4.5:1 on every saturated fill", () => {
  for (const fill of STICKER_FILLS)
    expect(contrast("#000000", fill), fill).toBeGreaterThanOrEqual(4.5);
});

it("lists each case-study skill once and filters projects by it", () => {
  expect(new Set(skills).size).toBe(skills.length);
  expect(projectsWith("NestJS").map((p) => p.slug)).toEqual([
    "pharmacy-inventory",
    "aws-file-ingestion",
  ]);
  expect(projectsWith("Nope")).toEqual([]);
});
