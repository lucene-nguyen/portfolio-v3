"use client";

import { useId, useState } from "react";
import { useContent } from "@/components/i18n/locale-provider";
import { getTheme, themes } from "@/themes/registry";
import { useTheme } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [announcement, setAnnouncement] = useState("");
  const id = useId();
  const { labels } = useContent();

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <label htmlFor={id} className="sr-only text-text-muted md:not-sr-only">
        {labels.theme}
      </label>
      <select
        id={id}
        value={theme.id}
        onChange={(e) => {
          const next = getTheme(e.target.value);
          if (!next) return;
          setTheme(next.id);
          setAnnouncement(labels.themeChanged(next.name));
        }}
        className="min-h-11 max-w-36 rounded-md border border-text-subtle bg-surface px-2 py-1 text-text md:max-w-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {themes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <span role="status" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}
