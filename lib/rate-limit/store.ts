import { Redis } from "@upstash/redis";
import {
  fixedWindow,
  LIMITS,
  tokenBucket,
  type Algo,
  type BucketState,
  type Decision,
  type WindowState,
} from "./algorithms";

export interface Limiter {
  readonly kind: "redis" | "memory";
  hit(algo: Algo, key: string): Promise<Decision>;
  reset(algo: Algo, key: string): Promise<void>;
}

// Same rules as tokenBucket(); tokens stored as strings so fractions survive Lua -> Redis conversion.
export const TOKEN_BUCKET_LUA = `
local cap = tonumber(ARGV[1])
local rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local s = redis.call('HMGET', KEYS[1], 't', 'ts')
local tokens = tonumber(s[1])
local ts = tonumber(s[2])
if tokens == nil then tokens = cap; ts = now end
tokens = math.min(cap, tokens + math.max(0, now - ts) * rate)
local allowed = 0
if tokens >= 1 then tokens = tokens - 1; allowed = 1 end
redis.call('HSET', KEYS[1], 't', tostring(tokens), 'ts', tostring(now))
redis.call('PEXPIRE', KEYS[1], math.ceil(cap / rate))
return {allowed, tostring(tokens)}
`;

// Same rules as fixedWindow(): the first hit opens the window.
export const FIXED_WINDOW_LUA = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end
return {count, redis.call('PTTL', KEYS[1])}
`;

export function redisLimiter(redis: Redis, now = () => Date.now()): Limiter {
  const { capacity, refillPerMs, windowMs } = LIMITS;
  // EVALSHA with EVAL fallback: still one atomic script call per decision.
  const bucket = redis.createScript<[number, string]>(TOKEN_BUCKET_LUA);
  const window = redis.createScript<[number, number]>(FIXED_WINDOW_LUA);
  return {
    kind: "redis",
    async hit(algo, key) {
      if (algo === "token") {
        const [allowed, raw] = await bucket.exec(
          [key],
          [String(capacity), String(refillPerMs), String(now())],
        );
        const tokens = Number(raw);
        return {
          allowed: allowed === 1,
          limit: capacity,
          remaining: Math.floor(tokens),
          retryAfterMs: allowed === 1 ? 0 : Math.ceil((1 - tokens) / refillPerMs),
          resetMs: Math.ceil((capacity - tokens) / refillPerMs),
        };
      }
      const [count, ttl] = await window.exec([key], [String(windowMs)]);
      const allowed = count <= capacity;
      return {
        allowed,
        limit: capacity,
        remaining: Math.max(0, capacity - count),
        // PTTL is -1/-2 if the key vanished meanwhile; never tell a blocked client to retry at 0.
        retryAfterMs: allowed ? 0 : Math.max(1, ttl),
        resetMs: Math.max(1, ttl),
      };
    },
    async reset(_algo, key) {
      await redis.del(key);
    },
  };
}

// shortcut: per server instance, lost on cold start, and cleared wholesale past 10k keys;
// fine for local dev and previews without Redis, never used in production (see getLimiter).
export function memoryLimiter(now = () => Date.now()): Limiter {
  const buckets = new Map<string, BucketState>();
  const windows = new Map<string, WindowState>();
  return {
    kind: "memory",
    async hit(algo, key) {
      if (buckets.size + windows.size > 10_000) {
        buckets.clear();
        windows.clear();
      }
      if (algo === "token") {
        const [decision, state] = tokenBucket(buckets.get(key), now());
        buckets.set(key, state);
        return decision;
      }
      const [decision, state] = fixedWindow(windows.get(key), now());
      windows.set(key, state);
      return decision;
    },
    async reset(algo, key) {
      (algo === "token" ? buckets : windows).delete(key);
    },
  };
}

let limiter: Limiter | undefined;

/** Redis when Upstash env is configured, otherwise an in-memory fallback. */
export function getLimiter(): Limiter {
  if (limiter) return limiter;
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    limiter = redisLimiter(Redis.fromEnv());
  } else if (process.env.VERCEL_ENV === "production") {
    // Fail loudly (503) instead of silently giving each instance its own limit.
    throw new Error("UPSTASH_REDIS_REST_URL/TOKEN are required in production");
  } else {
    limiter = memoryLimiter();
  }
  return limiter;
}
