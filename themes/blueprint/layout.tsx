"use client";

import { usePathname } from "next/navigation";
import { SystemMap } from "./system-map";
import "./blueprint.css";

/** Blueprint adds the system map above the home page content. */
export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/" && <SystemMap />}
      {children}
    </>
  );
}
