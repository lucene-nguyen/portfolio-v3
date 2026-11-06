# Pre-deploy hardening: production guards

Branch: `fix/prod-guards` → `develop`

## What changed
- `lib/env.ts` holds the production guards (active when `VERCEL_ENV=production`):
  - **`RL_SALT`** is required in production and throws a clear error instead of using `"dev-salt"`. Dev, test and preview keep the fallback (owner decision). `visitorId()` is the only consumer.
  - **`REDIS_KEY_PREFIX`** (`prod` | `preview` | `dev`) is required in production, where it must be `prod`. Preview defaults to `preview` and refuses `prod`, so a preview can never write Production's keys. Locally it defaults to `dev`.
- Every Redis key is prefixed inside the three Redis stores, with no caller changes:
  - the rate limiter (the Lua script keys and `reset`);
  - stats (`incr`, `mget`);
  - contact messages (`lpush`, `ltrim`, `lrange`).
- The errors surface as before: the ping and stats APIs answer 503, and the contact form shows an alert with the direct email. No secrets are logged.
- Docs:
  - `.env.example` and `docs/ci.md` ("Production guards") describe both variables.
  - New `docs/deploy.md` lists the Vercel env vars per environment (Production / Preview), confirms that every `NEXT_PUBLIC_FEATURE_*` flag stays unset, and adds notes on rotating secrets and post-deploy checks.

## Tests
- `lib/env.test.ts`:
  - the salt is required in production and falls back elsewhere;
  - the prefix is required in production and must be `prod` there;
  - preview defaults to `preview` and refuses `prod`;
  - unknown prefix values are rejected;
  - the keys written by the limiter (Lua + reset), stats and contact messages all carry the prefix.
- Full suite: 286 unit tests and 65 E2E pass (17 skipped). Lint and typecheck are clean.

## Review
APPROVE with Shoulds, all applied:
- Preview can no longer write `dev:` or `prod:` keys into the shared database.
- `deploy.md` now states that Preview canonicals fall back to the production domain.
- The prefix test covers the limiter.

**Nits applied:** import order, notes on rotating secrets, and the trailing newline.
**Not changed (owner decision):** Preview may still run without `RL_SALT`, using the public dev salt. `deploy.md` recommends setting it there too.
