# Visitors send the contact message from their own mailbox (LEARNING-188)

Status: Approved (self-approved, autonomous mode). Owner decision: visitors keep a copy in their Sent folder.

## Scope
- Same form fields, validated in the browser with the existing inline errors and error summary (the same `validate()` rules).
- **"Send message"** opens an accessible modal panel (native `<dialog>`, EN/VI) containing:
  - a read-only preview: To, Subject, every field labelled (an empty optional phone is left out), then the message with its line breaks;
  - **Gmail**: `https://mail.google.com/mail/?view=cm&fs=1&to=…&su=…&body=…` (new tab);
  - **Outlook**: `https://outlook.live.com/mail/0/deeplink/compose?to=…&subject=…&body=…` (new tab);
  - **Default email app**: `mailto:` (line breaks encoded as CRLF);
  - **Copy message**: copies exactly the preview text, including To and Subject, and shows "Copied".
- To: `manhcuongmvc@gmail.com`. Subject: `[Portfolio] <type> — <name>`, with the type label in the page's language. All parts are URL-encoded with `encodeURIComponent`.
- The message is capped at 1,500 characters with a visible counter. The cap is one constant shared by the textarea, validation and the copy.
- The server delivery (Server Action, Redis store, Resend) is parked behind `NEXT_PUBLIC_FEATURE_CONTACT_SERVER` (off). The code and tests stay, and the tests are skipped while the flag is off. With the flag off, the action refuses requests.
- With the flag off, Production needs no Upstash, `RL_SALT`, `REDIS_KEY_PREFIX` or Resend. The guards stay lazy (they are only read at request time on parked paths).
- Docs: `docs/deploy.md` (the only required Production variable is `NEXT_PUBLIC_SITE_URL`), `.env.example`, `CLAUDE.md` and `docs/i18n/vi-review.md`.

## Acceptance criteria
- AC1: Submitting with empty required fields shows the inline errors and the focused summary, and no panel opens.
- AC2: Submitting valid input opens the panel. The preview matches the generated text, and the Gmail, Outlook and `mailto:` hrefs are exactly the encoded URLs.
- AC3: Copy puts the full preview text on the clipboard and announces "Copied".
- AC4: The generator is unit-tested in EN and VI, with an empty phone and with line breaks.
- AC5: A unit test renders the page sections and the form in production mode with an empty env and no throw.
- AC6: Related tests pass while working, and the full suite passes before merge. Night terminal screenshots are taken in EN and VI at 1440 and 375.
