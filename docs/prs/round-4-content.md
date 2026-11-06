# Round 4: owner content changes

Branch: `feat/round-4-content` → `develop` · Spec: [docs/specs/round-4-content.md](../specs/round-4-content.md)

## What changed
- **Hero stats**: three tiles instead of four.
  - 5+ yrs.
  - **AWS** Certified Developer – Associate (DVA-C02), linked to Credly.
  - **Udacity** Cloud Developer, linked to Udacity.

  The URLs come from the resume and are shared with Experience through one `certificates` constant. The links open in a new tab, and their accessible name includes "(opens in a new tab)". "2,500+ stores" and "300→20ms" are now only in Experience.
- **Education & Certifications** ("Học vấn & Chứng chỉ") opens with the UIT education line, in EN and VI.
- **Work with me** is parked behind `NEXT_PUBLIC_FEATURE_WORK_WITH_ME` (off; the code stays).
  - It leaves the page, nav, docs sidebar, IDE files and search index, and the eyebrows renumber.
  - The hero CTA is now "Contact me" / "Liên hệ với tôi" → `#contact`.
  - The contact form keeps all four types and the "web app project" subline.
- The CV link is "View CV" / "Xem CV". The VI site description now says "từ đầu đến cuối".
- `docs/i18n/vi-review.md` is regenerated. The flag is documented in `.env.example` and `CLAUDE.md`.
- Screenshots: Night terminal, EN (`docs/screenshots/night-terminal/`) and VI (`docs/screenshots/i18n/`), at 1440 and 375.

## Tests
- Hero: three stats, certificate links (href, new tab, `rel`, accessible name), and the numbers still present in Experience.
- Education EN and VI; no `work-with-me` link on `/`, `/vi` or in either search index; all contact types kept; the VI CTA and CV label.
- The Work with me spec and the CTA preselection skip while the section is parked.
- Full suite: 65 E2E pass and 17 skip. 280 unit tests pass. Lint and typecheck are clean.
- With themes unlocked, the 3d-world, cyberpunk and bento specs pass (18).

## Review
REQUEST CHANGES, then fixed:
- **Blockers**, which only showed with themes unlocked:
  - 3d-world's highlighted-stat rule and its test lost their hook. The linked certificate tiles now carry `data-highlight`.
  - Cyberpunk's accent rule and its test targeted `dd.text-accent`. They now use `dd:not(:has(a))` and `dd a`.
- **Shoulds:** bento's stats tile links the certificates too (one column for three stats), and `href` is optional instead of `""`.
- **Nits:** the stale "Download CV" comment is fixed, a reformat-only test change was reverted, and the no-link check now also covers `/vi` and the search indexes.
- **Kept on purpose:** `aria-label` on the stat links. The name starts with the visible "AWS"/"Udacity" (WCAG 2.5.3) and is more descriptive than "AWS (opens in a new tab)".
