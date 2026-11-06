# CI

Workflow: `.github/workflows/ci.yml`.

| Job | Runs on | Steps |
|---|---|---|
| `checks` | push to main/develop, every PR | `npm ci`, lint, typecheck, unit tests (incl. Redis Lua integration tests against a Redis service container), build |
| `e2e` | pull requests | Playwright against a production build |

## Verify CI (owner)
GitHub → **Actions** → latest `ci` runs on `develop`. `checks` must be green. `e2e` runs on PRs only, so it shows up on the first PR (e.g. `develop` → `main`).

## Branch protection on `main` (owner action, needs repo admin)
Rule for `main`:
- Require a pull request before merging
- Require status checks to pass: `checks`, `e2e` (they appear in the picker after they have run once, so open the `develop` → `main` PR first)
- Require branches to be up to date before merging
- Do not allow force pushes (and do not allow deletions)

UI: GitHub → Settings → Branches → Add branch ruleset / protection rule for `main` with the settings above.

With the GitHub CLI (`gh auth login` first):
```bash
gh api -X PUT repos/lucene-nguyen/portfolio-v3/branches/main/protection \
  -H "Accept: application/vnd.github+json" \
  -F required_status_checks[strict]=true \
  -f 'required_status_checks[contexts][]=checks' \
  -f 'required_status_checks[contexts][]=e2e' \
  -F enforce_admins=false \
  -F required_pull_request_reviews[required_approving_review_count]=0 \
  -F restrictions=null \
  -F allow_force_pushes=false \
  -F allow_deletions=false

# Verify
gh api repos/lucene-nguyen/portfolio-v3/branches/main/protection \
  --jq '{checks: .required_status_checks.contexts, strict: .required_status_checks.strict, pr: (.required_pull_request_reviews != null), force_push: .allow_force_pushes.enabled}'
# expected: {"checks":["checks","e2e"],"strict":true,"pr":true,"force_push":false}
```

## Production guards (env)
Server code checks two variables when `VERCEL_ENV=production` (see `lib/env.ts`, tests in `lib/env.test.ts`):
- `RL_SALT`: required. Without it the rate limiter and the contact form fail with a clear error instead of hashing IPs with the public `"dev-salt"` default.
- `REDIS_KEY_PREFIX`: required and must be `prod`. On Preview it defaults to `preview` and `prod` is refused. Every Redis key (rate limits, stats, contact submissions) is prefixed with it, so Production (`prod:`) and Preview (`preview:`) can share one Upstash database.

CI and local runs don't set `VERCEL_ENV`, so they keep the defaults (`dev-salt`, prefix `dev`) and need no secrets. Values per Vercel environment are listed in [deploy.md](deploy.md).
