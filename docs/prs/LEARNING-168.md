# LEARNING-168: Round 2, English / Vietnamese

Branch: `feat/LEARNING-168-i18n` → `develop` · Spec: [docs/specs/LEARNING-168.md](../specs/LEARNING-168.md) · **Vietnamese copy approved by the owner (2026-11-06):** [docs/i18n/vi-review.md](../i18n/vi-review.md).

## What changed
- **Routing**: `/` is English and `/vi` is Vietnamese.
  - Pages live under `app/[locale]` and are static for both locales.
  - `next.config` rewrites (`afterFiles`, so public files like `/avatar.jpg` are served first) and `/en` → `/` redirects.
  - `<html lang>` follows the locale. Each page has its own canonical, hreflang alternates (`en`, `vi`, `x-default`), and sitemap alternates both ways.
- **Content**:
  - `content/en/home.ts` and `content/vi/home.ts` are typed against the same shape.
  - Server Components read `getContent()`, a request-scoped, `server-only` store. Client components read `useContent()` from `LocaleProvider`.
  - Module-level copy (bento tiles, blueprint nodes, manga chapters, sticker board, IDE files, docs links, terminal context) is now built from the active locale.
  - Section links stay inside the locale (`/vi#skills`). The search index is per locale. Contact errors come back in the form's language.
- **Language switcher**: next to the theme switcher from 768px up, and first in the menu on phones (the 375px header has no room). It is a real link with `hreflang` and `lang`, and its accessible name is in the target language.
- **Fonts**: the `vietnamese` subset is added for Inter Tight, JetBrains Mono and Libre Bodoni.
- **Vietnamese copy**: drafted by the implementer, 383 strings, all listed EN | VI in the review doc. The decisions for the owner are at its top.
  - Sample screenshots are in `docs/screenshots/i18n/`.

## Tests
- **Unit**:
  - the Vietnamese module has exactly the English shape;
  - facts are identical (links, dates, companies, technologies, ids);
  - every string keeps the same numbers;
  - the IDE files point at `/vi`.
- **E2E** (`e2e/i18n.spec.ts`):
  - lang, canonical and hreflang;
  - the switcher both ways;
  - `/vi` links stay on `/vi`, and `/en` redirects;
  - Vietnamese contact errors and the Vietnamese search index;
  - the avatar loads in both locales;
  - Vietnamese chrome labels;
  - all 13 themes on `/vi`: axe clean and no horizontal scroll at 375px.
- **Totals**: 257 E2E pass and 16 skip (parked features). 275 unit tests pass. Lint and typecheck are clean.

## ui-ux-pro-max
- `"language switcher locale" --domain ux` and `"multilingual navigation" --domain landing` returned no verified match. The switcher follows WCAG instead: 3.1.2 (language of parts, via `lang`), the accessible name in the target language, a 44px target, and the global focus ring.

## Review
CHANGES REQUESTED, then fixed:
- **Blocker:** the catch-all rewrite ran before `/public`, so `/avatar.jpg` returned 404. The rewrite moved to `afterFiles`, and an E2E test now checks that the avatar loads.
- **Shoulds:**
  - the theme switcher label and announcement, and the nav name, are localized;
  - the search index section names are localized;
  - the sitemap lists hreflang alternates both ways;
  - a number-parity test runs over every string.
- **Nits left for later** (listed in the review doc): the OG alt text, a localized 404 page, the terminal "Command line" label.

## Round 3: approval, rebase, fixes
- Rebased onto `develop` after LEARNING-184 (theme lock) and LEARNING-183 (full experience), as one commit. The conflicts were resolved by keeping both sides:
  - the layout uses `activeThemes` and the moved stylesheet path;
  - the nav keeps the language link and hides the switcher while themes are locked; with the switcher gone, the language link fits in the header on phones too;
  - the experience section reads `getContent()` and keeps 183's tags and labels;
  - the terminal builds its context per locale from `activeThemes`.
- Owner decisions applied:
  - name "Nguyễn Mạnh Cường";
  - English tech terms kept;
  - case studies, the terminal and the Experience bullets stay English (`/vi` reuses the English experience and translates only its headings: "Những nơi tôi đã làm việc", "Chứng chỉ");
  - all eleven wording fixes in `content/vi/home.ts`.
- New Vietnamese strings since approval: "Tải CV" and "(mở trong thẻ mới)", flagged in the review doc.
- Unit tests alias `server-only` to an empty module (`vitest.server-only.ts`); Next still enforces it in the build.
- Found by running the full suite with themes unlocked: two regressions from LEARNING-183 in locked themes, now fixed.
  - Cyberpunk's section-entry glitch never fired on the now very tall Experience. The observer now fires when a section crosses the middle of the screen.
  - Swiss's print CV grew to two pages. It is now an overview (bullets and tags hidden; each project on one line), and Download CV has everything.
- Tests:
  - Locked: 65 E2E pass and 14 skip. 280 unit tests pass.
  - Unlocked: 256 of 257 passed, with 17 skipped. The remaining failure was Swiss's one-page CV on Letter paper; after the one-line print fix, the Swiss and cyberpunk specs pass in full (13 tests).
  - The review's Should was fixed: the "Vietnamese links stay on /vi" test now finds the Vietnamese nav and asserts links exist; before, it passed without checking anything.
- **Open question for the owner:** `profile.siteDescription` (meta description) still says "xây dựng ứng dụng web trọn vẹn", while `hero.lead` now says "từ đầu đến cuối". It was left as is because it wasn't in the requested fixes.
