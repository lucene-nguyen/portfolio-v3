"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SystemMap } from "./system-map";
import "./blueprint.css";

/** Blueprint adds the system map at the top of the home page's <main> (via the page's theme slot). */
export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  // The slot is rendered by the page (children), so it exists after this commit.
  useEffect(() => {
    // One-time lookup of a DOM node owned by the page; nothing to derive during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlot(document.getElementById("theme-slot-home"));
  }, []);
  return (
    <>
      {children}
      {slot && createPortal(<SystemMap />, slot)}
    </>
  );
}
