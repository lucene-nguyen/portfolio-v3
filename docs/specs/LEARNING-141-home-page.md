# Home page from the approved mockup (LEARNING-141)

Status: Approved (self-approved, autonomous mode)

## Goal
The home page as designed in the approved mockup ("Cuong Nguyen Portfolio" canvas, design system "Portfolio v3"),
with all copy in `content/` so themes and later tasks reuse it.

## Scope
- Sections: nav, hero (avatar + key stats), case study cards, live lab intro, starter kits & labs, experience + stack, contact footer.
- All copy and facts in `content/home.ts`, copied from the owner's approved mockup. Values the mockup leaves open become `[PLACEHOLDER]`.
- Full "Portfolio v3" color set as theme tokens (`bgAlt`, `surface2`, `borderStrong`, `text2`, `textSecondary`, `warning`, `danger`).
- Nav (with theme switcher) lives in the root layout, outside `ThemeRuntime`.

## Out of scope
Interactive rate-limit panel (LEARNING-143), case study pages (LEARNING-144; cards already link to `/work/<slug>`), resume PDF.

## Acceptance criteria
- AC1: Given `/`, then sections nav, hero, work, lab, kits, experience, contact render in that order with the mockup's headings.
- AC2: Given a 375px viewport, then the document has no horizontal scroll (`scrollWidth <= clientWidth`).
- AC3: Given the default theme, then every text token used reaches ≥ 4.5:1 on its ground (registry tests) and an axe scan of `/` reports no violations.
- AC4: Given keyboard only, then every link and control is reachable by Tab and shows a visible focus ring.
- AC5: Given a production build, then Lighthouse Performance and Accessibility are ≥ 90 (checked locally with `npx lighthouse`; not in CI).
- AC6: Given `content/home.ts`, then no component contains resume facts or raw hex colors.

## Technical notes
- Server components only; `next/image` for the avatar (priority, sized).
- Section components in `components/home/`, shared bits (section header, tag) in the same folder.

## Risks
- Facts come from the owner's approved mockup, not from a repo doc; the owner should confirm them.
