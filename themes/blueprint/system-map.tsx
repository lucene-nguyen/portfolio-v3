import Link from "next/link";
import { container } from "@/components/home/ui";
import { experience, kits, lab, profile, systemMap, work } from "@/content/home";
import { features } from "@/lib/features";

interface MapNode {
  href: string;
  title: string;
  tech: string;
  impact: string;
  external?: boolean;
  /** Position on the 1000×440 drawing (center of the node). */
  x: number;
  y: number;
}

const HUB = { x: 500, y: 220 };
const SLOTS = [
  { x: 190, y: 80 },
  { x: 810, y: 80 },
  { x: 190, y: 360 },
  { x: 810, y: 360 },
];

const repo = kits.items.find((k) => k.href === lab.repo.href);

// Case studies parked (LEARNING-164): the map shows the roles and the starter kits instead.
const careerNodes = [
  ...experience.roles.map((r) => ({
    href: "#experience",
    title: r.company,
    tech: r.summary,
    impact: r.period,
  })),
  {
    href: "#kits",
    title: kits.title,
    tech: kits.items.map((k) => k.name).join(" · "),
    impact: kits.items.map((k) => k.status).join(" · "),
  },
];

const projectNodes = [
  ...work.items.map((c) => ({
    href: `/work/${c.slug}`,
    title: c.title,
    tech: c.tags.join(" · "),
    impact: c.metrics[0] ? `${c.metrics[0].value} ${c.metrics[0].label}` : c.meta,
  })),
  ...(repo
    ? [{ href: repo.href, title: repo.name, tech: repo.stack, impact: repo.status, external: true }]
    : []),
];

export const mapNodes: MapNode[] = (features.caseStudies ? projectNodes : careerNodes)
  .slice(0, SLOTS.length)
  .map((n, i) => ({ ...n, ...SLOTS[i] }));

/** Static HTML + SVG: renders and navigates without JavaScript. */
export function SystemMap() {
  return (
    <section aria-labelledby="system-map-title" className="border-b border-border">
      <div className={`${container} flex flex-col gap-8 py-16`}>
        <div>
          <p className="mb-2.5 font-mono text-sm text-accent">{systemMap.eyebrow}</p>
          <h2 id="system-map-title" className="font-heading text-[32px] font-bold sm:text-[40px]">
            {systemMap.title}
          </h2>
          <p className="mt-3 max-w-[620px] text-text-secondary">{systemMap.intro}</p>
        </div>

        <div className="relative md:mb-20 md:aspect-[1000/440]">
          <svg
            viewBox="0 0 1000 440"
            aria-hidden
            className="absolute inset-0 hidden h-full w-full md:block"
            preserveAspectRatio="none"
          >
            {mapNodes.map((n) => (
              <line
                key={n.title}
                x1={HUB.x}
                y1={HUB.y}
                x2={n.x}
                y2={n.y}
                className="stroke-border-strong"
                strokeWidth="1"
                strokeDasharray="6 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          <ul className="flex flex-col gap-4 md:contents">
            <li
              className="md:absolute md:-translate-x-1/2 md:-translate-y-1/2"
              style={{ left: `${HUB.x / 10}%`, top: `${(HUB.y / 440) * 100}%` }}
            >
              <div className="border border-accent bg-bg px-4 py-3 text-center font-mono text-sm">
                <span className="block font-bold text-accent">{profile.handle}.dev</span>
                <span className="text-text-muted">{profile.title}</span>
              </div>
            </li>
            {mapNodes.map((n) => (
              <li
                key={n.title}
                className="md:absolute md:w-[30%] md:-translate-x-1/2 md:-translate-y-1/2"
                style={{ left: `${n.x / 10}%`, top: `${(n.y / 440) * 100}%` }}
              >
                <Link
                  href={n.href}
                  className="group relative block border border-border-strong bg-surface p-3 font-mono text-sm hover:border-accent focus-visible:border-accent"
                >
                  {/* Corner ticks: drafting marks. */}
                  <span
                    aria-hidden
                    className="absolute -top-px -left-px size-2 border-t border-l border-accent"
                  />
                  <span
                    aria-hidden
                    className="absolute -right-px -bottom-px size-2 border-r border-b border-accent"
                  />
                  <span className="block font-semibold text-text">
                    {n.title}
                    {n.external && <span className="sr-only"> (GitHub)</span>}
                  </span>
                  <span className="sr-only group-hover:not-sr-only group-hover:mt-2 group-hover:block group-focus-visible:not-sr-only group-focus-visible:mt-2 group-focus-visible:block md:group-hover:absolute md:group-hover:inset-x-[-1px] md:group-hover:top-full md:group-hover:z-10 md:group-hover:mt-0 md:group-hover:border md:group-hover:border-accent md:group-hover:bg-surface md:group-hover:p-3 md:group-focus-visible:absolute md:group-focus-visible:inset-x-[-1px] md:group-focus-visible:top-full md:group-focus-visible:z-10 md:group-focus-visible:mt-0 md:group-focus-visible:border md:group-focus-visible:border-accent md:group-focus-visible:bg-surface md:group-focus-visible:p-3">
                    <span className="block text-xs text-text-muted">{n.tech}</span>
                    <span className="block text-xs text-accent">{n.impact}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <details className="font-mono text-sm">
          <summary className="cursor-pointer text-text-muted hover:text-text">
            {systemMap.listToggle}
          </summary>
          <ul className="mt-3 flex flex-col gap-2">
            {mapNodes.map((n) => (
              <li key={n.title}>
                <Link href={n.href} className="text-accent underline underline-offset-2">
                  {n.title}
                </Link>
                <span className="text-text-muted">
                  {" "}
                  — {n.tech} — {n.impact}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
