import { Redis } from "@upstash/redis";

/** Aggregate /api/ping outcomes across all visitors, per second, kept for a short window. */
export const WINDOW_S = 60;

export interface SecondBucket {
  t: number; // unix second
  ok: number;
  limited: number;
}

export interface StatsStore {
  record(status: 200 | 429, nowMs?: number): Promise<void>;
  last(nowMs?: number): Promise<SecondBucket[]>;
}

const seconds = (nowMs: number) => {
  const now = Math.floor(nowMs / 1000);
  return Array.from({ length: WINDOW_S }, (_, i) => now - WINDOW_S + 1 + i);
};

// Keys expire on their own (no setup or cleanup scripts): stats:<second>:<200|429>.
export function redisStats(redis: Redis): StatsStore {
  return {
    async record(status, nowMs = Date.now()) {
      const key = `stats:${Math.floor(nowMs / 1000)}:${status}`;
      const p = redis.pipeline();
      p.incr(key);
      p.expire(key, WINDOW_S * 2);
      await p.exec();
    },
    async last(nowMs = Date.now()) {
      const ts = seconds(nowMs);
      const keys = ts.flatMap((t) => [`stats:${t}:200`, `stats:${t}:429`]);
      const values = await redis.mget<(number | null)[]>(...keys);
      return ts.map((t, i) => ({
        t,
        ok: Number(values[2 * i] ?? 0),
        limited: Number(values[2 * i + 1] ?? 0),
      }));
    },
  };
}

// shortcut: per server instance; fine without Redis (dev/previews), production uses Redis.
export function memoryStats(): StatsStore {
  const m = new Map<number, { ok: number; limited: number }>();
  return {
    async record(status, nowMs = Date.now()) {
      const t = Math.floor(nowMs / 1000);
      const b = m.get(t) ?? { ok: 0, limited: 0 };
      if (status === 200) b.ok++;
      else b.limited++;
      m.set(t, b);
      for (const k of m.keys()) if (k < t - WINDOW_S * 2) m.delete(k);
    },
    async last(nowMs = Date.now()) {
      return seconds(nowMs).map((t) => ({ t, ...(m.get(t) ?? { ok: 0, limited: 0 }) }));
    },
  };
}

let stats: StatsStore | undefined;
export function getStats(): StatsStore {
  stats ??=
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
      ? redisStats(Redis.fromEnv())
      : memoryStats();
  return stats;
}
