"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { features } from "@/lib/features";
import { labels, nav, profile } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import { container } from "./ui";

const resume =
  "inline-flex min-h-10 items-center rounded-lg border border-border-strong px-4 font-mono text-sm text-text";

/** One line on mobile (logo, theme switcher, menu); links inline from md up. */
export function SiteNav() {
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
        aria-label="Main"
        className={`${container} flex flex-wrap items-center gap-x-2 gap-y-3 py-[18px] sm:gap-x-3 md:gap-x-4`}
      >
        <Link
          href="/"
          className="font-mono text-base font-bold whitespace-nowrap text-text sm:text-lg"
        >
          {profile.logo}
        </Link>
        <div className="ml-auto md:order-last md:ml-0">{features.themes && <ThemeSwitcher />}</div>
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
