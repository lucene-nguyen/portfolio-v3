import { hero, profile } from "@/content/home";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${profile.name} — ${profile.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: hero.eyebrow,
    title: hero.headline,
    footer: `${profile.name} · ${profile.title}`,
  });
}
