# feat(theme): Anime + manga-panel storytelling (LEARNING-160)

Jira: LEARNING-160 · Spec: [docs/specs/LEARNING-160-anime.md](../specs/LEARNING-160-anime.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/anime.md`. The style database had no verified match (two queries); the file records the built-in defaults instead and the artwork policy.
- `themes/anime/`: light paper/ink tokens, manga CSS (4px ink borders, hard shadows, speech bubbles with tails, fade-in only without reduced motion).
- Manga strip (portal into `#theme-slot-home`): one panel per role, oldest first; bubble text = role summary from `content/` verbatim.
- Artwork: original abstract SVG (speed lines, halftone, laptop glyph), no characters, each with alt text (`aria-label` + `<title>`); marked `[PLACEHOLDER: commissioned artwork]`.
- Plain-text story in a `<details>` list.

## Owner action
Replace the placeholder panels with commissioned or self-made artwork (no copyrighted characters).

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 original art, no characters | `themes/anime/manga.test.tsx` (SVG only), review | pass |
| AC3 alt text + plain text story | unit + `e2e/anime.spec.ts` | pass |
| AC4 bubble contrast, axe, 375px | unit + e2e | pass |

## Review
APPROVE, no Blockers. Fixed: axe run with reduced motion (no half-faded panels), `<title>` in panel SVGs, bubbles as `<p>`, unique keys, counts from content.
