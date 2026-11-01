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

## fix/ui-blueprint (item 2)
- ui-ux-pro-max layout pass: `"portfolio technical case studies" --domain landing` (Portfolio Grid verified; masonry and hover-only CTA rejected), `"technical diagram wireframe readability" --domain ux`; "## Layout" appended to `design-system/portfolio-v3/pages/blueprint.md`.
- Restyle (CSS only, shared DOM/content): case cards as spec sheets (square, ruled frame, accent corner ticks, title strip), metrics/stats as dimension annotations in dashed frames, experience as a revision table, contact as a drawing title block, square mono buttons; lab and kits squared.
- Shared: `data-part` hooks on hero stats/portrait/buttons, case cards/meta/metrics, roles, stack, contact actions, eyebrows. Theme select now 44px tall (all themes).
- Tests: `e2e/checklist.spec.ts` (375px, landscape, 200% zoom, reduced motion, 44px targets, axe), restyle assertions in `e2e/blueprint.spec.ts`.
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: same layout as night terminal in blue → technical-drawing language across cards, stats, experience and contact (`docs/screenshots/blueprint/`).
- Review: REQUEST CHANGES (stray script committed, screenshots missing) → script moved to `scripts/shot-sections.mjs`, screenshots refreshed; Should items fixed (strict touch targets, restyle test, stable hooks). No second review round.

## fix/ui-pixel (item 2)
- ui-ux-pro-max layout pass: landing searches returned no verified match (built-in defaults: hero first, proof, work, contact); ux: line-height and number formatting verified, glass/z-depth rejected. "## Layout" appended to `pages/pixel.md`.
- Restyle: case cards as quest dialog boxes (double border, QUEST tab, rewards in the pixel font, inventory-slot tags), hero stats as a character sheet, experience as save slots, kits as item cards, contact as a "CONTINUE?" box with pressable pixel buttons.
- Cross-theme fixes from review: all theme stylesheets imported statically in the root layout (styled on first paint; Swiss print CV works without JS); Press Start 2P and Libre Bodoni declared in the root layout with `preload: false` (fetched only when a theme uses them; no font swap on load); registry test ensures every theme CSS is imported.
- Tests: restyle assertions + no-JS first-paint test (`e2e/pixel.spec.ts`), Swiss print without JS, checklist extended to pixel; blueprint restyle test waits for its layout mount (fixed a 1/24 flake).
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: night-terminal layout in purple → game-UI language (`docs/screenshots/pixel/`).
- Review round 1: REQUEST CHANGES (screenshots missing; restyle-on-load, kits undocumented) → fixed. Round 2: REQUEST CHANGES (screenshots still missing; font swap, clip risk, no first-paint test) → fixed and screenshots committed on the branch. No third round.

## fix/ui-cyberpunk (item 2)
- ui-ux-pro-max layout pass: landing searches → no verified match (built-in defaults, hero first); ux: contrast without glow, line-height, number formatting verified; clip-path buttons rejected (would cut the focus ring). "## Layout" appended to `pages/cyberpunk.md`.
- Restyle: bracketed HUD eyebrows, dossier cards (status-bar meta, cyan readouts, bracketed tags), hero stats as HUD readouts with cyan corner brackets (highlight stays magenta), experience as an access log with `>` prompts, contact as a chamfered UPLINK panel, square mono buttons (email keeps its case), framed kit modules.
- Shared hooks added: `data-part="roles"`, `data-part="kit"`.
- Tests: restyle assertions in `e2e/cyberpunk.spec.ts`; checklist extended to cyberpunk.
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: night-terminal layout in magenta → HUD language (`docs/screenshots/cyberpunk/`).
- Review: APPROVE; fixed mobile UPLINK balance, highlight colour, hooks, label size, email-case test; screenshots and progress row on the branch.
