# Round 3: Lock themes to Night terminal (LEARNING-184)

Status: Approved (self-approved, autonomous mode)

## Goal
Show one finished theme (Night terminal) while keeping the other twelve in the codebase, ready to come back.

## Scope
- `features.themes` (`NEXT_PUBLIC_FEATURE_THEMES`, off by default). `themes/registry.ts` exports `activeThemes`, which is all themes when on and only the default when off.
- While locked:
  - The head script only accepts active ids, so `?theme=<id>` and a saved choice fall back to Night terminal before first paint.
  - There is no theme switcher.
  - The terminal's `theme` command lists and accepts only active themes.
  - Only the active theme's CSS variables are inlined.
- The theme code, its tests and the design rules stay. While locked, the other themes' E2E spec files are ignored (`playwright.config.ts`), and the shared per-theme loops use `activeThemes`.
- The flag is documented in `.env.example` and `CLAUDE.md`.

## Acceptance criteria
- AC1: Off: `/?theme=pixel` renders Night terminal, a saved "editorial" is ignored, there is no switcher, and `theme pixel` in the terminal is unknown.
- AC2: On: all 13 themes work as before. The full E2E suite passes with the flag on (237 tests, the same count as before this change).
- AC3: lint, typecheck, unit and E2E tests pass with the flag off.
