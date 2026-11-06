import { contents } from "@/content";
import { profile } from "@/content/en/home";
import { isLocale } from "@/lib/i18n";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${profile.name} — ${profile.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { hero, profile } = contents[isLocale(locale) ? locale : "en"];
  return ogImage({
    eyebrow: hero.eyebrow,
    title: hero.headline,
    footer: `${profile.name} · ${profile.title}`,
  });
}
