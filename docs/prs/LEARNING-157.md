# feat(theme): Dashboard / observability + live metrics (LEARNING-157)

Jira: LEARNING-157 · Spec: [docs/specs/LEARNING-157-dashboard.md](../specs/LEARNING-157-dashboard.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/dashboard.md` (density 8; streaming line chart with text values and line styles verified).
- Live lab traffic across visitors: `/api/ping` records each 200/429 after the response (`after()`), `GET /api/stats` returns the last 60 s (CDN `s-maxage=2`).
- GitHub activity: `GET /api/github` (dynamic, in-memory cache of the last success for 1 h, stale on failure, optional `GITHUB_TOKEN`).
- Derived panels from `content/`: career uptime (5+ years since Jan 2021), stack usage (case-study tags), timeline (experience).
- Every panel shows its source; the chart has a labelled `img` + hidden data table and uses solid vs dashed lines; failures show an announced "Unavailable" line.

## Data changes
New ephemeral Redis keys `stats:<unix-second>:<200|429>` (TTL 120 s), written by `/api/ping`. No setup/migration script; nothing persists. Architect: nothing to apply to prod beyond deploying.

## Env (optional)
`GITHUB_TOKEN` (no scopes) for Preview/Production to avoid the 60 requests/hour unauthenticated limit.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 sources, no invented numbers | `e2e/dashboard.spec.ts`, `lib/dashboard.test.ts` | pass |
| AC3 chart text alternative, not color alone | e2e | pass |
| AC4 graceful degradation | e2e (503 mocks) | pass |
| AC5 contrast, axe, 375px | registry tests, e2e | pass |
| stats store | `lib/rate-limit/stats.test.ts` | pass |

## Review
APPROVE, no Blockers. Fixed all Should items (first load in background tabs, stats off the hot path, CDN-shared stats reads, GitHub failures never cached — build shows the routes as dynamic, legend glyphs hidden from screen readers) and nits (announced status, "NestJS: 2" separator, `per_page=5`, keys, parse comment).
