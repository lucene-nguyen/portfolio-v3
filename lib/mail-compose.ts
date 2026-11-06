// The contact message a visitor sends from their own mailbox (LEARNING-188). Pure: unit-tested.
import type { Content } from "@/content";
import type { ContactMessage } from "./contact";

export interface ComposedMail {
  to: string;
  subject: string;
  /** Labelled fields, then the message (line breaks kept). */
  body: string;
  /** Exactly what the preview shows and Copy puts on the clipboard. */
  text: string;
  gmail: string;
  outlook: string;
  mailto: string;
}

const enc = encodeURIComponent;

export function composeMail(m: ContactMessage, content: Content): ComposedMail {
  const { collabTypes, contactCopy, profile } = content;
  const f = contactCopy.compose.fields;
  const type = collabTypes.find((t) => t.id === m.type)?.label ?? m.type;
  const to = profile.email;
  const subject = `[Portfolio] ${type} — ${m.name}`;
  const body = [
    `${f.name}: ${m.name}`,
    `${f.email}: ${m.email}`,
    `${f.type}: ${type}`,
    ...(m.phone ? [`${f.phone}: ${m.phone}`] : []),
    "",
    `${f.message}:`,
    m.message,
  ].join("\n");
  const { to: toLabel, subject: subjectLabel } = contactCopy.compose;
  return {
    to,
    subject,
    body,
    text: `${toLabel}: ${to}\n${subjectLabel}: ${subject}\n\n${body}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
    // RFC 6068: line breaks in a mailto body are CRLF.
    mailto: `mailto:${to}?subject=${enc(subject)}&body=${enc(body.replace(/\r?\n/g, "\r\n"))}`,
  };
}
