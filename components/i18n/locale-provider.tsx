"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";
import { contents } from "@/content";
import { defaultLocale, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export const useLocale = () => useContext(LocaleContext);
// shortcut: both locales' copy ships to the client (small text); split per locale if it ever grows.
export const useContent = () => contents[useLocale()];

/** The URL path as visitors see it: English pages are rewritten to /en internally (next.config). */
export function usePublicPathname() {
  const pathname = usePathname();
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}
