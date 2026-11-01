# UI/UX round 1 — progress

Spec: [docs/specs/ui-round-1.md](specs/ui-round-1.md) · PR notes: [docs/prs/ui-round-1.md](prs/ui-round-1.md) · Screenshots: `docs/screenshots/<theme>/` (`npm run ui:sweep`).
Per theme (item 2): ui-ux-pro-max `--domain landing` + `--domain ux` → "## Layout" in `design-system/portfolio-v3/pages/<theme>.md` → restyle → pre-delivery checklist (`e2e/checklist.spec.ts`) → /test → /review → merge.

| Item / theme | Status | Branch |
|---|---|---|
| 3 Hide placeholders | done | `fix/ui-placeholders` |
| 1 Hero first | done | `fix/ui-hero-first` |
| 5 Mobile nav | done | `fix/ui-mobile-nav` |
| 4 Swiss grid toggle | done | `fix/ui-swiss-grid` |
| 2 blueprint | done | `fix/ui-blueprint` |
| 2 pixel | done | `fix/ui-pixel` |
| 2 cyberpunk | done | `fix/ui-cyberpunk` |
| 2 editorial | done | `fix/ui-editorial` |
| 2 night-terminal | done | `fix/ui-night-terminal` |
| 2 dashboard | done | `fix/ui-dashboard` |
| 2 ide | done | `fix/ui-ide` |
| 2 docs | done | `fix/ui-docs` |
| 2 bento | todo | `fix/ui-bento` |
| 2 neo-brutalism | todo | `fix/ui-neo-brutalism` |
| 2 anime | todo | `fix/ui-anime` |
| 2 3d-world | todo | `fix/ui-3d-world` |
| 2 swiss-minimal | todo (after 3d-world, owner OK) | `fix/ui-swiss-minimal` |

Resume: start at the first `todo` row; branch from `develop`.
