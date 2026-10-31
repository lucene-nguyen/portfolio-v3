# Initialize Next.js project with tooling (LEARNING-139)

Status: Approved (self-approved, autonomous mode)

## Goal
A buildable Next.js app with the full toolchain so later tasks only add features.

## Scope
- Next.js App Router + TypeScript, Tailwind CSS, shadcn/ui (config + `cn` helper), Lucide.
- Fonts via `next/font/google`: Inter Tight (sans) and JetBrains Mono (mono), exposed as Tailwind tokens.
- "Portfolio v3" color tokens as CSS variables mapped to Tailwind theme colors:
  bg #0B0F14, surface #121821, border #1F2A37, text #E6EDF3, text-muted #8B98A9, text-subtle #7A8798, accent #7EE787.
- Scripts: `dev`, `build`, `lint`, `typecheck`, `test` (Vitest), `test:e2e` (Playwright).
- `.env.example` with `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

## Out of scope
Real page content (LEARNING-141), themes (LEARNING-147), CI (LEARNING-140).

## Acceptance criteria
- AC1: Given a fresh clone, when `npm ci && npm run build` runs, then it exits 0.
- AC2: Given the repo, when `npm run lint` and `npm run typecheck` run, then both exit 0.
- AC3: Given the `cn` helper, when `npm run test` runs, then a Vitest unit test passes.
- AC4: Given the dev server, when `/` is opened in Playwright, then the page renders with the token background color `rgb(11, 15, 20)` and the Inter Tight font family.
- AC5: Given `.env.example`, then it lists `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` with empty values.

## Technical notes
- Tokens live in `app/globals.css` (`:root` CSS variables) and Tailwind v4 `@theme inline`; components use token classes only (`bg-bg`, `text-text-muted`, ...).
- Playwright starts the app via `webServer` (`npm run build && npm run start` in CI, `npm run dev` locally).

## Risks
- Tool versions move fast; exact versions pinned in `package-lock.json`.
