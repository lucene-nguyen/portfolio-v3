"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { useRouter } from "next/navigation";
import { SquareTerminal } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { isTyping, restoreFocus } from "@/lib/dom";
import { complete, run, type Line, type TerminalContext } from "@/lib/terminal/commands";
import { useContent, useLocale } from "@/components/i18n/locale-provider";
import { homeHref } from "@/lib/i18n";
import { activeThemes } from "@/themes/registry";

const WELCOME: Line[] = [
  { kind: "out", text: 'Type "help" to list commands. Tab completes, ↑/↓ for history.' },
];

export default function CommandBar() {
  const { experience, profile, publicStudies } = useContent();
  const locale = useLocale();
  const ctx: TerminalContext = {
    projects: publicStudies.map(({ slug, title }) => ({ slug, title })),
    themes: activeThemes.map(({ id, name }) => ({ id, name })),
    resume: [
      `${profile.name} — ${profile.title}`,
      ...experience.roles.map((r) => `${r.period}  ${r.company}`),
    ],
  };
  const navSlot = useThemeSlot("theme-slot-nav");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const { setTheme } = useTheme();
  const router = useRouter();

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    dialog.showModal();
    inputRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const plain = !e.ctrlKey && !e.metaKey && !e.altKey && !e.isComposing;
      const slash = e.key === "/" && plain && !isTyping(e.target);
      const k = e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey);
      if (slash || k) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    // Shortcuts work only after hydration; e2e tests wait for this marker.
    if (buttonRef.current) buttonRef.current.dataset.shortcuts = "on";
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => dialogRef.current?.close();

  const submit = () => {
    const input = value;
    const result = run(input, ctx);
    setValue("");
    setCursor(null);
    if (input.trim()) setHistory((h) => (h.at(-1) === input ? h : [...h, input].slice(-50)));
    if (result.action?.type === "clear") return setLines([]);
    setLines((l) => [...l, { kind: "out", text: `$ ${input}` }, ...result.lines]);
    if (result.action?.type === "navigate") {
      close();
      // Section links ("/#contact") go to this locale's home page.
      const href = result.action.href;
      router.push(href.startsWith("/#") ? homeHref(locale, href.slice(1)) : href);
    } else if (result.action?.type === "theme") {
      close();
      setTheme(result.action.id);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab" && !e.shiftKey && complete(value, ctx) !== value) {
      e.preventDefault();
      setValue(complete(value, ctx));
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown" && cursor !== null) {
      e.preventDefault();
      const i = cursor + 1;
      setCursor(i < history.length ? i : null);
      setValue(i < history.length ? history[i] : "");
    }
  };

  return (
    <>
      {/* Desktop: floating button (spacer keeps it off the end of the page). Mobile: entry in the nav menu. */}
      <div aria-hidden className="hidden h-20 md:block" />
      {navSlot &&
        createPortal(
          <button
            type="button"
            onClick={open}
            aria-haspopup="dialog"
            className="flex min-h-11 items-center gap-2 font-mono text-sm text-text md:hidden"
          >
            <SquareTerminal size={18} aria-hidden className="text-accent" />
            Terminal
          </button>,
          navSlot,
        )}
      <button
        ref={buttonRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-keyshortcuts="/ Control+K Meta+K"
        className="fixed right-4 bottom-4 z-40 hidden min-h-11 items-center gap-2 rounded-[10px] border border-border-strong bg-surface px-4 font-mono text-sm text-text shadow-lg sm:min-w-[280px] md:inline-flex"
      >
        <SquareTerminal size={18} aria-hidden className="text-accent" />
        <span>Terminal</span>
        <span className="ml-auto hidden text-text-subtle sm:inline" aria-hidden>
          press / or Ctrl K
        </span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Command line"
        onClose={() => restoreFocus(openerRef.current)}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-0 mt-auto w-full max-w-none rounded-t-2xl border border-border-strong bg-bg p-0 text-text backdrop:bg-bg/70 sm:m-auto sm:max-w-2xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-xs text-text-muted">
          <span>~/{profile.handle}</span>
          <button
            type="button"
            onClick={close}
            className="min-h-11 rounded-md px-3 hover:text-text"
          >
            Close{" "}
            <span className="text-text-subtle" aria-hidden>
              esc
            </span>
          </button>
        </div>
        <div
          role="log"
          aria-live="polite"
          className="max-h-[50vh] min-h-40 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-[1.75]"
        >
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === "err" ? "text-danger" : "whitespace-pre-wrap text-text-secondary"
              }
            >
              {l.text}
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex items-center gap-2 border-t border-border px-4 py-3 font-mono text-[15px]"
        >
          <label htmlFor="terminal-input" className="text-accent">
            $<span className="sr-only"> command</span>
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setCursor(null);
            }}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-h-11 flex-1 rounded-sm bg-transparent text-text placeholder:text-text-subtle"
            placeholder="help"
          />
        </form>
      </dialog>
    </>
  );
}
