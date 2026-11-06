# feat(seo): metadata, sitemap and OG images (LEARNING-145)

Jira: LEARNING-145 · Spec: [docs/specs/LEARNING-145-seo.md](../specs/LEARNING-145-seo.md)

## Summary
- `lib/site.ts`: canonical URL from `NEXT_PUBLIC_SITE_URL` → Vercel's `VERCEL_PROJECT_PRODUCTION_URL` → localhost; shared Open Graph base.
- Metadata API: default/template titles, description from `content/`, canonical + `og:url` per page (home canonical set on the home page only), Open Graph `website`/`article` (+ authors), Twitter `summary_large_image`.
- `app/sitemap.ts` (home + all case studies), `app/robots.ts` (allow, disallow `/api/`, sitemap link).
- `next/og` images for home and each case study (1200×630 PNG, prerendered at build, default-theme tokens via `lib/og.tsx`).

## Test infrastructure (outside the feature, included here)
- E2E now runs against a production build locally too (as in CI); `E2E_DEV=1` keeps the dev server for quick iteration. The dev server compiled routes on demand and caused intermittent timeouts across the ~110-test suite. Two consecutive full runs: 111/111.
- `e2e/pixel.spec.ts`: wait for the case-study read to be recorded before navigating away (real race).

## Owner action
Set `NEXT_PUBLIC_SITE_URL` (with `https://`) for Production once the domain is known.

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 per-page title/description/canonical | `e2e/seo.spec.ts` | pass |
| AC2 sitemap + robots | `e2e/seo.spec.ts` | pass |
| AC3 OG images 1200×630 PNG | `e2e/seo.spec.ts` (PNG header), build output | pass |
| site URL fallback | `lib/site.test.ts` | pass |

## Review
APPROVE, no Blockers. Fixed: canonical no longer inherited by other pages, `og:site_name`/`og:locale` kept on case studies, `og:url` everywhere, article authors, env URL note. Follow-up (not done): per-study OG image alt text needs `generateImageMetadata` (changes image URLs).
