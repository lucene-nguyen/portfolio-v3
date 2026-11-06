import { ArrowRight } from "lucide-react";
import { features } from "@/lib/features";
import { getContent } from "@/lib/i18n-server";
import { cn } from "@/lib/utils";
import { shown } from "@/lib/placeholder";
import { buttonPrimary, buttonSecondary, container } from "./ui";

export function Hero() {
  const { hero, labels, profile } = getContent();
  return (
    <section
      id="top"
      aria-label={labels.intro}
      className={`${container} flex flex-col gap-16 pt-16 pb-20 sm:pt-24`}
    >
      <div className="flex min-w-0 flex-col gap-7">
        <p className="font-mono text-[15px] text-accent">{hero.eyebrow}</p>
        <h1 className="font-heading text-[40px] leading-[1.04] font-bold tracking-[-0.02em] sm:text-[64px]">
          {hero.headline}
        </h1>
        <p
          data-print="hide"
          className="max-w-[620px] text-xl leading-[1.55] font-medium text-text-2"
        >
          {hero.subline}
        </p>
        <p className="max-w-[620px] text-lg leading-[1.6] text-text-secondary">{hero.lead}</p>
        <div data-print="hide" className="flex flex-wrap gap-3">
          <a href="#experience" data-part="button" className={buttonPrimary}>
            {labels.seeExperience}
            <ArrowRight size={18} aria-hidden />
          </a>
          {/* Work with me is parked (round 4): the secondary CTA goes to Contact. */}
          <a
            href={features.workWithMe ? hero.workWithMeHref : "#contact"}
            data-part="button"
            className={buttonSecondary}
          >
            {features.workWithMe ? labels.workWithMe : labels.contactMe}
          </a>
          {shown(profile.resumeUrl) && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-part="button"
              className={buttonSecondary}
            >
              {labels.resume}
              <span className="sr-only"> {labels.newTab}</span>
            </a>
          )}
        </div>
        <dl
          data-part="stats"
          className="mt-2 flex flex-wrap overflow-hidden rounded-[14px] border border-border"
        >
          {hero.stats.map((s, i) => (
            <div
              key={s.label}
              data-part="stat"
              className={cn(
                "flex flex-[1_1_140px] flex-col-reverse px-[22px] py-5",
                i < hero.stats.length - 1 && "border-r border-border",
              )}
            >
              <dt className="mt-1 text-sm text-text-muted">{s.label}</dt>
              <dd className="font-mono text-[28px] font-bold">
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.value} ${s.label} ${labels.newTab}`}
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    {s.value}
                  </a>
                ) : (
                  s.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
