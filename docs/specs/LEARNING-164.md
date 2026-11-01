# Round 2: home structure and copy (LEARNING-164)

Status: Approved (self-approved, autonomous mode; low-risk showcase site)

## Goal
Reposition the home page for recruiters first and web-app clients second. Lead with the person and their experience, and park the case studies and the live lab behind a feature flag (the code stays).

## Scope
- `lib/features.ts`: `features.caseStudies` and `features.lab`. Both are off unless `NEXT_PUBLIC_FEATURE_CASE_STUDIES=on` / `NEXT_PUBLIC_FEATURE_LAB=on`.
- Home order in every theme: Hero → Skills (LEARNING-165) → Experience → Starter kits & labs → Work with me (LEARNING-166) → Contact. This item ships Hero → Experience → Starter kits & labs → Contact; the later items slot their sections in.
- Hero copy (owner-provided, verbatim):
  - H1: "I build web products that bring real value to users and businesses."
  - Subline: "My goal is to become an expert in web development, so I keep learning and improving every day."
  - Bio: "Fullstack Software Engineer with 5+ years building web apps end to end — React and Next.js on the front end, Node.js and NestJS APIs on the back end, PostgreSQL, MongoDB and Redis for data, and AWS to run it in production."
  - CTAs: "See my experience" (primary, `#experience`), "Work with me" (secondary, `#work-with-me`; it points to `#contact` until LEARNING-166 lands). The resume link is hidden while `resumeUrl` is a placeholder.
- Nav logo text is "Cuong Nguyen". The avatar leaves the hero; a small round avatar sits on the right of the contact/footer area.
- With the flags off:
  - Home has no case studies or lab section.
  - There are no nav links, sitemap entries, search-index entries, docs sidebar links, IDE files, terminal `ls/open projects`, blueprint project nodes, bento tiles or 3D zones for case studies or the lab.
  - `/work/<slug>` still renders but carries `robots: noindex`.
  - Theme extras tied to the lab or case studies are hidden: the dashboard live-traffic panel, the pixel mana bar and its lab/case-study achievements, and the cyberpunk HUD lab.
  - Blueprint's system map uses experience and starter-kit nodes. Neo-brutalism's sticker board filters the starter kits by technology. The 3D world's zones are Experience, Starter kits and Contact.
- Turning the flags on restores today's behaviour.

## Acceptance criteria
- AC1: In every theme, the home sections appear in the order hero → experience → kits → contact, and `#work` / `#lab` are absent.
- AC2: The hero shows the new H1, subline, bio and both CTAs. There is no avatar in the hero and no resume link while it is a placeholder.
- AC3: The nav logo reads "Cuong Nguyen", and a round avatar appears in the contact area.
- AC4: No link on the home page or in any theme points to `/work/…`, `#work` or `#lab`. The sitemap and search index have no case-study or lab entries.
- AC5: `/work/<slug>` responds 200 with `<meta name="robots" content="noindex">`.
- AC6: The theme extras behave as listed in the scope.
- AC7: lint, typecheck, unit and E2E tests pass. The pre-delivery checklist still passes for all 13 themes. Screenshots are taken at 1440 and 375 for all 13 themes.

## Out of scope
Skills (LEARNING-165), Work with me (LEARNING-166), the contact form (LEARNING-167) and i18n (LEARNING-168).

## Risks
- Many theme tests exercise case studies or the lab. Each one is either rewritten for the new content or run with the flags on (env in the Playwright config is not used; tests that need the feature are skipped while it is off, with a note).
