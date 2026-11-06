# portfolio-v3

Personal portfolio of Nguyen Manh Cuong. Case studies, live rate-limiting lab, starter kits.

## Stack
Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui, Lucide, MDX, Upstash Redis (rate limiting + small persistent data; separate dev and prod databases), Vercel.
Rationale and alternatives: `docs/adr/0001-tech-stack.md`. Exact versions: `package.json`.

## Commands
- `npm run dev` / `npm run build`
- `npm run lint` / `npm run typecheck`
- `npm run test` (Vitest) / `npm run test:e2e` (Playwright)
- `npm run data:dev` — apply data setup/changes (`scripts/data/`) to the **dev** Redis only

## Workflow (always follow)
Every feature goes through: `/spec` → `/implement` → `/test` → `/review` → `/deploy`.
- No code before the spec in `docs/specs/<feature>.md` is approved by the user.
- One feature = one branch `feat/<feature>`.
- Never deploy to production without the user's explicit OK.

## Current phase: local-first (UI/UX polish)
- Everything runs locally: `npm run dev` (http://localhost:3000), themes via `?theme=<id>` when themes are unlocked.
- Feature flags (build time, `.env.local`, value `on`): `NEXT_PUBLIC_FEATURE_THEMES` (all 13 themes + switcher; off = Night terminal only, `?theme=` and saved choices ignored, other themes' E2E specs skipped), `NEXT_PUBLIC_FEATURE_CASE_STUDIES`, `NEXT_PUBLIC_FEATURE_LAB`. Theme code, tests and design rules stay in the repo while locked.
- No Vercel, no deploys, no prod env vars, no PR to main. LEARNING-146 (deploy) is on hold until the owner says so.
- No external accounts needed: rate limiter uses the in-memory fallback; use `docker compose up -d` only when testing real Redis.
- Owner reviews the UI in the browser and sends feedback per theme; each round of feedback = one branch `fix/ui-<theme>` from develop → /implement → /test → /review → merge into develop.
- Before reporting a UI change done: run the app, check the theme at 1440px and 375px, and attach screenshots (save to `docs/screenshots/<theme>/`).

## Autonomous mode (when asked to "run the backlog")
- Follow `docs/backlog.md` top to bottom; update its Status column as you go. If interrupted, resume from the first non-done row.
- Specs are self-approved (write the spec, then continue) — this is a low-risk showcase site.
- Per task: /spec → /implement → /test → /review (fix all Blockers, max 3 rounds) → merge the task branch into `develop`, push, append the PR description to `docs/prs/<KEY>.md`.
- Never fabricate facts about the owner: unknown values stay as `[PLACEHOLDER]`.
- Mark a task `blocked: <reason>` and move on when it needs secrets, accounts, paid services, or prod access.
- Stop and report when: all rows are done/blocked, the same test fails after 3 fix attempts across tasks, or `develop` no longer builds.
- Never push to `main`, never deploy, never touch prod data. The final `develop` → `main` PR is reviewed by the owner and the Architect.

## Conventions
- English for code, comments, specs, commits (Conventional Commits).
- Components in `components/`, logic in `lib/`, content in `content/`.
- Colors and fonts only via Tailwind theme tokens, no raw hex in components.

## Roles
Tools are interchangeable: when a named tool doesn't fit the stack, use the stack's equivalent (e.g. Redis instead of a SQL database).
- **Architect (Claude in claude.ai chat):** reviews plans and commits, runs data checks on dev, applies data changes to prod via MCP/CLI (only after explicit owner OK), compares prod vs dev, checks Vercel deploys and logs, manages Jira (epic LEARNING-138), and writes paste-ready prompts for Claude Code.
- **Implementer (Claude Code, owner's PC):** writes code, data changes, tests and docs; applies data changes on **dev only**, runs unit and E2E tests on dev; commits and pushes feature branches; drafts PR descriptions. Never touches prod data.
- Jira keys go in branch names and commits, e.g. `feat/LEARNING-147-theme-engine`, `feat(theme): ... (LEARNING-147)`.
