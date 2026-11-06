# Round 2: Work with me (LEARNING-166)

Status: Approved (self-approved, autonomous mode; low-risk showcase site)

## Goal
Clients hiring for web apps can see what to hire the owner for and how a project runs, then contact him with the right collaboration type already chosen. There are no prices.

## Scope
- A new `#work-with-me` section between Starter kits & labs and Contact. It is added to the nav, the docs sidebar, the IDE files (`services.md`), the search index and the eyebrow numbering. The hero's "Work with me" CTA now points here.
- Services (names from the owner; one-sentence copy written with design:ux-copy, no claims or numbers):
  1. End-to-end web apps → CTA "Discuss a web app" (Freelance project)
  2. Backend, API and AWS → CTA "Discuss a backend" (Freelance project)
  3. Industry starter kits (TableTap, Booking, CRM) → CTA "Ask about a kit" (Freelance project). The card shows each kit's real status from the kits data.
  4. Architecture consulting → CTA "Request a review" (Consulting)
- How I work: Discuss → Proposal → Build (spec → code → test → review) → Hand-over and support, with one line each.
- Each CTA links to `/?type=<id>#contact`. The Contact form (LEARNING-167) reads `type` and preselects it. The collaboration types are defined once in `content/home.ts`.
- Styling reuses existing hooks, so every theme's restyle applies: service cards are `data-part="kit"` and steps are `data-part="roles"`/`"role"`. The dashboard and IDE header labels get step-specific text.

## Acceptance criteria
- AC1: `#work-with-me` sits between `#kits` and `#contact` in every theme. The eyebrows are numbered 01–05.
- AC2: Four service cards, each with a name, a description and a CTA. The CTA href carries the right `type`, and there are no prices.
- AC3: The four steps are an ordered list, in order, with descriptions.
- AC4: The hero CTA and the nav link go to `#work-with-me`. The search index has a Work with me entry.
- AC5: axe is clean. There is no horizontal scroll at 375px. The pre-delivery checklist passes in all 13 themes.
- AC6: lint, typecheck, unit and E2E tests pass. Screenshots are taken at 1440 and 375 for all 13 themes.
