"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { STORAGE_KEY } from "@/lib/theme/css";
import { activeThemes, defaultTheme, getTheme } from "@/themes/registry";
import type { ThemeDefinition } from "@/themes/types";

interface ThemeContextValue {
  theme: ThemeDefinition;
  setTheme: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// The inline head script owns the initial value; the DOM attribute is the source of truth.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getSnapshot = () => document.documentElement.dataset.theme ?? defaultTheme.id;
const getServerSnapshot = () => defaultTheme.id;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: string) => {
    // Locked themes (LEARNING-184) can't be chosen, whoever asks.
    if (!activeThemes.some((t) => t.id === next)) return;
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    // An explicit choice replaces a ?theme= override.
    const url = new URL(window.location.href);
    if (url.searchParams.has("theme")) {
      url.searchParams.delete("theme");
      window.history.replaceState(window.history.state, "", url);
    }
  }, []);

  const value = useMemo(() => ({ theme: getTheme(id) ?? defaultTheme, setTheme }), [id, setTheme]);
  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
