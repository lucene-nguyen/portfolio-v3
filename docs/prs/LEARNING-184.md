# LEARNING-184: Round 3, lock themes to Night terminal

Branch: `feat/LEARNING-184-theme-lock` → `develop` · Spec: [docs/specs/LEARNING-184.md](../specs/LEARNING-184.md)

## What changed
- New flag `NEXT_PUBLIC_FEATURE_THEMES`, off by default, documented in `.env.example` and `CLAUDE.md`. Off means Night terminal only. On brings all 13 themes back unchanged.
- `themes/registry.ts` exports `activeThemes`, the single source of truth, used by:
  - the head script: `?theme=` and a saved choice fall back to Night terminal before first paint;
  - the inlined theme CSS;
  - `setTheme`: locked ids are refused from any caller;
  - the terminal: with one theme, the `theme` command and its help line don't exist.
- The theme switcher isn't rendered while locked.
- All theme code, tests and design rules stay. While locked, `playwright.config.ts` ignores the other themes' spec files. Shared per-theme loops use `activeThemes`, and theme-specific tests in shared specs skip with "themes locked (LEARNING-184)".

## Tests
- Flag off: 58 E2E pass and 14 skip. A new lock test covers `?theme=pixel`, a saved theme, no switcher, and no terminal `theme` command.
- Flag on: the full suite passes with 237 tests, the same count as before.
- Unit tests pass in both states (271), including a new terminal test with a single theme.

## Review
APPROVE. Shoulds applied: no `theme` command while locked, and `setTheme` guards against locked ids. Nit applied: the spec-file regex is anchored.
Left as is: the locked themes' static CSS is still bundled. It's inert and goes away by itself if the themes are ever removed.
