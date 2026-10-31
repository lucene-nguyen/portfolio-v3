// @vitest-environment node
import { Redis } from "@upstash/redis";
import { describe, expect, it } from "vitest";
import { redisLimiter } from "./store";

// Runs only against a dev Redis: set UPSTASH_REDIS_REST_URL/TOKEN (see docker-compose.yml for a local one).
const enabled = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

describe.skipIf(!enabled)("redisLimiter (Lua) against a dev Redis", () => {
  const key = (algo: string) => `rl:test:${algo}:${Date.now()}:${Math.random()}`;

  it("token bucket: 5 then 429, refills 1/s", async () => {
    let now = 1_000_000;
    const l = redisLimiter(Redis.fromEnv(), () => now);
    const k = key("token");
    const ds = [];
    for (let i = 0; i < 6; i++) ds.push(await l.hit("token", k));
    expect(ds.map((d) => d.allowed)).toEqual([true, true, true, true, true, false]);
    expect(ds[5].retryAfterMs).toBe(1000);
    now += 1000;
    expect((await l.hit("token", k)).allowed).toBe(true);
    await l.reset("token", k);
  });

  it("fixed window: 5 then 429 with a TTL-based retry", async () => {
    const l = redisLimiter(Redis.fromEnv());
    const k = key("window");
    const ds = [];
    for (let i = 0; i < 6; i++) ds.push(await l.hit("window", k));
    expect(ds.map((d) => d.allowed)).toEqual([true, true, true, true, true, false]);
    expect(ds[5].retryAfterMs).toBeGreaterThan(0);
    expect(ds[5].retryAfterMs).toBeLessThanOrEqual(5000);
    await l.reset("window", k);
  });

  it("is atomic under concurrent hits", async () => {
    const l = redisLimiter(Redis.fromEnv());
    const k = key("window");
    const ds = await Promise.all(Array.from({ length: 20 }, () => l.hit("window", k)));
    expect(ds.filter((d) => d.allowed)).toHaveLength(5);
    await l.reset("window", k);
  });
});
