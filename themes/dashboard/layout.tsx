"use client";

import { createPortal } from "react-dom";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { Panels } from "./panels";

/** Dashboard adds the metrics panels at the top of the home page's <main>. */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const slot = useThemeSlot("theme-slot-home");
  return (
    <>
      {children}
      {slot && createPortal(<Panels />, slot)}
    </>
  );
}
