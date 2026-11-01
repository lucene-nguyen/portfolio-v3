# SEO: metadata, sitemap and OG images (LEARNING-145)

Status: Approved (self-approved, autonomous mode)

## Goal
Every page has accurate metadata, the site is crawlable, and links share with a branded preview card.

## Scope
- `lib/site.ts`: canonical URL from `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`.
- Root layout: `metadataBase`, default + template title, description (from `content/`), canonical, Open Graph (website), Twitter `summary_large_image`.
- Case studies: `generateMetadata` with title, description, canonical, Open Graph `article`.
- `app/sitemap.ts`, `app/robots.ts` (allow all, disallow `/api/`, sitemap link).
- `next/og` images: `app/opengraph-image.tsx` (home) and `app/work/[slug]/opengraph-image.tsx` (each case study), 1200×630, default-theme tokens (`lib/og.tsx`).

## Acceptance criteria
- AC1: Home and each case study have their own `<title>`, meta description and canonical URL via the Metadata API.
- AC2: `/sitemap.xml` lists `/` and every `/work/<slug>`; `/robots.txt` allows crawling, disallows `/api/` and links the sitemap.
- AC3: Home and each case study expose an `og:image` generated with `next/og` (PNG, 1200×630).

## Owner action
Set `NEXT_PUBLIC_SITE_URL` once the production domain (custom or Vercel) is known; until then Vercel's production URL is used automatically.
