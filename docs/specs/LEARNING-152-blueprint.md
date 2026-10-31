# Theme 05: Architecture blueprint + system map (LEARNING-152)

Status: Approved (self-approved, autonomous mode)

## Goal
A blueprint-paper theme whose home page opens with an interactive system map of projects.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/blueprint.md`.
- `themes/blueprint/`: tokens (blueprint blue, pencil-yellow accent, mono headings), grid-paper CSS, a `layout` that portals `SystemMap` into the home page's `#theme-slot-home` (first child of `<main>`).
- `SystemMap`: hub + one node per case study and the public repo; dashed 1px connectors; details on hover and focus; "View as list" `<details>`.
- E2E for the theme-engine follow-ups: keyboard theme switch, stored theme before hydration, `?theme=` not persisted, terminal `theme <id>`.

## Out of scope
Per-case-study diagrams (already in LEARNING-144).

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/blueprint.md` exists with the exact tokens.
- AC2: Map nodes are focusable links whose accessible names include title, tech and impact; focus (not only hover) reveals the details; Enter opens the page.
- AC3: "View as list" lists the same links.
- AC4: `SystemMap` is static markup (HTML + SVG + CSS, no hooks): `renderToStaticMarkup` yields the lines and real `href`s, so it navigates without JS. On the live site it mounts through the theme layout, which needs app JS.
- AC5: All text tokens ≥ 4.5:1 on bg, bgAlt, surface, surface2 (registry tests); axe clean; no horizontal scroll at 375px (nodes stack, connectors hidden).
- AC6 (engine follow-ups): selecting Blueprint with the keyboard keeps focus on the switcher and announces "Theme: Blueprint"; a stored theme is applied with app JS blocked; `?theme=blueprint` is not persisted; terminal `theme blueprint` switches and unloads the command bar.

## Technical notes
- With JS fully disabled no non-default theme can be selected (selection itself needs the head script), so AC4 is verified by server-rendering the map.

## Risks
- Map positions are fixed for up to 4 nodes; more projects need more slots.
