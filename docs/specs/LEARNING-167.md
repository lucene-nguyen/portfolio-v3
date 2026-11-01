# Round 2: Contact form (LEARNING-167)

Status: Approved (self-approved, autonomous mode; low-risk showcase site)

## Goal
Recruiters and clients can reach the owner from the page itself, choose the kind of collaboration, and know their message got through. No budget field.

## Scope
- Contact copy (owner, verbatim):
  - Headline: "Need a fullstack engineer on your team, full-time or part-time? I'd love to hear about it."
  - Subline: "Have a web app project instead? Send me a brief."
- Direct contact: manhcuongmvc@gmail.com, and Zalo 0339696831 linking to https://zalo.me/0339696831. GitHub and LinkedIn stay.
- Form fields:
  - **Name**: required, up to 100 characters.
  - **Email**: required and valid, up to 254 characters.
  - **Collaboration type**: a radio group of Full-time, Part-time, Freelance project or Consulting, required. It is preselected from `?type=` (set by the Work with me CTAs).
  - **Description and timeline**: required, 20–4,000 characters.
  - **Phone or Zalo**: optional, digits with `+`, spaces, `().-`, 7–20 characters.
- Server Action with `useActionState`. It works without JavaScript and validates on the server: `lib/contact.ts` is pure and unit-tested.
- Errors appear inline under each field (`aria-invalid` and `aria-describedby`), plus an error summary. Focus moves to the summary after a failed submit. Success is announced in a `role="status"` message and the form is cleared. Send failures and rate limits show in a `role="alert"` message that includes the direct email.
- Abuse protection:
  - **Honeypot**: a hidden "website" field. When it is filled, the action reports success but nothing is stored or sent.
  - **Rate limit**: the existing limiter (`getLimiter()`, fixed window, key `rl:contact:<hashed IP>`), the same IP hashing as `/api/ping`.
- Delivery:
  - Every accepted message is logged: the full message outside production, only id and type in production.
  - It is stored in Redis list `contact:messages` (newest 500), or in memory when Upstash isn't configured.
  - It is emailed through the Resend HTTP API only when `RESEND_API_KEY` is set (added to `.env.example`); no SDK dependency. A Resend failure doesn't lose the message, which is already stored.
- Copy for labels, hints and messages was written with design:ux-copy. The form was checked with design:accessibility-review.

## Acceptance criteria
- AC1: The contact section shows the new headline, subline, email, Zalo link and the form, in every theme.
- AC2: An empty or invalid submit shows inline errors for each invalid field and an error summary that receives focus. Valid input is kept.
- AC3: A valid submit shows a success status, stores the message (memory locally) and clears the form.
- AC4: A filled honeypot shows success but stores nothing. Going over the rate limit shows an alert with the direct email.
- AC5: `?type=consulting` preselects Consulting. Each Work with me CTA preselects its type.
- AC6: No budget field. Resend is called only when `RESEND_API_KEY` is set (unit test with a mocked fetch).
- AC7: The form works with JavaScript disabled (server-rendered errors). axe is clean, every input has a visible label, and there is no horizontal scroll at 375px.
- AC8: lint, typecheck, unit and E2E tests pass. Screenshots are taken at 1440 and 375 for all 13 themes.
