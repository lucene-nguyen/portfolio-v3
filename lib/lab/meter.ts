import { LIMITS, type Algo } from "@/lib/rate-limit/algorithms";

/** What the last /api/ping response said, and when it arrived (client clock). */
export interface Snapshot {
  remaining: number;
  resetMs: number;
  limit: number;
  at: number;
}

/** Remaining capacity at `now`, projected from the last server answer. */
export function project(algo: Algo, s: Snapshot | undefined, now: number): number {
  if (!s) return LIMITS.capacity;
  const elapsed = Math.max(0, now - s.at);
  if (algo === "window") return elapsed >= s.resetMs ? s.limit : s.remaining;
  const tokensAt = s.limit - s.resetMs * LIMITS.refillPerMs;
  return Math.min(s.limit, Math.floor(tokensAt + elapsed * LIMITS.refillPerMs + 1e-9));
}

/** Seconds until the window resets, for the meter label; null when not applicable. */
export function windowResetsIn(s: Snapshot | undefined, now: number): number | null {
  if (!s) return null;
  const left = s.resetMs - (now - s.at);
  return left > 0 ? Math.ceil(left / 1000) : null;
}
