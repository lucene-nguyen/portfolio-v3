import { profile, work } from "@/content/en/home";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `Case study by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return work.items.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = work.items.find((w) => w.slug === slug);
  return ogImage({
    eyebrow: study ? `${study.meta} · ${study.period}` : work.title,
    title: study?.title ?? work.title,
    footer: `${profile.name} · ${work.title}`,
  });
}
