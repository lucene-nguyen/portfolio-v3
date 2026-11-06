import { profile } from "@/content/en/home";

/** Open Graph fields every page shares (Next merges `openGraph` shallowly, so pages spread this). */
export const ogBase = { siteName: profile.name, locale: "en_US" } as const;

/** Canonical site URL: explicit env, else Vercel's production domain, else local dev. */
export function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
