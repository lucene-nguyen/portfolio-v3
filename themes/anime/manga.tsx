import { container } from "@/components/home/ui";
import { useContent } from "@/components/i18n/locale-provider";
import type { Content } from "@/content";
import { shown } from "@/lib/placeholder";

/** Oldest role first: the story reads left to right. */
export const chaptersOf = (experience: Content["experience"]) => [...experience.roles].reverse();

/** Original abstract art (speed lines, halftone, laptop glyph). No characters. */
function PanelArt({ seed, label }: { seed: number; label: string }) {
  const lines = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2 + seed;
    return { x2: 150 + Math.cos(a) * 220, y2: 90 + Math.sin(a) * 220 };
  });
  return (
    <svg viewBox="0 0 300 180" role="img" aria-label={label} className="block h-auto w-full">
      <title>{label}</title>
      <defs>
        <pattern id={`dots-${seed}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" className="fill-accent" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="300" height="180" className="fill-surface-2" />
      <rect width="300" height="180" fill={`url(#dots-${seed})`} />
      {lines.map((l, i) => (
        <line
          key={i}
          x1="150"
          y1="90"
          x2={l.x2}
          y2={l.y2}
          className="stroke-text"
          strokeWidth={i % 3 ? 1 : 2.5}
          opacity="0.55"
        />
      ))}
      <circle cx="150" cy="90" r="42" className="fill-surface stroke-text" strokeWidth="4" />
      {/* laptop glyph */}
      <rect
        x="128"
        y="72"
        width="44"
        height="28"
        rx="3"
        className="fill-none stroke-text"
        strokeWidth="4"
      />
      <path d="M120 106h60" className="stroke-text" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function MangaStrip() {
  const { experience, mangaCopy: c } = useContent();
  const chapters = chaptersOf(experience);
  return (
    <section aria-labelledby="manga-title" className="border-b-4 border-border">
      <div className={`${container} flex flex-col gap-6 py-12`}>
        <div>
          <h2 id="manga-title" className="text-[32px] font-extrabold">
            {c.title}
          </h2>
          <p className="text-text-secondary">{c.intro}</p>
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          {chapters.map((r, i) => (
            <li
              key={`${r.company}-${r.period}`}
              className="mg-panel flex flex-col"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <figure className="flex flex-1 flex-col">
                <div className="border-b-4 border-border">
                  <PanelArt seed={i + 1} label={c.panelAlt(r.company, r.period)} />
                </div>
                <figcaption className="flex flex-1 flex-col gap-4 p-4">
                  <p className="font-mono text-xs text-text-muted">
                    {c.chapter(i + 1)} · {r.period}
                  </p>
                  <h3 className="text-xl font-extrabold">{r.company}</h3>
                  <p className="mg-bubble mb-3 px-4 py-3 text-[15px] leading-relaxed">
                    {r.summary}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
        {shown(c.artNote) && <p className="font-mono text-xs text-text-muted">{c.artNote}</p>}
        <details>
          <summary className="cursor-pointer font-semibold text-accent underline underline-offset-2">
            {c.textToggle}
          </summary>
          <ol className="mt-3 flex list-decimal flex-col gap-2 pl-6 text-text-secondary">
            {chapters.map((r) => (
              <li key={`${r.company}-${r.period}`}>
                <strong className="text-text">{r.company}</strong> ({r.period}): {r.summary}
              </li>
            ))}
          </ol>
        </details>
      </div>
    </section>
  );
}
