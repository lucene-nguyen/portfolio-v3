# LEARNING-167: Round 2, Contact form

Branch: `feat/LEARNING-167-contact-form` → `develop` · Spec: [docs/specs/LEARNING-167.md](../specs/LEARNING-167.md)

## What changed
- **Contact copy** (verbatim from the owner):
  - "Need a fullstack engineer on your team, full-time or part-time? I'd love to hear about it."
  - "Have a web app project instead? Send me a brief."
  - Direct contacts: email, plus **Zalo 0339696831** (https://zalo.me/0339696831), GitHub and LinkedIn.
- **Form**: name, email, collaboration type (radio group: Full-time / Part-time / Freelance project / Consulting), description + timeline, and an optional phone/Zalo field. There is no budget field. The type is preselected from `?type=` (the Work with me CTAs).
- **Server Action**:
  - Built on `useActionState`, so it works without JavaScript.
  - Validation is server-side and pure: `lib/contact.ts`. Names must be one line because they go into the email subject.
  - Errors are shown inline, with a focusable summary whose links move focus to each field. Success is announced in `role="status"`; a limit or failure appears in `role="alert"` with the direct email.
- **Abuse protection**:
  - A honeypot with an unlikely field name, hidden from people and assistive tech. Hits are counted in the log and nothing else happens.
  - The existing limiter, with its own contact limit of 3 per 10 minutes per hashed IP (`hit(algo, key, limits?)`; the lab keeps 5 per 5s). The hashed-IP helper is shared with `/api/ping` (`lib/rate-limit/visitor.ts`).
- **Delivery**:
  - Every message is stored first, in Redis list `contact:messages` (newest 500) or in memory locally.
  - It is logged with the full text in dev and previews, and only id and type in production.
  - It is emailed through the Resend HTTP API only when `RESEND_API_KEY` is set (added to `.env.example`, with optional `RESEND_FROM`); no SDK. A mail failure never loses a stored message.
  - Production without Upstash fails loudly, the same way the limiter does.

## Skills
- **design:ux-copy**: labels, hint, error messages (what's wrong + how to fix), and the success and failure messages.
- **design:accessibility-review**: one finding. Night-terminal's `borderStrong` is about 1.5:1 against its grounds, which fails WCAG 1.4.11 for input borders. Form controls now use `text-subtle` (≥ 4.5:1 in every theme, the same as the theme switcher).
  - Also checked: labels, fieldset/legend, `aria-describedby` for hints and errors, focus management, live regions present from the first render, 44px targets, and `danger` text (already contrast-tested on every ground).
- **ui-ux-pro-max**:
  - `"contact form lead capture" --domain landing`: Lead Magnet + Form (minimal fields, visible progress, so "Sending…").
  - `"inline validation error summary" --domain ux`: Focusable Error Summary and Error Placement applied. Validate-on-blur was skipped on purpose, so the form behaves the same without JS.
  - Each theme's "## Layout" records this.

## Tests
- **Unit**: validation (every rule, no budget field, one-line names), delivery (Resend only with the key; stored before mailing), the action (the honeypot never reaches the limiter or the store; invalid input stops early; the limit and limiter failure keep the values), and the fixed window's own limits.
- **E2E** (`e2e/contact.spec.ts`):
  - copy, email and Zalo;
  - inline errors with a focused summary and axe clean;
  - success that clears the form;
  - the honeypot;
  - the rate-limit alert;
  - the `?type=` preselect from the URL and from a CTA;
  - the no-JS server-rendered errors.
- Results: 237 E2E pass and 16 skip (parked features). The pre-delivery checklist passes for all 13 themes. Screenshots for all 13 themes at 1440 and 375 are in `docs/screenshots/<theme>/`. The UI sweep now loads lazy images before full-page shots.

## Review
CHANGES REQUESTED, then fixed:
- **Blocker:** the shared 5-per-5s lab limit allowed about 3,600 messages per hour. The form now has its own 3-per-10-minutes limit, and the copy names the real wait.
- **Shoulds:**
  - control characters are rejected in names;
  - the action has unit tests;
  - preview logs keep the message text, and production requires Redis;
  - the honeypot uses an unlikely field name and hits are counted;
  - `aria-invalid` stays on the fieldset only (the radio role doesn't support it);
  - summary links move focus;
  - ids are prefixed with `contact-`;
  - the alert region is `sr-only` while empty.
