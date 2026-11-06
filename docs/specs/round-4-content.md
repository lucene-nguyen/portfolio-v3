# Round 4: owner content changes (feat/round-4-content)

Status: Approved (self-approved, autonomous mode)

## Scope
1. **Hero stats**: three tiles instead of four.
   - "5+ yrs" (unchanged).
   - "AWS · Certified Developer – Associate (DVA-C02)", linking to the Credly URL.
   - "Udacity · Cloud Developer", linking to the Udacity certificate URL.

   The URLs come from `docs/resume/resume-source.txt` and are shared with Experience › Certifications (one constant). The links open in a new tab (`rel="noopener noreferrer"`), and their accessible name includes "(opens in a new tab)". "2,500+ stores" and "300→20ms" leave the hero but stay in Experience.
2. **Education**: the Certifications block becomes "Education & Certifications" ("Học vấn & Chứng chỉ") and starts with the owner's education line, in EN and in VI.
3. **Work with me** is parked behind `NEXT_PUBLIC_FEATURE_WORK_WITH_ME` (off by default; the code stays).
   - It leaves the page, the nav, the docs sidebar, the IDE files and the search index. Eyebrows renumber.
   - The hero's secondary CTA becomes "Contact me" ("Liên hệ với tôi") → `#contact`. With the flag on, it is "Work with me" again.
   - The contact form keeps its four collaboration types, `?type=` preselection and the "web app project" subline.
4. **Round-3 follow-up**:
   - VI `profile.siteDescription` "trọn vẹn" → "từ đầu đến cuối".
   - The CV link is labelled "View CV" / "Xem CV" (it opens the Drive viewer).
5. Tests, `docs/i18n/vi-review.md`, and Night terminal screenshots (EN and VI, 1440 and 375).

## Acceptance criteria
- AC1: The hero has exactly three stats. The two certificate stats link to the resume URLs in a new tab, with "(opens in a new tab)" in their accessible name.
- AC2: Experience ends with "Education & Certifications": the education line followed by both certificates (EN and VI strings as given).
- AC3: With the flag off, there is no `#work-with-me` and no link to it anywhere. The hero CTA "Contact me" goes to `#contact`, and the contact form still offers all four types.
- AC4: The VI site description and the "View CV" / "Xem CV" label are as given.
- AC5: Related tests pass during the work, and the full suite passes before merge.
