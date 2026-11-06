# LEARNING-166: Round 2, Work with me

Branch: `feat/LEARNING-166-work-with-me` → `develop` · Spec: [docs/specs/LEARNING-166.md](../specs/LEARNING-166.md)

## What changed
- New **Work with me** section (`#work-with-me`) between Starter kits & labs and Contact. It has no prices.
  - **Four services**, each with a verb CTA: End-to-end web apps / "Discuss a web app", Backend, API and AWS / "Discuss a backend", Industry starter kits / "Ask about a kit", and Architecture consulting / "Request a review". Each CTA links to `/?type=<freelance|consulting>#contact`, which LEARNING-167 preselects. The kits card shows each kit's real status from the kits data.
  - **How I work**: Discuss → Proposal → Build (spec → code → test → review) → Hand-over and support.
- Copy was written with design:ux-copy. After review it says only what the owner provided: no production, availability, timeline or cost promises.
- The collaboration types are defined once (`collabTypes` / `CollabType`) for the Contact form.
- Styling reuses the existing hooks:
  - Service cards are `data-part="kit"` (the shared `kitCard` now lives in `ui.tsx`), and steps are `data-part="roles"`/`"role"`.
  - The theme rules scoped to `#kits` (neo, pixel, blueprint) and the h3-only heading rules (editorial, docs, pixel, neo) now also reach the service cards and h4 step titles.
  - The dashboard and IDE timeline headers say STEP / WHAT HAPPENS and PROCESS here.
- Wiring: the hero "Work with me" CTA, the nav, the docs sidebar, IDE `services.md`, the search index, and eyebrows 01–05. The swiss print CV hides the section.

## Tests
- New `e2e/work-with-me.spec.ts`:
  - each service's CTA href and type;
  - the kits status, built from the data;
  - no prices;
  - steps in order;
  - hero, nav and search links, and section order;
  - per theme at 375px: no horizontal scroll and axe clean;
  - the dashboard and IDE labels;
  - theme heading and card rules reaching the section (editorial, neo).
- Robustness: the 3d-world eyebrow check now polls, and the dashboard roles locator is scoped to `#experience`.
- Results: 230 E2E pass and 16 skip (parked features). Unit tests pass. The pre-delivery checklist passes for all 13 themes. Screenshots for all 13 themes at 1440 and 375 are in `docs/screenshots/<theme>/`.

## ui-ux-pro-max
- `"services offering process steps" --domain landing` returned 0 results. The retry, `"3-step conversion funnel"`, verified Funnel (3-Step Conversion): a mini-CTA per card, with Contact as the final main CTA.
- `"call to action specific label"` and `"button label action verb"` (`--domain ux`) found no verified match for CTA labels. The labels follow the design:ux-copy CTA rules instead (verb first, specific outcome). This is stated here as a fallback.

## Review
CHANGES REQUESTED, then fixed:
- **Blockers:** two invented promises ("take it to production", "I stay available for questions and fixes") were removed. The borderline cost and timeline phrases were removed too.
- **Shoulds:** step titles and service cards now get the theme heading and card rules.
- **Nits:** the TableTap status assertion is data-driven, and the IDE check waits for the layout.
