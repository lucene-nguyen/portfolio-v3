import type { MetadataRoute } from "next";
import { work } from "@/content/home";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: new URL("/", base).href, changeFrequency: "monthly", priority: 1 },
    ...work.items.map((w) => ({
      url: new URL(`/work/${w.slug}`, base).href,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
