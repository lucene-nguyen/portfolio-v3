"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { features } from "@/lib/features";
import { useContent, useLocale } from "@/components/i18n/locale-provider";
import { homePath } from "@/lib/i18n";
import { shown } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import { container } from "./ui";

const resume =
  "inline-flex min-h-10 items-center rounded-lg border border-border-strong px-4 font-mono text-sm text-text";

/** One line on mobile (logo, theme switcher, menu); links inline from md up. */
export function SiteNav() {
  const { labels, language, nav, profile } = useContent();
  const locale = useLocale();
  // A full page load: the other locale has its own <html lang>.
  const switchLanguage = {
    href: language.href,
    hrefLang: language.hrefLang,
    lang: language.hrefLang,
    "aria-label": language.ariaLabel,
    children: language.label,
    className:
      "min-h-11 items-center rounded-md px-2 text-[15px] font-medium text-text-muted underline-offset-4 hover:text-text hover:underline",
  };
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // A dialog opened from the menu handles its own Esc; the menu stays open behind it.
      if (e.key !== "Escape" || document.querySelector("dialog[open]")) return;
      setOpen(false);
      toggle.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-b border-border">
      <nav
        aria-label={labels.mainNav}
        className={`${container} flex flex-wrap items-center gap-x-2 gap-y-3 py-[18px] sm:gap-x-3 md:gap-x-4`}
      >
        <Link
          href={homePath(locale)}
          className="font-mono text-base font-bold whitespace-nowrap text-text sm:text-lg"
        >
          {profile.logo}
        </Link>
        <div className="ml-auto flex items-center gap-3 md:order-last md:ml-0">
          {/* Next to the theme switcher; with unlocked themes it moves into the menu on phones (no room). */}
          <a
            {...switchLanguage}
            className={`${switchLanguage.className} ${features.themes ? "hidden md:inline-flex" : "inline-flex"}`}
          />
          {features.themes && <ThemeSwitcher />}
        </div>
        <button
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex size-11 items-center justify-center rounded-lg border border-border-strong text-text md:hidden"
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          <span className="sr-only">{labels.menu}</span>
        </button>
        <div
          id={panelId}
          className={cn(
            "w-full flex-col gap-1 border-t border-border pt-3 text-[15px] md:ml-auto md:flex md:w-auto md:flex-row md:flex-wrap md:items-center md:gap-x-7 md:border-0 md:pt-0",
            open ? "flex" : "hidden",
          )}
          // Close after following a link or a plain action; dialog openers keep the menu open so focus can return to them.
          onClick={(e) => {
            const el = (e.target as HTMLElement).closest("a, button");
            if (el && !el.hasAttribute("aria-haspopup")) setOpen(false);
          }}
        >
          {features.themes && (
            <a {...switchLanguage} className={`${switchLanguage.className} md:hidden`} />
          )}
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center text-text-muted transition-colors duration-150 hover:text-text md:min-h-0"
            >
              {item.label}
            </Link>
          ))}
          {shown(profile.resumeUrl) && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${resume} hover:bg-surface`}
            >
              {labels.resume} <span aria-hidden>↓</span>
              <span className="sr-only"> {labels.newTab}</span>
            </a>
          )}
          {/* Themes add their nav actions here (e.g. Terminal and Achievements on mobile). */}
          <div id="theme-slot-nav" className="contents" />
        </div>
      </nav>
    </header>
  );
}
