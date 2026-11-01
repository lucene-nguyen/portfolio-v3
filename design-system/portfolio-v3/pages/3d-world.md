# 3D World Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01 with ui-ux-pro-max (`"immersive 3d world portfolio" --design-system --persist --page 3d-world`; `"3d immersive webgl" --domain style`), then reconciled.
> **Theme id:** `3d-world` · **Tokens:** `themes/3d-world/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Style **3D & Hyperrealism**: WebGL/Three.js. Accessibility risk high → requires contrast 4.5, keyboard, visible focus, reduced motion. Performance cost high.

## Rejected suggestions (and why)
- Loaded 3D models, realistic/complex shadows, multi-layer parallax: they break the ≤ 2 MB asset budget and the 30 fps target. The world is procedural low-poly geometry (0 bytes of model/texture assets), no shadows, pixel ratio ≤ 1.5, no antialias.

## Color (exact)
| Token | Hex | Use |
|---|---|---|
| bg | #0F1626 | sky / fog |
| bgAlt | #121A2C | alternate band |
| surface | #172036 | ground, HUD buttons |
| surface2 | #1E2942 | chips |
| border | #2A3754 | grid lines (decorative) |
| borderStrong | #8C9BBA | grid axes, button outlines (6.5:1) |
| text | #EEF2FA | player, headings |
| text2 | #DCE3F0 | tags |
| textSecondary | #C5CEDF | instructions |
| textMuted | #A9B5CC | pillars, labels |
| textSubtle | #9CA9C2 | fine print |
| accent | #FFB547 | zone pads, zone labels, "Skip to content", focus ring |
| accentContrast | #0F1626 | text on accent |
| warning | #FFD27A | planned |
| danger | #FF8A8A | 429 |

## World
- Opens as a full-screen modal over the standard page on first visit of the session; Three.js is fetched only then.
- Zones: Work (north), Live lab (east), Starter kits (south), Contact (west). Walking onto a pad opens that section (world closes, page scrolls and focuses it).
- Input: arrow keys / WASD on the focused canvas (`role="application"` with instructions), on-screen pad (pointer/touch), and "Go directly to" buttons.
- Exits: "Skip to content" button and Esc → standard layout, `#main` focused; "Enter 3D world" button to come back.
- `prefers-reduced-motion: reduce` → never opens; standard layout only.
- Zone labels are HTML (crisp text, real contrast), positioned each frame without React re-renders.

## Layout
Shared sections (UI round 1), styled in `themes/3d-world/world.css`. Searches:
- `"immersive 3d interactive" --domain landing` verified Immersive/Interactive Experience. Applied: a skip option and a non-3D fallback, which the World section already provides, and focus kept on the content. The full-screen-first section order is not repeated on the page.
- `"3d depth spatial" --domain style` verified **Dimensional Layering**: an elevation scale, layered cards and spatial hierarchy. Rejected: translateZ, parallax and backdrop blur, for the same performance budget as the World and so nothing moves on the page.
- ux `"depth layering elevation"`: Depth Layering applied as z-offset elevation. Glass material rejected: blur over a flat dark ground adds cost and no visible depth.

Rules:
- Elevation scale from tokens: e1 (tiles and role plates) and e2 (case studies, kits and the stack). Each level has a top-light inset line (text at 10%) and shadows drawn from `--bg` mixed toward black.
- Eyebrows are glowing zone pads: an accent diamond with a soft glow, echoing the world's floor pads.
- Case studies and kits are top-lit raised panels (a surface2 → surface gradient). The metrics sit recessed in a `--bg` well.
- Hero numbers are separate floating tiles. The highlighted number stands on a glowing pad (an accent ring plus a glow).
- Experience: each role is a raised bgAlt plate, and the stack is the highest panel.
- The contact actions stand on a glowing pad.
- Text always sits on solid token grounds (surface, surface2, bgAlt, bg), so the contrast that the registry tests check still holds. The glows are decoration only.
