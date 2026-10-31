# ci: GitHub Actions for lint, typecheck, tests, build, E2E (LEARNING-140)

Jira: LEARNING-140 · Spec: [docs/specs/LEARNING-140-ci.md](../specs/LEARNING-140-ci.md)

## Summary
- `.github/workflows/ci.yml`: `checks` job (lint, typecheck, unit, build) on push to main/develop and on every PR; `e2e` job (Playwright on a production build) on PRs, with HTML report uploaded on failure.
- `.nvmrc` (Node 22), job timeouts, telemetry off, read-only token.
- `docs/ci.md`: branch protection steps for `main`.

## Owner action
Branch protection on `main` (AC3) needs repo admin: follow `docs/ci.md`. Required checks: `checks`, `e2e`.

## Data changes
None.

## Tests
| AC | Verification | Result |
|---|---|---|
| AC1 checks job | same commands pass locally; YAML lint ok | pass (local) |
| AC2 e2e on PR | `npm run test:e2e` passes locally | pass (local) |
| AC3 branch protection | owner action | not verified |

CI run status on GitHub not checked: the repo is private and no `gh` CLI/token is available to the implementer.

## Review
APPROVE, no Blockers. Fixed: HTML reporter in CI so the failure artifact exists; check names aligned; push trigger limited to main/develop; timeouts; telemetry off.
