# Theme 08: Interactive 3D world (Three.js) (LEARNING-155)

Status: Approved (self-approved, autonomous mode)

## Goal
A small explorable 3D scene where each zone is a site section.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/3d-world.md`.
- `lib/world.ts`: movement, bounds, zones, key mapping (unit-tested).
- `themes/3d-world/scene.ts`: Three.js scene (procedural, no assets), dynamically imported by the theme layout.
- `themes/3d-world/layout.tsx`: full-screen world dialog with HUD (skip, zone buttons, movement pad), opened from an "Explore in 3D" entry block below the home hero (home page only).
- Changed in UI round 1 §1 (`docs/specs/ui-round-1.md`): the world no longer opens automatically on first visit or on case-study pages; the floating "Enter 3D world" button was replaced by the entry block.

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/3d-world.md` exists with the exact tokens.
- AC2: Three.js is only loaded in this theme (no `WebGLRenderer` code on the default theme); the scene loads no model/texture assets (0 bytes, ≤ 2 MB budget).
- AC3: "Skip to content" (and Esc) exits to the standard layout with `#main` focused; reduced motion falls back to it automatically (world never opens).
- AC4: Keyboard (arrows/WASD) and touch (on-screen pad) navigation; entering a zone opens that section; zone buttons offer direct access.
- AC5: ≥ 30 fps (measured in-app; `npm run test:perf` asserts it with nothing else running, in headless Chromium's software renderer).
- AC6: axe clean on the world dialog; contrast ≥ 4.5:1 (registry tests).

## Risks
- `three` adds a large chunk, but only to this theme's lazy chunk.
