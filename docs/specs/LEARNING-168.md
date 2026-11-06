# Round 2: English / Vietnamese (LEARNING-168)

Status: Approved (self-approved, autonomous mode). **The merge waits for the owner to approve the Vietnamese copy.**

## Goal
Vietnamese recruiters and clients can read the whole site in Vietnamese.

## Scope
- English stays at `/`, Vietnamese at `/vi`. Pages live under `app/[locale]` (static for both).
  - `next.config` rewrites unprefixed URLs to `/en/…`, and `/en/…` redirects back to the unprefixed URL.
  - `<html lang>` follows the locale.
  - hreflang alternates are `en`, `vi` and `x-default`. Each page has its own canonical. The sitemap lists both locales.
- All copy lives in `content/en/home.ts` and `content/vi/home.ts`, with the same shape; the type and a test enforce it.
  - Facts (names, dates, numbers, links, technologies) are identical, and a test checks them.
  - Server Components read `getContent()`, a request-scoped `server-only` store. Client components read `useContent()` from `LocaleProvider`.
  - Section links follow the locale (`/vi#skills`). The docs search index exists per locale (`/vi/search-index.json`). Contact errors come back in the form's language.
- **Language switcher**: next to the theme switcher from md up. On phones it is the first item in the menu, because the 375px header has no room. It is a real link with `hreflang`, `lang`, and an accessible name in the target language.
- Fonts add the `vietnamese` subset (Inter Tight, JetBrains Mono, Libre Bodoni).
- Every string is listed in `docs/i18n/vi-review.md` (EN | VI) for the owner.

## Out of scope / decisions for the owner
See the top of `docs/i18n/vi-review.md`: the case studies stay English, the terminal output stays English, the Pixel font has no Vietnamese glyphs, the name has diacritics, and so on.

## Acceptance criteria
- AC1: `/` renders English with `lang="en"`. `/vi` renders Vietnamese with `lang="vi"`, its own canonical and hreflang alternates.
- AC2: The switcher sits next to the theme switcher (inside the menu on phones) and swaps between `/` and `/vi`.
- AC3: All copy comes from `content/<locale>/`. The Vietnamese module has exactly the English shape and the same facts (unit test).
- AC4: On `/vi`, section links stay on `/vi`. The contact form errors and the docs search are Vietnamese. `/en` redirects to `/`.
- AC5: In every theme on `/vi`, axe is clean and there is no horizontal scroll at 375px. All English E2E tests still pass.
- AC6: `docs/i18n/vi-review.md` lists every string. **The owner approves it before merge.**
