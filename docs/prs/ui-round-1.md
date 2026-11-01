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

## fix/ui-editorial (item 2)
- ui-ux-pro-max layout pass: landing searches → no verified match (built-in defaults); ux: 65–75 character line length verified, ellipsis truncation rejected. "## Layout" appended to `pages/editorial.md`.
- Restyle: small-caps kickers, case studies as box-less feature teasers (rule on top, serif headlines, serif pull-figure metrics, middot-separated small-caps tags), hero stats as a "by the numbers" band, experience as a masthead list, kits as ruled teasers, contact as a sign-off with outlined square buttons; lab panel squared.
- Tests: restyle assertions in `e2e/editorial.spec.ts`; checklist extended to editorial.
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: boxed default layout on paper → magazine layout (`docs/screenshots/editorial/`).
- Review: CHANGES REQUESTED (screenshots) → screenshots on the branch; Should items fixed (outlined sign-off, list separators, documented square buttons, progress row); nits (no !important, scoped lab rule, more assertions). No second round.

## fix/ui-night-terminal (item 2)
- ui-ux-pro-max layout pass: `"developer portfolio" --domain landing` (Portfolio Grid verified — the approved mockup's order), `"terminal monospace readability" --domain ux` (numbers, line-height, contrast). "## Layout" appended to `pages/night-terminal.md`; changes stay accents on the owner-approved mockup layout.
- New `themes/night-terminal/night-terminal.css` (imported in the root layout): `#` shell-comment eyebrows, case cards as terminal windows (title bar with `▸` prompt), `›` prompts on stat labels, experience as a git-log graph (dashed line, accent commit dots), `$ contact --open` prompt above the contact actions.
- Tests: accent assertions in `e2e/night-terminal.spec.ts`; checklist extended to night-terminal.
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: mockup layout → same layout with terminal-language accents (`docs/screenshots/night-terminal/`).
- Review: APPROVE; fixed title-bar radius (derived, commented dependency on the card's p-7/rounded-2xl), mono font token, commit-dot alignment, stat prompt test.

## fix/ui-dashboard (item 2)
- ui-ux-pro-max layout pass: `"analytics dashboard data" --domain landing` (Real-Time / Operations verified: hero → live metrics → work → CTA; Enterprise Gateway rejected), ux `"data table readability"` (stacked rows on mobile, number formatting; bulk actions N/A). "## Layout" appended to `pages/dashboard.md`.
- New `themes/dashboard/dashboard.css` (root-layout import): panel-row eyebrows, case cards as panels with title bars, hero stats as individual stat panels, experience as a table with a header row (desktop) and zebra rows, contact as a titled panel, kit panels.
- Tests: restyle assertions (token-derived colours) in `e2e/dashboard.spec.ts`; checklist extended to dashboard.
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: default layout in Grafana colours → panel language throughout (`docs/screenshots/dashboard/`).
- Review: APPROVE; documented the header/column alignment dependency, commented `!important`s, fixed title-bar line-height, token-derived test colours.

## fix/ui-ide (item 2)
- ui-ux-pro-max layout pass: `"developer tool product" --domain landing` → no verified match (built-in defaults); ux `"code editor tabs panels"` → code splitting (verified). Existing Layout section extended with "Shared sections (UI round 1)" in `pages/ide.md`; left-border accent cards and prose line-number gutters rejected.
- New `themes/ide/ide.css` (root-layout import): `//` comment eyebrows, case cards as editor panes with an accent tab strip, hero stats as an accent status bar (text in accentContrast), experience as a TIMELINE panel, contact as a TERMINAL panel with `$` prompt.
- Checklist finding fixed: IDE tab close buttons 32px → 44px.
- Tests: restyle assertions (token colour) in `e2e/ide.spec.ts`; checklist extended to ide.
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: default sections inside the IDE chrome → editor-language sections (`docs/screenshots/ide/`).
- Review: APPROVE; token colour in test, distinct terminal header, documented `$`/`p-7` dependencies, removed misleading hover.

## fix/ui-docs (item 2)
- ui-ux-pro-max layout pass: `"documentation knowledge base" --domain landing` (FAQ/Documentation verified: prominent search, contact CTA last; accordions rejected), ux `"documentation readability navigation"` (sticky nav never overlaps content, line-height, numbers). Existing Layout section extended with "Shared sections (UI round 1)" in `pages/docs.md`; emoji callout icons rejected.
- New `themes/docs/docs.css` (root-layout import): quiet grey eyebrows, gallery cards with property chips and multi-select pills, stats and contact as callout blocks, experience as a database list with fixed-width period chips (titles aligned), kit gallery cards.
- `npm run ui:sweep` now resets the lab before its burst (the in-memory limiter is shared across sweeps).
- Tests: restyle assertions in `e2e/docs.spec.ts`; checklist extended to docs.
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: default boxed sections in docs colours → Notion block language (`docs/screenshots/docs/`).
- Review: CHANGES REQUESTED (docs missing from the checklist list — a silent edit miss) → added and passing; Should (sweep lab result) fixed by resetting the limiter; nits applied.

## fix/ui-bento (item 2)
- ui-ux-pro-max layout pass: `"bento grid portfolio" --domain landing` (Bento Grid Showcase, Portfolio Grid verified), ux `"heading hierarchy font size scale"` (applied; Breadcrumbs result ignored as off-topic). New "## Layout" section in `pages/bento.md`; hover scale/tilt and staggered entrance rejected.
- New `themes/bento/bento.css` (root-layout import): pill eyebrows; borderless 24px tiles with a soft token-derived shadow for case studies, roles, kits, contact and hero stats; case studies as a 2-column mosaic with a wide first feature tile (one column below 768px); stack as a bgAlt tile.
- Tests: restyle assertions in `e2e/bento.spec.ts` (radii, shadow, stack vs role ground, wide feature tile, single column and 2×2 stats at 375px); checklist extended to bento.
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: default bordered sections inside the bento grid → tile language throughout (`docs/screenshots/bento/`).
- Review: APPROVE; Shoulds applied (shadow from `--text` via color-mix, stronger tile assertions); nits kept (`!important` matches docs/dashboard, 13px eyebrow intended).

## fix/ui-neo-brutalism (item 2)
- ui-ux-pro-max layout pass: `"neo brutalism bold portfolio" --domain landing` returned 0 results; retry `"portfolio grid creative"` verified Portfolio Grid; `"neubrutalism" --domain style` verified the style rules; ux `"bold borders visual hierarchy contrast"` (Contrast Readability applied; Breadcrumbs off-topic). New "## Layout" section in `pages/neo-brutalism.md`; press-to-sink motion and rotated cards rejected.
- `themes/neo-brutalism/neo.css`: raw `#000` replaced by `var(--border)`; sticker fills as theme-scoped vars; yellow uppercase eyebrows; colour header strip per case study (yellow/green/blue) with a bordered metrics box; hero numbers as four sticker tiles with hard shadows; roles as bordered cards with a black period label; stack as a pink panel; contact buttons with hard shadows.
- Tests: restyle assertions in `e2e/neo-brutalism.spec.ts` (every fill, shadows, strip edge-to-edge alignment, contact buttons); checklist extended to neo-brutalism.
- Pre-delivery checklist (ui-ux-pro-max `references/pro-rules.md`; web-applicable items):
  - Process: theme-specific `--domain landing` + `--domain ux` searches ✅ · 375px and landscape 812×375 ✅ (e2e) · reduced motion ✅ (no running animations, e2e) · 200% zoom (720px viewport) ✅ · contrast per theme ✅ (registry tests: every text token on every ground) · touch targets ≥ 44px for buttons/selects ✅ (e2e, strict)
  - Visual: no emoji icons ✅ (Lucide only) · one icon family ✅ · no layout-shifting press states ✅ · tokens only, no ad-hoc hex ✅
  - Interaction: visible focus ring ✅ · focus order = DOM order ✅ (home tab test) · descriptive labels ✅ (axe clean) · drag has button alternatives ✅ (where present)
  - Layout: nothing hidden behind fixed UI ✅ (no fixed controls on mobile) · 4/8px spacing rhythm ✅ · readable measure ✅
  - Accessibility: decorative icons/labels hidden from AT ✅ · colour never the only indicator ✅ · reduced motion ✅
  - N/A for this site: safe-area insets/Dynamic Type (native), dark+light parity (each theme is single-mode, contrast-tested), forms/auth, auto-rotating content.
- Before/after: default sections with black borders only → sticker language throughout (`docs/screenshots/neo-brutalism/`).
- Review: APPROVE; Shoulds applied (strip alignment e2e check documented at the negative margin, full fill/contact/metrics assertions); nits applied (shared shadow var, selector matches CSS, pink/violet kept for parity with STICKER_FILLS).
