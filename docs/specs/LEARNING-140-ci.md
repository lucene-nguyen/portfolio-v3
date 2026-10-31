# CI with GitHub Actions (LEARNING-140)

Status: Approved (self-approved, autonomous mode)

## Goal
Every push and PR is checked automatically so broken code cannot reach `main`.

## Scope
- `.github/workflows/ci.yml`: on push and pull_request run `npm ci`, lint, typecheck, unit tests, build.
- A separate `e2e` job on pull_request only: install Chromium, run Playwright (build + start).
- Documented branch-protection settings for `main` (required check: `ci / checks`, `ci / e2e`).

## Out of scope
Deploy (LEARNING-146). Applying branch protection (needs repo admin; owner action).

## Acceptance criteria
- AC1: Given a push to any branch, when CI runs, then the `checks` job runs lint, typecheck, test and build, and fails if any fails.
- AC2: Given a pull request, when CI runs, then the `e2e` job runs `npm run test:e2e`.
- AC3: Given branch protection on `main` requiring `checks` and `e2e`, when CI fails, then the PR cannot merge. (Owner applies the setting; steps in `docs/ci.md`.)

## Technical notes
- Node version from `.nvmrc` (22). `concurrency` cancels superseded runs.
- No secrets needed: the rate limiter falls back to in-memory when Upstash env is missing.

## Risks
- AC3 cannot be verified by the implementer (no admin access).
