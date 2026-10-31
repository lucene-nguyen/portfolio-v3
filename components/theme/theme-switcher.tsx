"use client";

import { useId, useState } from "react";
import { getTheme, themes } from "@/themes/registry";
import { useTheme } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [announcement, setAnnouncement] = useState("");
  const id = useId();

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <label htmlFor={id} className="text-text-muted">
        Theme
      </label>
      <select
        id={id}
        value={theme.id}
        onChange={(e) => {
          const next = getTheme(e.target.value);
          if (!next) return;
          setTheme(next.id);
          setAnnouncement(`Theme: ${next.name}`);
        }}
        className="rounded-md border border-text-subtle bg-surface px-2 py-1 text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
