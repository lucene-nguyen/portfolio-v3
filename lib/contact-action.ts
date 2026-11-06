"use server";

import { headers } from "next/headers";
import { contents } from "@/content";
import { CONTACT_LIMITS, validate, type Field } from "./contact";
import { isLocale } from "./i18n";
import { deliver } from "./contact-delivery";
import { getLimiter } from "./rate-limit/store";
import { visitorId } from "./rate-limit/visitor";

/** Unlikely field name: browsers won't autofill it, so only bots fill it. */
const HONEYPOT = "hp_contact_ref";

export interface ContactState {
  status: "idle" | "invalid" | "sent" | "limited" | "error";
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
  /** Changes on every submit so the form can react (focus, reset) to repeated results. */
  at?: number;
}

export async function submitContact(_: ContactState, form: FormData): Promise<ContactState> {
  const at = Date.now();
  // Honeypot: bots fill every field. Pretend it worked; store and send nothing.
  if (String(form.get(HONEYPOT) ?? "")) {
    console.info("contact honeypot hit");
    return { status: "sent", at };
  }

  const locale = String(form.get("locale") ?? "");
  const result = validate(form, contents[isLocale(locale) ? locale : "en"].contactCopy.errors);
  if (!result.ok) return { status: "invalid", errors: result.errors, values: result.values, at };

  try {
    const d = await getLimiter().hit(
      "window",
      `rl:contact:${visitorId(await headers())}`,
      CONTACT_LIMITS,
    );
    if (!d.allowed) return { status: "limited", values: { ...result.data }, at };
    await deliver(result.data);
    return { status: "sent", at };
  } catch (e) {
    console.error("contact form failed", e);
    return { status: "error", values: { ...result.data }, at };
  }
}
