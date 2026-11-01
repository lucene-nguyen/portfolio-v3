import { createHmac } from "node:crypto";
import { after } from "next/server";
import type { Algo, Decision } from "@/lib/rate-limit/algorithms";
import { getStats } from "@/lib/rate-limit/stats";
import { getLimiter } from "@/lib/rate-limit/store";

const ALGOS: readonly Algo[] = ["token", "window"];

function parseAlgo(req: Request): Algo | null {
  const algo = new URL(req.url).searchParams.get("algo") ?? "token";
  return (ALGOS as readonly string[]).includes(algo) ? (algo as Algo) : null;
}

// Per-visitor key; the IP is HMAC-ed with a secret salt so raw addresses are never stored or recoverable.
// Relies on the host (Vercel) overwriting x-forwarded-for; elsewhere the header can be spoofed.
function visitorKey(req: Request, algo: Algo): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";
  const id = createHmac("sha256", process.env.RL_SALT || "dev-salt")
    .update(ip)
    .digest("hex")
    .slice(0, 16);
  return `rl:${algo}:${id}`;
}

function respond(algo: Algo, d: Decision, kind: string) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "X-RateLimit-Limit": String(d.limit),
    "X-RateLimit-Remaining": String(d.remaining),
    "X-RateLimit-Reset-Ms": String(d.resetMs),
    "X-RateLimit-Store": kind,
  });
  if (!d.allowed) headers.set("Retry-After", String(Math.ceil(d.retryAfterMs / 1000)));
  const body = d.allowed
    ? { ok: true, algo, remaining: d.remaining, limit: d.limit, resetMs: d.resetMs }
    : {
        ok: false,
        algo,
        error: "Too Many Requests",
        retryAfterMs: d.retryAfterMs,
        limit: d.limit,
        resetMs: d.resetMs,
      };
  return Response.json(body, { status: d.allowed ? 200 : 429, headers });
}

const unavailable = (e: unknown) => {
  console.error("rate limiter unavailable", e);
  return Response.json(
    { ok: false, error: "Rate limiter unavailable" },
    { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "5" } },
  );
};

const badAlgo = () =>
  Response.json(
    { ok: false, error: 'algo must be "token" or "window"' },
    { status: 400, headers: { "Cache-Control": "no-store" } },
  );

export async function GET(req: Request) {
  const algo = parseAlgo(req);
  if (!algo) return badAlgo();
  try {
    const limiter = getLimiter();
    const decision = await limiter.hit(algo, visitorKey(req, algo));
    // Aggregate counters for the dashboard theme: after the response, never failing the request.
    after(() =>
      getStats()
        .record(decision.allowed ? 200 : 429)
        .catch((e) => console.error("stats record failed", e)),
    );
    return respond(algo, decision, limiter.kind);
  } catch (e) {
    return unavailable(e);
  }
}

/** Resets only the caller's own bucket/window (used by the lab's Reset button). */
export async function DELETE(req: Request) {
  const algo = parseAlgo(req);
  if (!algo) return badAlgo();
  try {
    await getLimiter().reset(algo, visitorKey(req, algo));
  } catch (e) {
    return unavailable(e);
  }
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
