# feat(api): rate limiter `/api/ping` (LEARNING-142)

Jira: LEARNING-142 · Spec: [docs/specs/LEARNING-142-rate-limiter.md](../specs/LEARNING-142-rate-limiter.md)

## Summary
- Hand-written token bucket (5, 1 token/s, continuous) and fixed window (5 per 5 s) in `lib/rate-limit/algorithms.ts`.
- Redis limiter: one atomic Lua script per algorithm via Upstash (`EVALSHA` with `EVAL` fallback). In-memory fallback when Upstash env is missing; production without Upstash fails loudly with 503.
- `GET /api/ping?algo=token|window` → 200/429 with `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After` (on 429), `X-RateLimit-Store`; 400 for bad `algo`; 503 when the store fails. `DELETE` resets the caller's own limiter (for the lab's Reset).
- Visitor key = HMAC-SHA256(IP, `RL_SALT`) — raw IPs never stored.
- CI `checks` job runs Redis + an Upstash-compatible proxy as service containers so the Lua integration tests run without secrets. `docker-compose.yml` does the same locally.

## Env (owner / Architect)
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (dev + prod, separate databases).
- New: `RL_SALT` (any random string) for Preview and Production.

## Data changes
None. Keys are ephemeral (`rl:<algo>:<hmac>`, TTL 5 s); no `scripts/data/` script needed.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 200/429 + headers | `app/api/ping/route.test.ts`, `e2e/api-ping.spec.ts` | pass |
| AC2 capacity and timing boundaries | `lib/rate-limit/algorithms.test.ts` | pass |
| AC3 per-IP | `route.test.ts`, `store.test.ts` | pass |
| AC4 atomic Lua | `lib/rate-limit/redis.integration.test.ts` | skipped locally (no Docker daemon); runs in CI with the Redis services, result not observed by the implementer (private repo) |
| AC5 memory fallback | `route.test.ts` (`X-RateLimit-Store: memory`) | pass |
| AC6 400 / 503 | `route.test.ts` | pass |

## Review
APPROVE, no Blockers. Fixed: Redis services in CI, DELETE 503, 503/header tests, prod refuses memory fallback, salted HMAC for IPs, `createScript`, `Retry-After` ≥ 1 ms, route tests isolated from a dev Redis.
