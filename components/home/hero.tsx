import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hero, labels, profile } from "@/content/home";
import { cn } from "@/lib/utils";
import { buttonPrimary, buttonSecondary, container, GithubIcon } from "./ui";

export function Hero() {
  return (
    <section
      id="top"
      aria-label={labels.intro}
      className={`${container} flex flex-wrap items-center gap-16 pt-16 pb-20 sm:pt-24`}
    >
      <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
        <p className="font-mono text-[15px] text-accent">{hero.eyebrow}</p>
        <h1 className="font-heading text-[40px] leading-[1.04] font-bold tracking-[-0.02em] sm:text-[64px]">
          {hero.headline}
        </h1>
        <p className="max-w-[620px] text-xl leading-[1.55] text-text-secondary">{hero.lead}</p>
        <div data-print="hide" className="flex flex-wrap gap-3">
          <a href="#work" className={buttonPrimary}>
            {labels.viewWork}
            <ArrowRight size={18} aria-hidden />
          </a>
          <a href={profile.github} className={buttonSecondary}>
            <GithubIcon />
            {profile.githubLabel}
          </a>
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
              <dd className={cn("font-mono text-[28px] font-bold", s.highlight && "text-accent")}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <figure data-part="portrait" className="flex max-w-[420px] flex-[1_1_320px] flex-col gap-3">
        <div className="rounded-[20px] border border-border-strong bg-surface p-2.5">
          <Image
            src={profile.avatar.src}
            alt={profile.avatar.alt}
            width={900}
            height={1200}
            priority
            sizes="(max-width: 768px) calc(100vw - 48px), 420px"
            className="aspect-[4/5] w-full rounded-xl object-cover object-[center_20%]"
          />
        </div>
        <figcaption className="flex justify-between gap-3 px-1.5 font-mono text-[13px] text-text-muted">
          <span>{profile.avatarCaption}</span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" aria-hidden />
            {profile.status}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
