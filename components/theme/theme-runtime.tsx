"use client";

import { lazy, Suspense, useEffect } from "react";
import { recordThemeSeen } from "@/lib/achievements";
import { themes } from "@/themes/registry";
import { useTheme } from "./theme-provider";

// lazy() only wraps the loader; nothing is fetched until the component renders.
const modules = new Map(
  themes.map((t) => [
    t.id,
    { Layout: t.layout && lazy(t.layout), features: (t.features ?? []).map((f) => lazy(f)) },
  ]),
);

/** Renders the active theme's optional layout and feature modules. Inactive themes' loaders never run. */
export function ThemeRuntime({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const { Layout, features } = modules.get(theme.id)!;
  // Exploration progress (shown by the Pixel theme's achievements).
  // Read the DOM: during hydration `theme` is still the server default, not what the visitor sees.
  useEffect(() => recordThemeSeen(document.documentElement.dataset.theme ?? theme.id), [theme.id]);

  return (
    <>
      {Layout ? (
        <Suspense fallback={children}>
          <Layout>{children}</Layout>
        </Suspense>
      ) : (
        children
      )}
      {features.map((Feature, i) => (
        <Suspense key={`${theme.id}-${i}`} fallback={null}>
          <Feature />
        </Suspense>
      ))}
    </>
  );
}
