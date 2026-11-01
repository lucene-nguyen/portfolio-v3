# Round 2: Skills with icons (LEARNING-165)

Status: Approved (self-approved, autonomous mode; low-risk showcase site)

## Goal
Recruiters see the stack at a glance, right after the hero: a Skills section with recognisable icons and visible text labels. It replaces the `stack.json` panel in Experience.

## Scope
- New `Skills` section (`#skills`) directly after the hero (and the theme's home slot), before Experience. It joins the nav, the docs sidebar, the IDE files (`skills.json`), the search index and the eyebrow numbering.
- Groups, verbatim from the owner:
  - Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS
  - Backend: Node.js, NestJS, GraphQL, REST, WebSocket
  - Data & messaging: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, RabbitMQ, Kafka
  - Cloud & DevOps: AWS, Docker, GitHub Actions, Grafana
  - Also familiar with: Go, Python (visually secondary)
- Icons: Simple Icons (`simple-icons`, CC0), bundled at build time and imported per icon, so there is no runtime fetch. They are monochrome (`currentColor`), so they follow every theme's tokens and contrast. Brands without an icon get a neutral Lucide icon: AWS → Cloud, REST → Braces, WebSocket → ArrowLeftRight. Icons are `aria-hidden`, and every skill has a visible text label.
- The skills panel reuses the `data-part="stack"` hook, so each theme's existing stack restyle applies to the new section. Each theme's "## Layout" records the change.
- Experience becomes a single column (roles only). The bento stack tile reads the new skills.

## Acceptance criteria
- AC1: `#skills` comes right after the hero in every theme. The section order is hero → skills → experience → kits → contact, and the eyebrows are numbered 01–04.
- AC2: Every listed skill appears with its visible label and an `aria-hidden` icon (SVG). AWS, REST and WebSocket use the generic icons. "Also familiar with" is rendered smaller and muted.
- AC3: Experience no longer contains a stack panel. Exactly one `[data-part="stack"]` is on the page, inside `#skills`.
- AC4: The nav has a Skills link. The search index has a Skills entry (`/#skills`).
- AC5: Chip labels never wrap. There is no horizontal scroll at 375px. axe is clean. The pre-delivery checklist passes for all 13 themes.
- AC6: lint, typecheck, unit and E2E tests pass. Screenshots are taken at 1440 and 375 for all 13 themes.

## Out of scope
Proficiency levels and years per skill: not provided by the owner, so they are not invented.
