// Hand-written limiters. The Redis Lua scripts in ./store.ts implement the same rules atomically.

export type Algo = "token" | "window";

export const LIMITS = {
  capacity: 5,
  /** Token bucket: tokens added per millisecond (1 token/s). */
  refillPerMs: 1 / 1000,
  /** Fixed window length. */
  windowMs: 5000,
} as const;

export interface Decision {
  allowed: boolean;
  limit: number;
  remaining: number;
  /** Milliseconds until the next request can succeed; 0 when allowed. */
  retryAfterMs: number;
  /** Milliseconds until capacity is fully restored (bucket full / window over). */
  resetMs: number;
}

export interface BucketState {
  tokens: number;
  ts: number;
}

/** Continuous refill, capped at capacity. A request costs one whole token. */
export function tokenBucket(prev: BucketState | undefined, now: number): [Decision, BucketState] {
  const { capacity, refillPerMs } = LIMITS;
  const elapsed = prev ? Math.max(0, now - prev.ts) : 0;
  let tokens = prev ? Math.min(capacity, prev.tokens + elapsed * refillPerMs) : capacity;
  const allowed = tokens >= 1;
  if (allowed) tokens -= 1;
  const retryAfterMs = allowed ? 0 : Math.ceil((1 - tokens) / refillPerMs);
  return [
    {
      allowed,
      limit: capacity,
      remaining: Math.floor(tokens),
      retryAfterMs,
      resetMs: Math.ceil((capacity - tokens) / refillPerMs),
    },
    { tokens, ts: now },
  ];
}

export interface WindowState {
  count: number;
  resetAt: number;
}

/** The window opens on the first request after the previous one expired (same as INCR + PEXPIRE). */
export function fixedWindow(prev: WindowState | undefined, now: number): [Decision, WindowState] {
  const { capacity, windowMs } = LIMITS;
  const state = prev && now < prev.resetAt ? prev : { count: 0, resetAt: now + windowMs };
  const count = state.count + 1;
  const allowed = count <= capacity;
  return [
    {
      allowed,
      limit: capacity,
      remaining: Math.max(0, capacity - count),
      retryAfterMs: allowed ? 0 : state.resetAt - now,
      resetMs: state.resetAt - now,
    },
    { count, resetAt: state.resetAt },
  ];
}
