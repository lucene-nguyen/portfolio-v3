import { expect, it } from "vitest";
import { stackUsage, timeline } from "./dashboard";

it("builds a timeline from role periods", () => {
  const t = timeline([
    { period: "03/2024 – 07/2026", company: "B" },
    { period: "01/2021 – 03/2024", company: "A" },
  ]);
  expect(t.start.toISOString().slice(0, 7)).toBe("2021-01");
  expect(t.end.toISOString().slice(0, 7)).toBe("2026-07");
  expect(t.years).toBeCloseTo(5.5, 1);
  expect(t.spans[1].offset).toBe(0);
  expect(t.spans[0].offset + t.spans[0].width).toBeCloseTo(1, 5);
});

it("counts stack usage across case studies", () => {
  expect(stackUsage([{ tags: ["NestJS", "Redis"] }, { tags: ["NestJS"] }])).toEqual([
    { tag: "NestJS", count: 2 },
    { tag: "Redis", count: 1 },
  ]);
});

it('treats "Present" as the current month', () => {
  const t = timeline([{ period: "03/2024 – Present", company: "FPT" }]);
  const now = new Date();
  expect(t.end.getUTCFullYear()).toBe(now.getUTCFullYear());
  expect(t.end.getUTCMonth()).toBe(now.getUTCMonth());
  expect(Number.isNaN(+t.end)).toBe(false);
});
