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
