# LEARNING-168: Round 2, English / Vietnamese

Branch: `feat/LEARNING-168-i18n` → `develop` · Spec: [docs/specs/LEARNING-168.md](../specs/LEARNING-168.md) · **Not merged: waiting for the owner to approve [docs/i18n/vi-review.md](../i18n/vi-review.md).**

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
