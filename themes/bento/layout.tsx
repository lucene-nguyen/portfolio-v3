"use client";

import { createPortal } from "react-dom";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { BentoGrid } from "./grid";

/** Bento puts the rearrangeable tile grid at the top of the home page's <main>. */
export default function BentoLayout({ children }: { children: React.ReactNode }) {
  const slot = useThemeSlot("theme-slot-home");
  return (
    <>
      {children}
      {slot && createPortal(<BentoGrid />, slot)}
    </>
  );
}
