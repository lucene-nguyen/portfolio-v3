import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { container, Tag } from "@/components/home/ui";
import { TrackCaseStudyRead } from "@/components/work/track-read";
import { SHOW_PLACEHOLDERS } from "@/lib/placeholder";
import { labels, profile, work } from "@/content/home";
import { ogBase } from "@/lib/site";

const find = (slug: string) => work.items.find((c) => c.slug === slug);

export function generateStaticParams() {
  return work.items.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = find((await params).slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      ...ogBase,
      type: "article",
      url: `/work/${study.slug}`,
      title: study.title,
      description: study.summary,
      authors: [profile.name],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = find(slug);
  if (!study) notFound();
  const { default: Body } = await import(`@/content/work/${slug}.mdx`);

  return (
    <main id="main" className="flex-1">
      <article className={`${container} max-w-[860px] py-16 sm:py-20`}>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-text"
        >
          <ArrowLeft size={16} aria-hidden />
          {work.backLabel}
        </Link>
        <header className="mt-8 flex flex-col gap-5 border-b border-border pb-10">
          <p className="flex flex-wrap justify-between gap-3 font-mono text-[13px] text-text-muted">
            <span>{study.meta}</span>
            <span>{study.period}</span>
          </p>
          <h1 className="font-heading text-[36px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[52px]">
            {study.title}
          </h1>
          <p className="text-xl leading-[1.55] text-text-secondary">{study.summary}</p>
          <dl className="flex flex-wrap gap-8">
            {study.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse">
                <dt className="text-sm text-text-muted">{m.label}</dt>
                <dd className="font-mono text-[28px] font-bold text-accent">{m.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="flex flex-wrap gap-2" aria-label={labels.technologies}>
            {study.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </header>
        <div id="theme-slot-article" />
        <div className="prose-body" data-placeholders={SHOW_PLACEHOLDERS ? "shown" : "hidden"}>
          <Body />
        </div>
        <TrackCaseStudyRead />
      </article>
    </main>
  );
}
