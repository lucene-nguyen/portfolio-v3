# portfolio-v3

Personal portfolio of **Nguyen Manh Cuong**, Fullstack Software Engineer:
case studies, a live rate-limiting lab, and starter kits.

## Tech stack
Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · MDX · Upstash Redis · Vitest · Playwright · Vercel

Why this stack: [docs/adr/0001-tech-stack.md](docs/adr/0001-tech-stack.md)

## Getting started
```bash
npm install
cp .env.example .env.local   # add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
npm run dev
```

## Scripts
| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` / `npm run typecheck` | Code quality |
| `npm run test` / `npm run test:e2e` | Unit / E2E tests |
| `npm run test:perf` | Performance checks (3D world fps), one worker, run alone |

E2E runs against a production build (as in CI). For quick local iteration on a few specs: `E2E_DEV=1 npx playwright test e2e/<spec>`.

## Workflow
Each feature goes through `/spec → /implement → /test → /review → /deploy` (Claude Code skills in `.claude/skills/`).
Specs live in `docs/specs/`, architecture decisions in `docs/adr/`.

## Contact
manhcuongmvc@gmail.com · [github.com/lucene-nguyen](https://github.com/lucene-nguyen)
