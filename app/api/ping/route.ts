import { createHash } from "node:crypto";
import type { Algo, Decision } from "@/lib/rate-limit/algorithms";
import { getLimiter } from "@/lib/rate-limit/store";

const ALGOS: readonly Algo[] = ["token", "window"];

function parseAlgo(req: Request): Algo | null {
  const algo = new URL(req.url).searchParams.get("algo") ?? "token";
  return (ALGOS as readonly string[]).includes(algo) ? (algo as Algo) : null;
}

// Per-visitor key; the IP is hashed so raw addresses are never stored.
function visitorKey(req: Request, algo: Algo): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";
  const id = createHash("sha256").update(ip).digest("hex").slice(0, 16);
  return `rl:${algo}:${id}`;
}

function respond(algo: Algo, d: Decision, kind: string) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "X-RateLimit-Limit": String(d.limit),
    "X-RateLimit-Remaining": String(d.remaining),
    "X-RateLimit-Store": kind,
  });
  if (!d.allowed) headers.set("Retry-After", String(Math.ceil(d.retryAfterMs / 1000)));
  const body = d.allowed
    ? { ok: true, algo, remaining: d.remaining, limit: d.limit }
    : { ok: false, algo, error: "Too Many Requests", retryAfterMs: d.retryAfterMs, limit: d.limit };
  return Response.json(body, { status: d.allowed ? 200 : 429, headers });
}

const badAlgo = () =>
  Response.json(
    { ok: false, error: 'algo must be "token" or "window"' },
    { status: 400, headers: { "Cache-Control": "no-store" } },
  );

export async function GET(req: Request) {
  const algo = parseAlgo(req);
  if (!algo) return badAlgo();
  const limiter = getLimiter();
  try {
    return respond(algo, await limiter.hit(algo, visitorKey(req, algo)), limiter.kind);
  } catch (e) {
    console.error("rate limiter unavailable", e);
    return Response.json(
      { ok: false, error: "Rate limiter unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "5" } },
    );
  }
}

/** Resets only the caller's own bucket/window (used by the lab's Reset button). */
export async function DELETE(req: Request) {
  const algo = parseAlgo(req);
  if (!algo) return badAlgo();
  await getLimiter().reset(algo, visitorKey(req, algo));
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
