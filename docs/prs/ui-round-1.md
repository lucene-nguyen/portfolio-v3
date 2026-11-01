# UI/UX round 1 — PR notes

Spec: [docs/specs/ui-round-1.md](../specs/ui-round-1.md). Before = `docs/screenshots` at 145c28b.

## fix/ui-placeholders (item 3)
- `lib/placeholder.ts`: `shown()` / `stripPlaceholders()`; `SHOW_PLACEHOLDERS=1 npm run dev` shows them (ignored when `NODE_ENV=production`), passed to client code via `next.config` `env`.
- Content: unfinished metrics filtered at the source; resume link, kit stacks/links, anime art note hidden; owner LinkedIn URL added (https://www.linkedin.com/in/cuong-m-nguyen/).
- MDX: list items with a placeholder dropped, trailing notes stripped, emptied sections' headings hidden (CSS), diagram tech labels hidden; search index cleaned.
- Verified: dev with flag → 22 placeholder strings on a case study; without → 0. New e2e: no "PLACEHOLDER" text on 4 pages × 13 themes + search index.
- Before/after: placeholder text (resume.pdf [PLACEHOLDER], LinkedIn [PLACEHOLDER], [STACK], [X] metrics, case-study notes, "Learnings") → gone in every theme.
- Review: APPROVE; fixed metric guards (bento/blueprint), heading+emptied-list rule, search list lines, screenshots refreshed.

## fix/ui-hero-first (item 1)
- `#theme-slot-home` moved after `<Hero />`: blueprint (system map), dashboard (panels), bento (board), neo-brutalism (sticker board), anime (manga strip) now render directly below the hero.
- 3D world: no longer opens over the page on load; an "Explore in 3D" entry block below the hero opens it (home only; hidden under reduced motion). Three.js still loads only after clicking. Floating "Enter 3D world" button removed. LEARNING-155 spec updated.
- Tests: `e2e/hero-first.spec.ts` (hero first + slot filled for the 6 block themes, empty for the others), 3D tests updated (entry, axe on the entry, lazy Three.js).
- Before/after: 6 themes previously opened with their block (3D world fully covered the page) → all 13 open with the hero.
- Review: APPROVE; fixed slot assertions, duplicate landmark name, stale spec/JSDoc, screenshots refreshed.

## fix/ui-mobile-nav (item 5)
- `SiteNav` (client): < 768px one line — logo, theme switcher (label sr-only, select capped), Menu button (`aria-expanded`/`aria-controls`); the menu holds the links, resume link and theme actions; closes on link/action, Esc returns focus to the toggle. ≥ 768px unchanged inline nav.
- `#theme-slot-nav` in the menu: Night terminal "Terminal" and Pixel "Achievements" entries on mobile; their floating buttons and spacers are desktop-only. Dialog openers keep the menu open so focus returns to them. Docs' own drawer button renamed "Pages" (no two "Menu" buttons).
- Tests: `e2e/mobile-nav.spec.ts` (one-line header + no visible fixed control in all 13 themes, menu keyboard/Esc/focus/axe, Pixel entry focus return, desktop unchanged); Terminal 375px test via the menu; home tab test counts visible controls only.
- Screenshots: sweep now also saves `mobile-375-menu.png` per theme.
- Before/after (375px): nav wrapped to 3 lines with "Theme" label and placeholder resume; Terminal/Achievements buttons floated over hero content → one-line header, menu panel, no floating controls.
- Review: APPROVE; fixed focus loss after menu dialogs, Esc focus, fixed-control check that couldn't fail, comment, screenshots.

## fix/ui-swiss-grid (item 4)
- 12-column overlay hidden by default; "Show grid" toggle in the nav (`aria-pressed`, ≥ 1024px only where the grid exists), choice saved in localStorage on click. Print CV unaffected (grid rules are screen-only).
- Tests: `e2e/swiss.spec.ts` (hidden by default, toggle on, remembered after reload, toggle hidden below 1024px).
- Screenshots: `desktop-1440.png` (grid off), `desktop-1440-grid-on.png`, `mobile-375*.png`.
- Before/after: grid always drawn over the page → off by default, on demand.
- Review: APPROVE; saved on click instead of every mount, hover state, screenshots/notes added.
