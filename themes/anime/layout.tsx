"use client";

import { createPortal } from "react-dom";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { MangaStrip } from "./manga";
import "./anime.css";

export default function AnimeLayout({ children }: { children: React.ReactNode }) {
  const slot = useThemeSlot("theme-slot-home");
  return (
    <>
      {children}
      {slot && createPortal(<MangaStrip />, slot)}
    </>
  );
}
