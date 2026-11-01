import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Dev-only switch to show [PLACEHOLDER] content while editing (see lib/placeholder.ts).
  env: { SHOW_PLACEHOLDERS: process.env.SHOW_PLACEHOLDERS ?? "" },
  // Tailwind v4 via its Turbopack loader (create-next-app 16 default; no postcss config needed).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default createMDX()(nextConfig);
