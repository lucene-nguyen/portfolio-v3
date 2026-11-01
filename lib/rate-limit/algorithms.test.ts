// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  fixedWindow,
  tokenBucket,
  type BucketState,
  type Decision,
  type WindowState,
} from "./algorithms";

function hits<S>(fn: (s: S | undefined, now: number) => [Decision, S], times: number[]) {
  let state: S | undefined;
  return times.map((t) => {
    const [d, next] = fn(state, t);
    state = next;
    return d;
  });
}

describe("tokenBucket (capacity 5, 1 token/s)", () => {
  it("allows a burst of 5, denies the 6th with a 1s retry", () => {
    const ds = hits<BucketState>(tokenBucket, [0, 0, 0, 0, 0, 0]);
    expect(ds.map((d) => d.allowed)).toEqual([true, true, true, true, true, false]);
    expect(ds.map((d) => d.remaining)).toEqual([4, 3, 2, 1, 0, 0]);
    expect(ds[5]).toMatchObject({ retryAfterMs: 1000, limit: 5, resetMs: 5000 });
    expect(ds[0].resetMs).toBe(1000);
  });

  it("refills exactly one token after 1000ms, not at 999ms", () => {
    const base = Array(5).fill(0);
    expect(hits<BucketState>(tokenBucket, [...base, 999]).at(-1)!.allowed).toBe(false);
    expect(hits<BucketState>(tokenBucket, [...base, 1000]).at(-1)!.allowed).toBe(true);
  });

  it("reports the remaining wait for a partly refilled token", () => {
    const d = hits<BucketState>(tokenBucket, [0, 0, 0, 0, 0, 400]).at(-1)!;
    expect(d).toMatchObject({ allowed: false, retryAfterMs: 600 });
  });

  it("caps refill at capacity after a long idle", () => {
    const ds = hits<BucketState>(tokenBucket, [0, 60_000, 60_000, 60_000, 60_000, 60_000, 60_000]);
    expect(ds.filter((d) => d.allowed)).toHaveLength(6);
    expect(ds.at(-1)!.allowed).toBe(false);
  });

  it("ignores a clock that goes backwards", () => {
    const d = hits<BucketState>(tokenBucket, [1000, 1000, 1000, 1000, 1000, 500]).at(-1)!;
    expect(d.allowed).toBe(false);
  });
});

describe("fixedWindow (capacity 5, 5s window)", () => {
  it("allows 5 per window and denies the rest until the window ends", () => {
    const ds = hits<WindowState>(fixedWindow, [0, 100, 200, 300, 400, 500, 4999]);
    expect(ds.map((d) => d.allowed)).toEqual([true, true, true, true, true, false, false]);
    expect(ds[5]).toMatchObject({ remaining: 0, retryAfterMs: 4500, resetMs: 4500 });
    expect(ds[0].resetMs).toBe(5000);
    expect(ds[6]).toMatchObject({ retryAfterMs: 1 });
  });

  it("opens a fresh window exactly at reset", () => {
    const d = hits<WindowState>(fixedWindow, [0, 0, 0, 0, 0, 0, 5000]).at(-1)!;
    expect(d).toMatchObject({ allowed: true, remaining: 4 });
  });

  it("starts the window at the first request", () => {
    const ds = hits<WindowState>(fixedWindow, [7000, 7000, 7000, 7000, 7000, 11_999, 12_000]);
    expect(ds.map((d) => d.allowed)).toEqual([true, true, true, true, true, false, true]);
  });
});

it("fixed window takes its own limits (contact form) without changing the lab default", async () => {
  const { fixedWindow, LIMITS } = await import("./algorithms");
  const limits = { capacity: 1, windowMs: 60_000 };
  const [first, state] = fixedWindow(undefined, 0, limits);
  const [second] = fixedWindow(state, 30_000, limits);
  expect([first.allowed, second.allowed, second.retryAfterMs]).toEqual([true, false, 30_000]);
  expect(fixedWindow(undefined, 0)[0].limit).toBe(LIMITS.capacity);
});
