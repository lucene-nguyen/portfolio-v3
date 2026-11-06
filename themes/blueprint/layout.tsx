"use client";

import { createPortal } from "react-dom";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { SystemMap } from "./system-map";

/** Blueprint adds the system map at the top of the home page's <main> (via the page's theme slot). */
export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  const slot = useThemeSlot("theme-slot-home");
  return (
    <>
      {children}
      {slot && createPortal(<SystemMap />, slot)}
    </>
  );
}
