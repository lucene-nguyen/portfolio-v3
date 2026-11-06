// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { redisKey, redisKeyPrefix, rlSalt } from "./env";
import { redisMessages } from "./contact-delivery";
import { redisStats } from "./rate-limit/stats";
import { redisLimiter } from "./rate-limit/store";

afterEach(() => vi.unstubAllEnvs());

describe("RL_SALT", () => {
  it("is required in production", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("RL_SALT", "");
    expect(() => rlSalt()).toThrow(/RL_SALT is required in production/);
    vi.stubEnv("RL_SALT", "s3cret");
    expect(rlSalt()).toBe("s3cret");
  });
  it("falls back to a dev salt in dev, test and preview", () => {
    vi.stubEnv("RL_SALT", "");
    for (const env of ["", "preview", "development"]) {
      vi.stubEnv("VERCEL_ENV", env);
      expect(rlSalt()).toBe("dev-salt");
    }
  });
});

describe("REDIS_KEY_PREFIX", () => {
  it('is required in production and must be "prod"', () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("REDIS_KEY_PREFIX", "");
    expect(() => redisKeyPrefix()).toThrow(/required in production/);
    vi.stubEnv("REDIS_KEY_PREFIX", "preview");
    expect(() => redisKeyPrefix()).toThrow(/must be "prod" in production/);
    vi.stubEnv("REDIS_KEY_PREFIX", "prod");
    expect(redisKey("rl:token:x")).toBe("prod:rl:token:x");
  });
  it('preview defaults to "preview" and can never write "prod" keys', () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("REDIS_KEY_PREFIX", "");
    expect(redisKeyPrefix()).toBe("preview");
    vi.stubEnv("REDIS_KEY_PREFIX", "prod");
    expect(() => redisKeyPrefix()).toThrow(/not allowed in preview/);
  });
  it('defaults to "dev" locally and rejects unknown values', () => {
    vi.stubEnv("VERCEL_ENV", "");
    vi.stubEnv("REDIS_KEY_PREFIX", "");
    expect(redisKey("contact:messages")).toBe("dev:contact:messages");
    vi.stubEnv("REDIS_KEY_PREFIX", "preview");
    expect(redisKeyPrefix()).toBe("preview");
    vi.stubEnv("REDIS_KEY_PREFIX", "staging");
    expect(() => redisKeyPrefix()).toThrow(/must be one of prod, preview, dev/);
  });
  it("prefixes the keys the Redis stores write", async () => {
    vi.stubEnv("REDIS_KEY_PREFIX", "preview");
    const keys: string[] = [];
    const record = (k: string) => (keys.push(k), Promise.resolve(1));
    const fake = {
      lpush: record,
      ltrim: record,
      lrange: async (k: string) => (keys.push(k), []),
      mget: async (...k: string[]) => (keys.push(...k), k.map(() => null)),
      pipeline: () => ({
        incr: (k: string) => keys.push(k),
        expire: () => {},
        exec: async () => [],
      }),
    } as never;
    await redisMessages(fake).save({
      id: "1",
      at: "",
      name: "a",
      email: "a@b.c",
      type: "consulting",
      message: "m",
    });
    await redisMessages(fake).list();
    await redisStats(fake).record(200, 1_000);
    await redisStats(fake).last(1_000);
    // Rate limiter: Lua script keys and reset.
    const limiter = redisLimiter({
      createScript: () => ({ exec: async (k: string[]) => (keys.push(...k), [1, "4"]) }),
      del: record,
    } as never);
    await limiter.hit("token", "rl:token:abc");
    await limiter.hit("window", "rl:window:abc");
    await limiter.reset("token", "rl:token:abc");
    expect(keys).toContain("preview:rl:token:abc");
    expect(keys).toContain("preview:rl:window:abc");
    expect(keys.length).toBeGreaterThan(4);
    expect(keys.every((k) => k.startsWith("preview:"))).toBe(true);
  });
});
