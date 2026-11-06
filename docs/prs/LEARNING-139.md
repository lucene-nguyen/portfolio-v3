# feat(setup): initialize Next.js project with tooling (LEARNING-139)

Jira: LEARNING-139 · Spec: [docs/specs/LEARNING-139-init-nextjs.md](../specs/LEARNING-139-init-nextjs.md)

## Summary
- Next.js 16 (App Router) + TypeScript + Tailwind v4, shadcn/ui config (`components.json`, `cn`), Lucide.
- Inter Tight + JetBrains Mono via `next/font`; "Portfolio v3" tokens as CSS variables mapped to Tailwind colors.
- Scripts: `dev`, `build`, `lint`, `typecheck` (`next typegen && tsc`), `test` (Vitest), `test:e2e` (Playwright), `format`.
- `.env.example` with Upstash variables. `.gitattributes` forces LF.
- Separate chore commit: `/review` diffs against `develop` (feature branches come from `develop`).

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 build | `npm run build` | pass |
| AC2 lint/typecheck | `npm run lint`, `npm run typecheck` | pass |
| AC3 unit | `lib/utils.test.ts` | pass |
| AC4 tokens/fonts | `e2e/smoke.spec.ts` | pass |
| AC5 env example | `.env.example` (inspected) | pass |

## Review
APPROVE, no Blockers. Fixed: E2E uses `next dev` locally / build+start in CI; removed `cacheComponents`/`partialPrefetching`; skill change split into its own commit.
