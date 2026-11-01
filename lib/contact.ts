// Contact form rules (LEARNING-167). Pure: shared by the Server Action and the unit tests.
import { collabTypes, contactCopy, type CollabType } from "@/content/home";

export const FIELDS = ["name", "email", "type", "message", "phone"] as const;
export type Field = (typeof FIELDS)[number];

export interface ContactMessage {
  name: string;
  email: string;
  type: CollabType;
  message: string;
  phone?: string;
}

export type Validation =
  | { ok: true; data: ContactMessage }
  | { ok: false; errors: Partial<Record<Field, string>>; values: Partial<Record<Field, string>> };

/** Contact-form rate limit per visitor: enough for a person, useless for a flood. */
export const CONTACT_LIMITS = { capacity: 3, windowMs: 10 * 60_000 };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL = /[\u0000-\u001f\u007f]/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

export const isCollabType = (v: string): v is CollabType => collabTypes.some((t) => t.id === v);

export function validate(form: { get(name: string): FormDataEntryValue | null }): Validation {
  const values = Object.fromEntries(
    FIELDS.map((f) => [f, String(form.get(f) ?? "").trim()]),
  ) as Record<Field, string>;
  const e = contactCopy.errors;
  const errors: Partial<Record<Field, string>> = {};

  if (!values.name) errors.name = e.nameRequired;
  else if (values.name.length > 100) errors.name = e.nameLong;
  // The name goes into the email subject: one line, no control characters.
  else if (CONTROL.test(values.name)) errors.name = e.nameInvalid;

  if (!values.email) errors.email = e.emailRequired;
  else if (values.email.length > 254 || !EMAIL.test(values.email)) errors.email = e.emailInvalid;

  if (!isCollabType(values.type)) errors.type = e.typeRequired;

  if (!values.message) errors.message = e.messageRequired;
  else if (values.message.length < 20) errors.message = e.messageShort;
  else if (values.message.length > 4000) errors.message = e.messageLong;

  if (values.phone && !PHONE.test(values.phone)) errors.phone = e.phoneInvalid;

  if (Object.keys(errors).length) return { ok: false, errors, values };
  return {
    ok: true,
    data: {
      name: values.name,
      email: values.email,
      type: values.type as CollabType,
      message: values.message,
      ...(values.phone ? { phone: values.phone } : {}),
    },
  };
}
