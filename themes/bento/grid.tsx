"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, GripVertical, RotateCcw } from "lucide-react";
import { container } from "@/components/home/ui";
import {
  bentoCopy as c,
  hero,
  lab,
  labels,
  profile,
  publicStudies,
  skills,
} from "@/content/home";
import { features } from "@/lib/features";
import { move, moveTo, sanitizeOrder } from "@/lib/bento";
import { cn } from "@/lib/utils";

const KEY = "bento:order";

interface Tile {
  id: string;
  name: string;
  size: string; // grid spans from md up; one column below
  tone: "surface" | "surface2" | "accent" | "bgAlt";
  body: React.ReactNode;
}

const tones = {
  surface: "bg-surface text-text",
  surface2: "bg-surface-2 text-text",
  bgAlt: "bg-bg-alt text-text",
  accent: "bg-accent text-accent-contrast",
};

const tiles: Tile[] = [
  {
    id: "about",
    name: c.tiles.about,
    size: "md:col-span-2 md:row-span-2",
    tone: "surface",
    body: (
      <div className="flex flex-col gap-3">
        <p className="font-mono text-sm text-accent">{hero.eyebrow}</p>
        <p className="text-2xl leading-tight font-bold">{hero.headline}</p>
        <p className="text-text-secondary">{hero.lead}</p>
      </div>
    ),
  },
  {
    id: "photo",
    name: c.tiles.photo,
    size: "md:row-span-2",
    tone: "surface2",
    body: (
      <Image
        src={profile.avatar.src}
        alt="" // decorative: the contact avatar carries the description
        width={900}
        height={1200}
        sizes="(max-width: 768px) 100vw, 300px"
        className="h-full max-h-80 w-full rounded-2xl object-cover object-[center_20%]"
      />
    ),
  },
  {
    id: "stats",
    name: c.tiles.stats,
    size: "md:col-span-1",
    tone: "accent",
    body: (
      <dl className="grid grid-cols-2 gap-3">
        {hero.stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse">
            <dt className="text-xs">{s.label}</dt>
            <dd className="font-mono text-lg font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  ...publicStudies.map((w) => ({
    id: `work-${w.slug}`,
    name: w.title,
    size: "md:col-span-1",
    tone: "surface" as const,
    body: (
      <div className="flex h-full flex-col gap-2">
        <p className="font-mono text-xs text-text-muted">{w.meta}</p>
        <p className="font-semibold">{w.title}</p>
        {w.metrics[0] && (
          <>
            <p className="font-mono text-xl font-bold text-accent">{w.metrics[0].value}</p>
            <p className="text-xs text-text-muted">{w.metrics[0].label}</p>
          </>
        )}
        <Link
          href={`/work/${w.slug}`}
          aria-label={`${labels.readCaseStudy}: ${w.title}`}
          className="mt-auto text-sm font-semibold text-accent underline underline-offset-2"
        >
          {labels.readCaseStudy}
        </Link>
      </div>
    ),
  })),
  {
    id: "stack",
    name: c.tiles.stack,
    size: "md:col-span-2",
    tone: "bgAlt",
    body: (
      <ul className="flex flex-wrap gap-1.5">
        {skills.groups
          .flatMap((g) => g.items)
          .map((it) => (
            <li
              key={it}
              className="rounded-full bg-surface px-2.5 py-1 font-mono text-xs text-text-2"
            >
              {it}
            </li>
          ))}
      </ul>
    ),
  },
  // The lab is parked (LEARNING-164).
  ...(features.lab
    ? ([
        {
          id: "lab",
          name: c.tiles.lab,
          size: "md:col-span-1",
          tone: "surface2",
          body: (
            <div className="flex h-full flex-col gap-2">
              <p className="font-semibold">{lab.title}</p>
              <a
                href="#lab"
                className="mt-auto text-sm font-semibold text-accent underline underline-offset-2"
              >
                {c.labCta}
              </a>
            </div>
          ),
        },
      ] satisfies Tile[])
    : []),
  {
    id: "contact",
    name: c.tiles.contact,
    size: "md:col-span-1",
    tone: "surface",
    body: (
      <div className="flex h-full flex-col gap-2">
        <a
          href={`mailto:${profile.email}`}
          className="font-semibold break-all text-accent underline underline-offset-2"
        >
          {profile.email}
        </a>
        <a
          href={profile.github}
          className="text-sm text-text-secondary underline underline-offset-2"
        >
          {profile.githubLabel}
        </a>
      </div>
    ),
  },
];

const ids = tiles.map((t) => t.id);
const byId = new Map(tiles.map((t) => [t.id, t]));

function loadOrder(): string[] {
  try {
    return sanitizeOrder(JSON.parse(localStorage.getItem(KEY) ?? "null"), ids);
  } catch {
    return ids;
  }
}

export function BentoGrid() {
  const [order, setOrder] = useState<string[]>(loadOrder);
  const [announce, setAnnounce] = useState("");
  const [dragging, setDragging] = useState<string | null>(null);
  // Read during dragover/drop, which can fire before React re-renders with the new state.
  const dragId = useRef<string | null>(null);
  // One-shot: the control to refocus after the next keyboard move.
  const focusAfterMove = useRef<string | null>(null);
  const [over, setOver] = useState<string | null>(null);

  // Same text twice would not be re-announced; a trailing no-break space makes it differ.
  const say = (msg: string) => setAnnounce((prev) => (prev === msg ? `${msg} ` : msg));

  const save = (next: string[], movedId?: string) => {
    setOrder(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    if (movedId) say(c.moved(byId.get(movedId)!.name, next.indexOf(movedId) + 1, next.length));
  };

  // After a keyboard move, keep focus on the same control of the moved tile.
  useEffect(() => {
    if (!focusAfterMove.current) return;
    document.querySelector<HTMLElement>(`[data-focus-key="${focusAfterMove.current}"]`)?.focus();
    focusAfterMove.current = null;
  }, [order]);

  return (
    <section aria-labelledby="bento-title" className="border-b border-border">
      <div className={`${container} flex flex-col gap-5 py-12`}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="bento-title" className="text-[32px] font-bold">
              {c.title}
            </h2>
            <p className="text-sm text-text-muted">{c.hint}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              try {
                localStorage.removeItem(KEY);
              } catch {}
              setOrder(ids);
              say(c.resetDone);
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-sm"
          >
            <RotateCcw size={16} aria-hidden />
            {c.reset}
          </button>
        </div>
        <p role="status" className="sr-only">
          {announce}
        </p>
        <ol className="grid grid-cols-1 gap-4 md:auto-rows-[minmax(180px,auto)] md:grid-cols-4">
          {order.map((id, i) => {
            const t = byId.get(id)!;
            return (
              <li
                key={id}
                data-tile={id}
                draggable
                onDragStart={(e) => {
                  dragId.current = id;
                  setDragging(id);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e) => {
                  if (dragId.current && dragId.current !== id) {
                    e.preventDefault();
                    setOver(id);
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const from = dragId.current;
                  if (from && from !== id) save(moveTo(order, from, id), from);
                  dragId.current = null;
                  setDragging(null);
                  setOver(null);
                }}
                onDragLeave={() => setOver((o) => (o === id ? null : o))}
                onDragEnd={() => {
                  dragId.current = null;
                  setDragging(null);
                  setOver(null);
                }}
                className={cn(
                  "relative flex flex-col gap-3 rounded-3xl p-5 shadow-sm",
                  t.size,
                  tones[t.tone],
                  dragging === id && "opacity-60",
                  over === id && "ring-4 ring-accent",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1 font-mono text-xs opacity-90">
                    <GripVertical size={14} aria-hidden />
                    {t.name}
                  </span>
                  <span className="flex gap-1">
                    {[
                      {
                        delta: -1,
                        label: c.moveUp(t.name),
                        Icon: ArrowUp,
                        disabled: i === 0,
                        k: "up",
                      },
                      {
                        delta: 1,
                        label: c.moveDown(t.name),
                        Icon: ArrowDown,
                        disabled: i === order.length - 1,
                        k: "down",
                      },
                    ].map(({ delta, label, Icon, disabled, k }) => (
                      <button
                        key={k}
                        type="button"
                        aria-label={label}
                        aria-disabled={disabled}
                        data-focus-key={`${id}-${k}`}
                        onClick={() => {
                          if (disabled) return;
                          focusAfterMove.current = `${id}-${k}`;
                          save(move(order, id, delta), id);
                        }}
                        className="flex size-11 items-center justify-center rounded-full border border-border-strong bg-surface text-text aria-disabled:opacity-40"
                      >
                        <Icon size={16} aria-hidden />
                      </button>
                    ))}
                  </span>
                </div>
                {t.body}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
