# feat(theme): Interactive 3D world (Three.js) (LEARNING-155)

Jira: LEARNING-155 · Spec: [docs/specs/LEARNING-155-3d-world.md](../specs/LEARNING-155-3d-world.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/3d-world.md` (3D/WebGL verified; models, realistic shadows and parallax rejected for the asset and fps budgets).
- `lib/world.ts`: movement, world bounds, zones, key mapping (unit-tested).
- `themes/3d-world/scene.ts`: procedural low-poly Three.js scene (0 bytes of model/texture assets), dynamically imported only by this theme; pixel ratio ≤ 1.5, no antialias, labels written straight to the DOM.
- `themes/3d-world/layout.tsx`: full-screen world dialog once per session; arrows/WASD on the canvas, on-screen pad (pointer, touch and keyboard), "Go directly to" zone buttons; walking onto a pad opens that section (from any page → `/#zone`); "Skip to content"/Esc → standard layout with focus on `#main`; reduced motion → never opens.
- New dependency: `three` (+ `@types/three`), only in the theme's lazy chunk.

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 Three.js only in this theme; no assets | `e2e/3d-world.spec.ts` (script bodies, asset requests) | pass |
| AC3 skip/Esc, reduced-motion fallback | e2e | pass |
| AC4 keyboard, pad (keyboard too), zone opens section (also from a case study) | e2e, `lib/world.test.ts` | pass |
| AC5 ≥ 30 fps | `npm run test:perf` (alone, headless software renderer) | pass |
| AC6 axe, contrast | e2e, registry tests | pass |

## Review
Round 1: 1 Blocker (zone exits from non-home pages did nothing and lost focus) → navigate to `/#zone`, regression e2e added. Should items fixed: input released on blur/pointercancel, labels behind the camera hidden, failure state really exits, pad buttons work by keyboard. Nits: copy in content, dialog closed on cleanup, overflow hidden, opaque HUD bars, single reduced-motion read. No second review round.
- The fps check moved to an isolated perf suite after it flaked under parallel e2e load (software WebGL competing for CPU).
