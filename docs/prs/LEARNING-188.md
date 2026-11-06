# LEARNING-188: Visitors send the contact message from their own mailbox

Branch: `feat/LEARNING-188-mail-compose` → `develop` · Spec: [docs/specs/LEARNING-188.md](../specs/LEARNING-188.md)

## What changed
- The form keeps the same fields and validates in the browser with the same `validate()` rules: inline errors and a focused summary. "Send message" then opens an accessible panel (native `<dialog>`, EN/VI) containing:
  - a read-only preview: To, Subject (`[Portfolio] <type> — <name>`), every field labelled (an empty phone is left out), then the message with its line breaks;
  - **Open in Gmail** and **Open in Outlook**, which open in a new tab;
  - **Default email app** (`mailto:` with CRLF line breaks);
  - **Copy message**, which copies exactly the preview text and announces "Copied" (or a fallback hint if copying fails).
- When any link passes roughly 2,000 characters, the panel suggests Copy, because some mail apps cut long drafts off.
- `lib/mail-compose.ts` is pure: it builds every part with `encodeURIComponent`, and the labels follow the page language.
- The message is capped at 1,500 characters (`MESSAGE_MAX`), with a visible counter.
- Without JS, the form posts as plain text to a `mailto:` link, so the browser opens the mail app with the fields, and nothing lands in a URL or a server log.
- Parked behind `NEXT_PUBLIC_FEATURE_CONTACT_SERVER` (off):
  - the server delivery (Server Action, Redis store, Resend); the action refuses requests while the flag is off;
  - the lab APIs (`/api/ping`, `/api/stats`), which answer 404 while the lab is parked.

  The code and tests stay; the tests are skipped while their flag is off.
- As a result, Production needs only `NEXT_PUBLIC_SITE_URL`. `docs/deploy.md`, `.env.example`, `CLAUDE.md` and `docs/i18n/vi-review.md` are updated.

## Tests
- Unit:
  - the generator: EN, VI, empty phone, line breaks, exact link encoding, and a 1,500-character Vietnamese message that sets the long flag;
  - `lib/prod-env.test.tsx`: renders every home section and the form with `NODE_ENV`/`VERCEL_ENV=production` and an empty env, and proves the env is empty (the guards would throw);
  - the ping API answers 404 without touching Redis while the lab is parked.
- E2E:
  - empty required fields show the errors and no panel;
  - the panel preview text and the exact Gmail, Outlook and mailto hrefs (no external site is opened);
  - Copy, with the clipboard compared after normalizing line endings (Windows stores CRLF);
  - Esc, and the Close button, which doesn't re-submit;
  - axe on the dialog;
  - the Vietnamese panel.
- Full suite: 279 unit tests pass (16 skipped). 63 E2E pass (22 skipped). With the server and lab flags on, the server-path units pass.
- Screenshots: Night terminal, EN and VI, at 1440 and 375.

## Review
REQUEST CHANGES, then fixed:
- **Blocker:** the panel's `<form method="dialog">` was nested inside the contact form. The panel now renders outside the form, Close is a plain button, and an E2E test covers it.
- **Shoulds:**
  - the no-JS submit uses `mailto:` with `text/plain` POST, so no data goes into a URL;
  - the long-link hint is shown, with a unit test;
  - the prod-env test asserts the env is truly empty;
  - the lab APIs are gated (404), so `deploy.md` is accurate.
- **Not done:** the counter doesn't count text the browser restores into the field (a lint rule forbids setting state in that effect; minor).
