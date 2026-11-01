// @vitest-environment node
import { expect, it } from "vitest";
import { memoryStats, WINDOW_S } from "./stats";

it("counts 200 and 429 per second over the last window", async () => {
  const s = memoryStats();
  const t0 = 1_000_000_000;
  await s.record(200, t0);
  await s.record(200, t0 + 10);
  await s.record(429, t0 + 999);
  await s.record(200, t0 + 1000);
  const last = await s.last(t0 + 1500);
  expect(last).toHaveLength(WINDOW_S);
  expect(last.at(-2)).toEqual({ t: t0 / 1000, ok: 2, limited: 1 });
  expect(last.at(-1)).toEqual({ t: t0 / 1000 + 1, ok: 1, limited: 0 });
});

it("drops seconds that left the window", async () => {
  const s = memoryStats();
  await s.record(429, 0);
  const last = await s.last(WINDOW_S * 1000 + 5);
  expect(last.every((b) => b.ok === 0 && b.limited === 0)).toBe(true);
});
