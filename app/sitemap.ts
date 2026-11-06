import type { MetadataRoute } from "next";
import { publicStudies } from "@/content/en/home";
import { homeAlternates } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  // hreflang both ways: each locale's entry lists every alternate.
  const languages = Object.fromEntries(
    Object.entries(homeAlternates).map(([l, p]) => [l, new URL(p, base).href]),
  );
  return [
    {
      url: new URL("/", base).href,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: new URL("/vi", base).href,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
    ...publicStudies.map((w) => ({
      url: new URL(`/work/${w.slug}`, base).href,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
