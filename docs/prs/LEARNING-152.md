# feat(theme): Blueprint + interactive system map (LEARNING-152)

Jira: LEARNING-152 · Spec: [docs/specs/LEARNING-152-blueprint.md](../specs/LEARNING-152-blueprint.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/blueprint.md` (HUD/FUI line work kept; neon/glow/animation rejected).
- `themes/blueprint/`: blueprint-blue tokens (all text ≥ 5.3:1 on every ground), mono headings, grid-paper CSS, a layout that portals the system map into `#theme-slot-home` (first child of `<main>`).
- System map: hub + 3 case studies + the public `rate-limiting-lab` repo; dashed connectors; details on hover and keyboard focus as an overlay; "View as list" alternative. Static markup, no hooks.
- Theme-engine follow-ups now covered by E2E: keyboard switch keeps focus and announces, stored theme applied with app JS blocked, `?theme=` not persisted, terminal `theme <id>`.
- Registry test now checks every text token on every ground. It found Night terminal's `textSubtle` on `surface2` at 4.3:1 (owner palette, unused pairing): recorded as "never on surface2" instead of changing owner colors.
- Separate housekeeping: `@types/mdx` moved to devDependencies.

## Known limit
On the live site the map mounts through the theme layout, so it needs app JS (any non-default theme does, since selection uses the head script). The map markup itself needs no JS (server-render test).

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file in repo | pass |
| AC2 focusable nodes, focus reveals details | `e2e/blueprint.spec.ts` | pass |
| AC3 list view, same links | e2e (hrefs equal) | pass |
| AC4 static markup | `themes/blueprint/system-map.test.tsx` | pass |
| AC5 contrast, axe, 375px | `themes/registry.test.ts`, e2e | pass |
| AC6 engine follow-ups | e2e | pass |

## Review
APPROVE, no Blockers. Fixed: full contrast matrix, map moved inside `<main>`, details overlay (checked at 768px), honest AC4 wording, repo node via `lab.repo`, list-vs-node href equality, dashed-line doc, "(GitHub)" hint.
