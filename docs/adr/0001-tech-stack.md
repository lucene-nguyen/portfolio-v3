# ADR 0001: Tech stack

- Status: Accepted
- Date: 2026-10-31

## Context
A personal portfolio that must load fast, be cheap to run, easy to update with new case studies,
and include one live backend demo (a rate limiter) to show backend skills.

## Decision
| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling / UI | Tailwind CSS, shadcn/ui, Lucide icons |
| Content | MDX files in `content/` |
| Live lab API | Next.js Route Handler (`/api/ping`) |
| Rate-limit store | Upstash Redis (HTTP, serverless-friendly) |
| Persistent data | Same Upstash Redis (aggregated lab stats, theme feature data); separate dev and prod databases |
| Testing | Vitest (unit), Playwright (E2E) |
| Hosting / CI | Vercel, GitHub Actions |

## Rationale
- Static generation keeps pages fast; Route Handlers cover the one small API without a separate server.
- Tailwind + shadcn/ui give accessible components we own and can restyle.
- MDX: adding a case study is one file, no CMS or database.
- Upstash works over HTTP from serverless functions and has a free tier.
- Token bucket and fixed window are implemented by hand (not only via a library) to showcase the logic.

## Alternatives considered
- Cloudflare Workers + Durable Objects: great fit for per-visitor state and realtime updates, but adds
  migration effort for Next.js. Revisit for v2.
- Separate NestJS API: shows NestJS skills, but more infra to run. Revisit for v2.
- Headless CMS: unnecessary while only the owner edits content.
- SQL database (e.g. Supabase Postgres): not needed yet; the data is small and key-value shaped. Revisit if a theme needs relational queries.

## Data change flow
Claude Code writes data setup/changes as versioned scripts in `scripts/data/` and applies them to the dev Redis. The Architect (claude.ai chat) checks dev, compares dev vs prod keys, and applies changes to prod only after explicit owner approval.

## Consequences
- Tied to Vercel's free-tier limits; acceptable for a portfolio.
- Exact versions live in `package.json`, not in this ADR.
