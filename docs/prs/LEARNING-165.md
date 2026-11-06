# LEARNING-165: Round 2, Skills with icons

Branch: `feat/LEARNING-165-skills` → `develop` · Spec: [docs/specs/LEARNING-165.md](../specs/LEARNING-165.md)

## What changed
- New **Skills** section (`#skills`) right after the hero. It lists the owner's groups verbatim: Frontend, Backend, Data & messaging, Cloud & DevOps, and "Also familiar with" (Go and Python, smaller and muted). It replaces `stack.json` in Experience, which is now roles only.
- Icons come from `simple-icons` (CC0, exact version pinned) and are imported per icon, so nothing is fetched at runtime. They are monochrome (`currentColor`), so they follow each theme's tokens. AWS, REST and WebSocket use neutral Lucide icons (Cloud, Braces, ArrowLeftRight). Every icon is `aria-hidden` and every skill has a visible label.
- The panel reuses `data-part="stack"`, and the chips keep the old `ul > li > span` shape, so all 13 themes' existing stack and chip restyles apply. Each theme's "## Layout" records the change.
- Skills is added to the nav, docs sidebar, IDE (`skills.json`), search index and bento tile. The eyebrows renumber to 01–04.
- The swiss print CV prints Skills as a compact four-column text list and still fits on one page (A4 and Letter).
- Fixes found on the way:
  - The dashboard's GitHub panel never let the page settle once GitHub answered an error: an unread error body kept the browser request open. The client now always reads the body, and the server's GitHub fetch gives up after 5s.
  - The square-cornered themes (swiss, neo) made the contact avatar square. It is now round everywhere, as the owner asked.

## Tests
- New `e2e/skills.spec.ts`:
  - every group and label in order, with icons (generic where specified) and secondary styling;
  - exactly one stack panel, inside Skills;
  - the nav link and the search entry;
  - per theme at 375px: labels on one line, no horizontal scroll, axe clean;
  - theme chip styles still apply (pixel, editorial), the secondary heading stays muted, and the panel spans the section.
- Home order test updated. 228 E2E pass and 16 skip (parked features, LEARNING-164). Unit tests pass.
- The pre-delivery checklist passes for all 13 themes. Screenshots for all 13 themes at 1440 and 375 are in `docs/screenshots/<theme>/`.

## ui-ux-pro-max
- `"skills showcase logos grid" --domain landing`: Feature-Rich Showcase / Bento Grid Showcase verified (scannable groups, a stack on mobile, no hover-only info).
- `"icon with text label" --domain ux`: Compact Label Overflow verified, so chip labels never wrap (nowrap, and tested).

## Review
CHANGES REQUESTED, then fixed:
- **Blocker:** six themes' chip rules (`[data-part="stack"] ul span`) stopped matching bare `<li>` chips. The chips now render as spans inside `<li>`, and the pixel and editorial styling is checked by tests.
- **Shoulds fixed:**
  - the anime/neo/swiss stack-heading rules no longer restyle the muted secondary heading;
  - the panel stretches full width in themes with `align-self: flex-start`;
  - a test now asserts the secondary heading colour.
