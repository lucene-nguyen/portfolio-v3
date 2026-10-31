import Link from "next/link";
import { labels, work } from "@/content/home";
import { container, SectionHeader, Tag } from "./ui";

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-border">
      <div className={`${container} flex flex-col gap-10 py-[88px]`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader id="work-title" eyebrow={work.eyebrow} title={work.title} />
          <p className="max-w-[460px] leading-[1.55] text-text-muted">{work.intro}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          {work.items.map((c) => (
            <article
              key={c.slug}
              className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px] rounded-2xl border border-border bg-surface p-7"
            >
              <div className="flex items-center justify-between gap-3 font-mono text-[13px] text-text-muted">
                <span>{c.meta}</span>
                <span>{c.period}</span>
              </div>
              <h3 className="font-heading text-2xl leading-tight font-semibold">{c.title}</h3>
              <p className="leading-[1.55] text-text-secondary">{c.summary}</p>
              <dl className="flex flex-wrap gap-6 border-y border-border py-4">
                {c.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col-reverse">
                    <dt className="text-[13px] text-text-muted">{m.label}</dt>
                    <dd className="font-mono text-[22px] font-bold text-accent">{m.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="flex flex-wrap gap-2" aria-label={labels.technologies}>
                {c.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
              <Link
                href={`/work/${c.slug}`}
                aria-label={`${labels.readCaseStudy}: ${c.title}`}
                className="mt-auto text-[15px] font-semibold text-accent hover:underline"
              >
                {labels.readCaseStudy} <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
