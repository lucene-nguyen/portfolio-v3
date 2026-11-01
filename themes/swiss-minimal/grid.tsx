"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Grid3x3 } from "lucide-react";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { swissCopy } from "@/content/home";
// Also carries the print CV stylesheet: printing needs this chunk loaded (i.e. JS on).
import "./swiss.css";

const KEY = "swiss:grid";

/** 12-column grid (decorative), aligned with the 1200px container; hidden until "Show grid". */
export default function SwissGrid() {
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem(KEY) === "on";
    } catch {
      return false;
    }
  });
  const navSlot = useThemeSlot("theme-slot-nav");

  useEffect(() => {
    try {
      localStorage.setItem(KEY, on ? "on" : "off");
    } catch {}
  }, [on]);

  return (
    <>
      <div aria-hidden className="sw-grid" data-on={on} data-testid="swiss-grid">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      {navSlot &&
        createPortal(
          // The grid only exists from 1024px up, and so does its toggle.
          <button
            type="button"
            aria-pressed={on}
            onClick={() => setOn((v) => !v)}
            className="hidden min-h-10 items-center gap-2 border border-border-strong px-3 text-sm text-text aria-pressed:bg-accent aria-pressed:text-accent-contrast lg:inline-flex"
          >
            <Grid3x3 size={16} aria-hidden />
            {swissCopy.showGrid}
          </button>,
          navSlot,
        )}
    </>
  );
}
