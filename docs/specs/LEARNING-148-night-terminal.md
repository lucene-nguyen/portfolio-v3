# Theme 01: Night terminal (default) + command bar (LEARNING-148)

Status: Approved (self-approved, autonomous mode)

## Goal
Make the default theme feel like a terminal: "Portfolio v3" tokens plus a command bar that navigates the site.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/MASTER.md` + `pages/night-terminal.md` (reconciled with the owner's tokens).
- Command engine `lib/terminal/commands.ts` (pure): `help`, `ls projects`, `cat resume`, `open <slug>`, `theme [id]`, `contact`, `clear`; Tab completion.
- `themes/night-terminal/command-bar.tsx`, a lazy theme feature: floating "Terminal" button + native `<dialog>`; `/` and Ctrl/Cmd+K open it; ↑/↓ history.

## Out of scope
Case study pages (LEARNING-144): `open` navigates to `/work/<slug>`, which exists after that task.

## Acceptance criteria
- AC1: Given the repo, then `design-system/portfolio-v3/pages/night-terminal.md` exists and lists the theme's exact tokens.
- AC2: Given the home page, when the visitor presses `/` (outside a text field) or Ctrl+K, then the command line opens with the input focused; Esc closes it and focus returns to where it was.
- AC3: Given the command line, when typing `th`+Tab, then the input becomes `theme `; ↑ recalls the previous command.
- AC4: Given commands `ls projects`, `cat resume`, `theme`, `help`, then output appears in a `role="log"` region; unknown commands print an `error:` line.
- AC5: Given `contact`, `open <slug>` or `theme <id>`, then the visitor is taken to `/#contact`, `/work/<slug>`, or the theme changes. Each has a normal-link equivalent on the page (contact section, case study cards, theme switcher).
- AC6: Given a 375px viewport, then only a "Terminal" button shows (no docked bar), it opens the command line, and there is no horizontal scroll.
- AC7: Given the open command line, then axe reports no violations and focused controls show the accent focus ring.

## Technical notes
- The command bar loads only while Night terminal is active (theme engine `features`).
- Context (projects, resume, contact) comes from `content/home.ts`; no facts in the component.

## Risks
- `/` and Ctrl+K are also planned for the Docs theme's search; only one theme is active, so no conflict.
