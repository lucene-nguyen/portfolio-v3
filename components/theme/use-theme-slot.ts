"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** A page-owned DOM node (e.g. `#theme-slot-home`) that a theme can portal extras into. */
export function useThemeSlot(id: string): HTMLElement | null {
  const pathname = usePathname();
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  // Theme features outlive client-side navigation: look the slot up again on every route.
  useEffect(() => {
    // One-time lookup of a node rendered by the page; nothing to derive during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlot(document.getElementById(id));
  }, [id, pathname]);
  return slot;
}
