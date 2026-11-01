# LEARNING-164: Round 2, home structure and copy

Branch: `feat/LEARNING-164-structure-copy` → `develop` · Spec: [docs/specs/LEARNING-164.md](../specs/LEARNING-164.md)

## What changed
- `lib/features.ts`: case studies and the live lab are parked behind `NEXT_PUBLIC_FEATURE_CASE_STUDIES` and `NEXT_PUBLIC_FEATURE_LAB` (both off by default). The code and routes stay.
- Home order is Hero → Experience → Starter kits & labs → Contact. Skills (LEARNING-165) and Work with me (LEARNING-166) slot in later. Eyebrow numbers follow the visible order.
- Hero: the new H1, subline and bio, verbatim from the owner. CTAs are "See my experience" (`#experience`) and "Work with me" (`#contact` until LEARNING-166). The resume link stays hidden while it is a placeholder. The hero has no avatar now; a round avatar sits in the contact area and is hidden in print. The bento photo tile is decorative (`alt=""`).
- The nav logo reads "Cuong Nguyen", matched in the blueprint map, the OG image and the terminal prompt.
- With the flags off, the parked sections leave:
  - the nav, sitemap and search index
  - the docs sidebar and breadcrumb
  - the IDE files and the terminal (`ls`/`open` are hidden)
  - blueprint (career nodes: roles + starter kits)
  - bento tiles, the 3D zones (Experience, Starter kits, Contact), the neo sticker board (it filters the starter kits) and the pixel achievements
  - the dashboard traffic panel and the cyberpunk HUD (the lab slot is gone)

  `/work/<slug>` still renders with `robots: noindex`, and its back link goes to `/`.
- The site description is rewritten from the owner's bio only.
- Bug fixes found on the way:
  - The hero's leftover `flex-basis` forced a 560px height, which also broke the one-page CV.
  - The mobile header gap is tighter, so the longer logo stays on one line.
  - The UI sweep skips the lab check while the lab is parked.

## Tests
- Unit tests pass with the flags **off and on** (258 / 257 + 1 skip): world zones, achievements, blueprint nodes, IDE files, sticker board, terminal commands.
- E2E: 197 pass and 16 skip. Each skip is a test of a parked feature that runs again when its flag is on, and each names LEARNING-164. New tests cover the section order, hero copy and CTAs, the contact avatar, the absence of parked links, and noindex on parked pages. Restyle assertions on case cards are kept behind a flag check, not deleted.
- `playwright.config.ts` loads the same `.env` files as the build, so specs see the built flag state.
- The pre-delivery checklist passes for all 13 themes. Screenshots for all 13 themes at 1440 and 375 are in `docs/screenshots/<theme>/`.

## ui-ux-pro-max
- `"personal portfolio hero" --domain landing` verified Hero-Centric Design / Portfolio Grid: one primary CTA, and the hero leaves room for the next-content cue.
- `"primary secondary call to action" --domain ux`: primary and secondary CTAs are styled distinctly.
- No new section was added in this item.

## Review
CHANGES REQUESTED, then fixed:
- **Blocker:** five unit tests failed with the flags on, because the old flag-on assertions had been replaced instead of split by flag. They now cover both states.
- **Shoulds fixed:**
  - back links and the docs breadcrumb no longer point at `/#work`;
  - one described portrait per page;
  - the old `cuong.dev` name is replaced;
  - E2E reads the build's `.env` files.

**Known, not changed:** the theme select is capped at 144px on mobile (round-1 mobile-nav decision), so "Night terminal" is cut off at 375px. This predates the branch.
