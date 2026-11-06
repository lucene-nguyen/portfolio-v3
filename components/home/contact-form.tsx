"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { useContent, useLocale } from "@/components/i18n/locale-provider";
import { COLLAB_TYPE_IDS } from "@/content/collab";
import { CONTACT_LIMITS, type Field } from "@/lib/contact";
import { submitContact, type ContactState } from "@/lib/contact-action";
import { cn } from "@/lib/utils";
import { buttonPrimary } from "./ui";

// Control borders use text-subtle (≥ 4.5:1 on every ground in every theme), like the theme switcher:
// border-strong is too faint in some themes for WCAG 1.4.11 (3:1 for UI components).
const input =
  "min-h-11 w-full rounded-[10px] border border-text-subtle bg-surface px-3 py-2 text-text aria-[invalid=true]:border-danger";

// The radio group's first option takes focus for a type error.
const fieldId = (f: Field) =>
  f === "type" ? `contact-type-${COLLAB_TYPE_IDS[0]}` : `contact-${f}`;

/** Reads the collaboration type preselected by a Work with me CTA (`/?type=…#contact`). */
export function ContactFormFromUrl() {
  return <ContactForm preset={useSearchParams().get("type")} />;
}

export function ContactForm({ preset = null }: { preset?: string | null }) {
  const { collabTypes, contactCopy: c } = useContent();
  const locale = useLocale();
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, {
    status: "idle",
  });
  const summary = useRef<HTMLDivElement>(null);
  const errors = state.errors ?? {};
  const count = Object.keys(errors).length;
  const v = state.values ?? {};

  // After a failed submit, move focus to the summary so screen-reader and keyboard users land on it.
  useEffect(() => {
    if (state.status === "invalid") summary.current?.focus();
  }, [state.at, state.status]);

  const describe = (f: Field, hint?: string) =>
    [hint, errors[f] && `contact-${f}-error`].filter(Boolean).join(" ") || undefined;
  const error = (f: Field) =>
    errors[f] && (
      <p id={`contact-${f}-error`} className="text-sm text-danger">
        {errors[f]}
      </p>
    );
  const checkedType = v.type ?? preset;

  return (
    <form
      action={action}
      noValidate
      aria-labelledby="contact-form-title"
      className="flex flex-col gap-5"
    >
      <h3 id="contact-form-title" className="text-xl font-semibold">
        {c.formTitle}
      </h3>
      {count > 0 && (
        <div
          ref={summary}
          tabIndex={-1}
          data-part="form-summary"
          className="rounded-[10px] border border-danger p-4 text-sm"
        >
          <p className="font-semibold text-danger">{c.summary(count)}</p>
          <ul className="mt-2 list-disc pl-5">
            {Object.entries(errors).map(([f, msg]) => (
              <li key={f}>
                <a
                  href={`#${fieldId(f as Field)}`}
                  // Move focus too (a fragment link only scrolls).
                  onClick={() => document.getElementById(fieldId(f as Field))?.focus()}
                  className="underline"
                >
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="font-medium">
            {c.name}
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={v.name}
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className={input}
          />
          {error("name")}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="font-medium">
            {c.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            defaultValue={v.email}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className={input}
          />
          {error("email")}
        </div>
      </div>

      <fieldset
        // Remount when a CTA changes the preset, so the new type is checked.
        key={checkedType ?? "none"}
        id="contact-type"
        aria-invalid={!!errors.type}
        aria-describedby={describe("type")}
        className="flex flex-col gap-2"
      >
        <legend className="mb-2 font-medium">{c.type}</legend>
        <div className="flex flex-wrap gap-2">
          {collabTypes.map((t) => (
            <label
              key={t.id}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[10px] border border-text-subtle px-3 has-[:checked]:border-accent has-[:checked]:bg-surface"
            >
              <input
                type="radio"
                name="type"
                value={t.id}
                required
                id={`contact-type-${t.id}`}
                defaultChecked={checkedType === t.id}
                className="accent-accent"
              />
              {t.label}
            </label>
          ))}
        </div>
        {error("type")}
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="font-medium">
          {c.message}
        </label>
        <p id="contact-message-hint" className="text-sm text-text-muted">
          {c.messageHint}
        </p>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={20}
          maxLength={4000}
          rows={5}
          defaultValue={v.message}
          aria-invalid={!!errors.message}
          aria-describedby={describe("message", "contact-message-hint")}
          className={cn(input, "resize-y")}
        />
        {error("message")}
      </div>

      <div className="flex flex-col gap-1.5 sm:max-w-[50%]">
        <label htmlFor="contact-phone" className="font-medium">
          {c.phone}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={20}
          defaultValue={v.phone}
          aria-invalid={!!errors.phone}
          aria-describedby={describe("phone")}
          className={input}
        />
        {error("phone")}
      </div>

      {/* Errors come back in the page's language. */}
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-hp">{c.honeypot}</label>
        <input id="contact-hp" name="hp_contact_ref" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className={cn(buttonPrimary, "disabled:opacity-60")}
        >
          {pending ? c.sending : c.submit}
        </button>
        {/* Always rendered so the result is announced when it appears. */}
        <p role="status" className="font-medium text-text">
          {state.status === "sent" ? c.sent : ""}
        </p>
      </div>
      {/* Present from the first render (sr-only while empty) so the message is announced. */}
      <div role="alert" className="text-danger empty:sr-only">
        {state.status === "limited"
          ? c.limited(CONTACT_LIMITS.windowMs / 60_000)
          : state.status === "error"
            ? c.failed
            : null}
      </div>
    </form>
  );
}
