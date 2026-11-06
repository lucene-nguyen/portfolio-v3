import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Dev-only switch to show [PLACEHOLDER] content while editing (see lib/placeholder.ts).
  env: { SHOW_PLACEHOLDERS: process.env.SHOW_PLACEHOLDERS ?? "" },
  // i18n (LEARNING-168): pages live under app/[locale]. English is served without a prefix,
  // Vietnamese under /vi; /en/... redirects to the unprefixed URL so each page has one address.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/en" }],
      // afterFiles: public files (/avatar.jpg) and static routes win; everything else is English.
      afterFiles: [
        {
          source: "/:path((?!en(?:/|$)|vi(?:/|$)|api/|_next/).*)",
          destination: "/en/:path",
        },
      ],
    };
  },
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/work/:slug", destination: "/work/:slug", permanent: true },
    ];
  },
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
