"use client";

import { forwardRef, useState } from "react";
import { Copy, ExternalLink, Mail } from "lucide-react";
import { useContent } from "@/components/i18n/locale-provider";
import type { ComposedMail } from "@/lib/mail-compose";
import { buttonPrimary, buttonSecondary } from "./ui";

/** The panel that hands the message to the visitor's own mailbox (LEARNING-188). Native <dialog>: focus trap, Esc. */
export const ComposeDialog = forwardRef<HTMLDialogElement, { mail: ComposedMail | null }>(
  function ComposeDialog({ mail }, ref) {
    const { contactCopy, labels } = useContent();
    const c = contactCopy.compose;
    const [copy, setCopy] = useState<"" | "copied" | "failed">("");

    async function copyText() {
      if (!mail) return;
      try {
        await navigator.clipboard.writeText(mail.text);
        setCopy("copied");
      } catch {
        setCopy("failed");
      }
    }

    return (
      <dialog
        ref={ref}
        aria-labelledby="compose-title"
        aria-describedby="compose-intro"
        onClose={() => setCopy("")}
        className="m-auto w-[calc(100%-32px)] max-w-2xl rounded-2xl border border-border-strong bg-bg p-0 text-text backdrop:bg-bg/70"
      >
        {mail && (
          <div className="flex max-h-[85vh] flex-col gap-4 overflow-y-auto p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="compose-title" className="text-xl font-semibold">
                  {c.title}
                </h3>
                <p id="compose-intro" className="text-sm text-text-muted">
                  {c.intro}
                </p>
              </div>
              <form method="dialog">
                <button
                  type="submit"
                  className="min-h-11 rounded-md border border-text-subtle px-3 text-sm"
                >
                  {c.close}
                </button>
              </form>
            </div>
            <section aria-label={c.preview}>
              {/* Read-only preview: exactly what Copy puts on the clipboard. */}
              <pre
                data-part="compose-preview"
                tabIndex={0}
                className="max-h-72 overflow-auto rounded-[10px] border border-border bg-surface p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap"
              >
                {mail.text}
              </pre>
            </section>
            <div className="flex flex-wrap gap-3">
              <a
                href={mail.gmail}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonPrimary}
              >
                <ExternalLink size={18} aria-hidden />
                {c.gmail}
                <span className="sr-only"> {labels.newTab}</span>
              </a>
              <a
                href={mail.outlook}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonSecondary}
              >
                <ExternalLink size={18} aria-hidden />
                {c.outlook}
                <span className="sr-only"> {labels.newTab}</span>
              </a>
              <a href={mail.mailto} className={buttonSecondary}>
                <Mail size={18} aria-hidden />
                {c.mailto}
              </a>
              <button type="button" onClick={copyText} className={buttonSecondary}>
                <Copy size={18} aria-hidden />
                {c.copy}
              </button>
            </div>
            <p role="status" className="min-h-6 text-sm font-medium">
              {copy === "copied" ? c.copied : copy === "failed" ? c.copyFailed : ""}
            </p>
          </div>
        )}
      </dialog>
    );
  },
);
