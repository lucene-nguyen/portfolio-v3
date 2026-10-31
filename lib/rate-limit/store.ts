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
  return {
    kind: "redis",
    async hit(algo, key) {
      if (algo === "token") {
        const [allowed, raw] = await redis.eval<[number, number, number], [number, string]>(
          TOKEN_BUCKET_LUA,
          [key],
          [capacity, refillPerMs, now()],
        );
        const tokens = Number(raw);
        return {
          allowed: allowed === 1,
          limit: capacity,
          remaining: Math.floor(tokens),
          retryAfterMs: allowed === 1 ? 0 : Math.ceil((1 - tokens) / refillPerMs),
        };
      }
      const [count, ttl] = await redis.eval<[number], [number, number]>(
        FIXED_WINDOW_LUA,
        [key],
        [windowMs],
      );
      const allowed = count <= capacity;
      return {
        allowed,
        limit: capacity,
        remaining: Math.max(0, capacity - count),
        retryAfterMs: allowed ? 0 : Math.max(0, ttl),
      };
    },
    async reset(_algo, key) {
      await redis.del(key);
    },
  };
}

// shortcut: per server instance and lost on cold start; fine for local dev and previews without Redis.
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
  limiter ??=
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
      ? redisLimiter(Redis.fromEnv())
      : memoryLimiter();
  return limiter;
}
