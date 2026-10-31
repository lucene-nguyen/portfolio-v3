// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

// Always the in-memory limiter here, even when a dev Redis is configured for the integration test.
vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");

import * as store from "@/lib/rate-limit/store";
import { DELETE, GET } from "./route";

afterEach(() => vi.restoreAllMocks());

let n = 0;
const ip = () => `203.0.113.${++n}`;
const req = (ip: string, algo = "token", method = "GET") =>
  new Request(`http://localhost/api/ping?algo=${algo}`, {
    method,
    headers: { "x-forwarded-for": `${ip}, 10.0.0.1` },
  });

describe("/api/ping", () => {
  it.each(["token", "window"])("%s: 200 within limit, then 429 with headers", async (algo) => {
    const who = ip();
    const statuses = [];
    let last: Response | undefined;
    for (let i = 0; i < 6; i++) {
      last = await GET(req(who, algo));
      statuses.push(last.status);
    }
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
    expect(last!.headers.get("X-RateLimit-Remaining")).toBe("0");
    expect(Number(last!.headers.get("Retry-After"))).toBeGreaterThanOrEqual(1);
    expect(last!.headers.get("Cache-Control")).toBe("no-store");
    expect(await last!.json()).toMatchObject({ ok: false, error: "Too Many Requests" });
  });

  it("returns remaining on success", async () => {
    const res = await GET(req(ip()));
    expect(res.headers.get("X-RateLimit-Remaining")).toBe("4");
    expect(res.headers.get("X-RateLimit-Limit")).toBe("5");
    expect(res.headers.get("Retry-After")).toBeNull();
    expect(res.headers.get("X-RateLimit-Store")).toBe("memory");
    expect(await res.json()).toEqual({ ok: true, algo: "token", remaining: 4, limit: 5 });
  });

  it("limits per visitor IP", async () => {
    const a = ip();
    for (let i = 0; i < 5; i++) await GET(req(a));
    expect((await GET(req(a))).status).toBe(429);
    expect((await GET(req(ip()))).status).toBe(200);
  });

  it("defaults to token bucket and rejects unknown algorithms", async () => {
    const res = await GET(new Request("http://localhost/api/ping"));
    expect((await res.json()).algo).toBe("token");
    expect((await GET(req(ip(), "leaky"))).status).toBe(400);
  });

  it("returns 503 with Retry-After when the store fails", async () => {
    const failing: store.Limiter = {
      kind: "redis",
      hit: () => Promise.reject(new Error("down")),
      reset: () => Promise.reject(new Error("down")),
    };
    vi.spyOn(store, "getLimiter").mockReturnValue(failing);
    vi.spyOn(console, "error").mockImplementation(() => {});
    for (const res of [await GET(req(ip())), await DELETE(req(ip(), "token", "DELETE"))]) {
      expect(res.status).toBe(503);
      expect(res.headers.get("Retry-After")).toBe("5");
    }
  });

  it("DELETE resets only the caller's limiter", async () => {
    const a = ip();
    for (let i = 0; i < 6; i++) await GET(req(a, "window"));
    expect((await DELETE(req(a, "window", "DELETE"))).status).toBe(204);
    expect((await GET(req(a, "window"))).status).toBe(200);
  });
});
