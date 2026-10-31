# Rate limiter `/api/ping` (LEARNING-142)

Status: Approved (self-approved, autonomous mode)

## Goal
A live, hand-written rate limiter (token bucket + fixed window) that visitors can hit from the lab.

## Scope
- `lib/rate-limit/algorithms.ts`: pure token bucket (capacity 5, 1 token/s continuous refill) and fixed window (5 per 5s, window opens on first hit).
- `lib/rate-limit/store.ts`: Redis limiter (Upstash, one atomic Lua script per algorithm) and in-memory fallback when Upstash env is missing.
- `GET /api/ping?algo=token|window` (default `token`): 200 / 429; `DELETE /api/ping?algo=` resets the caller's own limiter (lab Reset).
- Per-visitor key from `x-forwarded-for` (first hop) / `x-real-ip`, SHA-256 hashed (raw IPs never stored).
- `docker-compose.yml`: local Redis + Upstash-compatible REST proxy for the integration test.

## Out of scope
Lab UI (LEARNING-143), aggregated stats for the dashboard theme (LEARNING-157).

## Acceptance criteria
- AC1: Given a visitor within the limit, when `GET /api/ping?algo=token|window`, then 200 with `X-RateLimit-Limit` and `X-RateLimit-Remaining`; past the limit, 429 with `Retry-After` (seconds) and `X-RateLimit-Remaining: 0`.
- AC2: Given capacity 5, then 5 immediate requests pass and the 6th fails; token bucket allows one more after exactly 1000 ms (not 999 ms); fixed window allows again exactly 5000 ms after the window opened.
- AC3: Given two different IPs, then their limits are independent.
- AC4: Given Redis, then each decision is one Lua `EVAL` (atomic); 20 concurrent hits on one window allow exactly 5 (integration test, runs when Upstash env is set).
- AC5: Given no Upstash env, then the in-memory limiter is used and `X-RateLimit-Store: memory` is returned.
- AC6: Given `algo=leaky`, then 400. Given a Redis error, then 503 with `Retry-After`.

## Technical notes
- Token bucket tokens are stored as strings in Redis so fractional tokens survive Lua → Redis integer conversion.
- `Retry-After` only on 429 (the header is meaningless on success); success responses carry `X-RateLimit-Remaining`.
- No stored-data setup: keys are ephemeral (`PEXPIRE` = 5 s), so no `scripts/data/` change.

## Risks
- The in-memory fallback is per server instance (documented `shortcut:` comment); production must have Upstash env.
- The Redis path is only verified by the integration test when a dev Redis is available.
