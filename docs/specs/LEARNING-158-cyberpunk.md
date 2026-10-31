# Theme 11: Cyberpunk + HUD live lab (LEARNING-158)

Status: Approved (self-approved, autonomous mode)

## Goal
A neon HUD theme where the live lab shows requests as packets and 429s as firewall blocks.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/cyberpunk.md`.
- `themes/cyberpunk/`: tokens (magenta accent, cyan meter), chamfered frames, uppercase mono headings, static scanlines, one-shot section glitch, packet stream portalled into `#theme-slot-lab`.
- `lib/lab/events.ts`: the lab emits `lab:response` for every response; `components/theme/use-theme-slot.ts` shared by Blueprint and Cyberpunk.

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/cyberpunk.md` exists with the exact tokens.
- AC2: Neon text reaches 4.5:1 without glow (registry tests; headings have no `text-shadow`).
- AC3: Under `prefers-reduced-motion: reduce`, there are no scanlines and no glitch animation.
- AC4: A burst of 10 makes the firewall flash at most 3 times in any 1-second window.
- AC5: After a burst, the HUD shows passing packets and at least one BLOCKED packet; it is decorative (`aria-hidden`), the lab log keeps the text.
- AC6: axe clean, no horizontal scroll at 375px.
