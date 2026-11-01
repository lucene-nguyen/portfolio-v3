"use client";

import { createPortal } from "react-dom";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { StickerBoard } from "./board";
import "./neo.css";

export default function NeoBrutalismLayout({ children }: { children: React.ReactNode }) {
  const slot = useThemeSlot("theme-slot-home");
  return (
    <>
      {children}
      {slot && createPortal(<StickerBoard />, slot)}
    </>
  );
}
