import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
