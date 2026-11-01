"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { container } from "@/components/home/ui";
import { labels, stickerCopy as c, work } from "@/content/home";
import { projectsWith, skills, STICKER_FILLS } from "./stickers";

const DRAG_THRESHOLD = 4;
// Deterministic scatter so server and client agree and the board looks hand-placed.
const tilt = (i: number) => ((i * 37) % 13) - 6;

export function StickerBoard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const drag = useRef<{
    skill: string;
    x: number;
    y: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);

  const toggle = (skill: string) => setSelected((s) => (s === skill ? null : skill));
  const shown = selected ? projectsWith(selected) : work.items;

  return (
    <section aria-labelledby="stickers-title" className="border-b-[3px] border-black">
      <div className={`${container} flex flex-col gap-6 py-12`}>
        <div>
          <h2 id="stickers-title" className="text-[32px] font-extrabold">
            {c.title}
          </h2>
          <p className="text-text-secondary">{c.hint}</p>
        </div>

        {/* Board: stickers are buttons (click/Enter filters); dragging only moves them around. */}
        <div
          className="nb-card relative flex min-h-56 flex-wrap content-start gap-4 bg-surface-2 p-6"
          data-testid="sticker-board"
        >
          {skills.map((skill, i) => {
            const o = offsets[skill] ?? { x: 0, y: 0 };
            return (
              <button
                key={skill}
                type="button"
                aria-pressed={selected === skill}
                className="nb-sticker relative min-h-11 px-4 py-2 font-mono text-sm font-bold text-black select-none"
                style={
                  {
                    background: STICKER_FILLS[i % STICKER_FILLS.length],
                    "--r": `${tilt(i)}deg`,
                    transform: `translate(${o.x}px, ${o.y}px) rotate(${tilt(i)}deg)`,
                  } as React.CSSProperties
                }
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  drag.current = {
                    skill,
                    x: e.clientX,
                    y: e.clientY,
                    ox: o.x,
                    oy: o.y,
                    moved: false,
                  };
                }}
                onPointerMove={(e) => {
                  const d = drag.current;
                  if (!d || d.skill !== skill) return;
                  const dx = e.clientX - d.x;
                  const dy = e.clientY - d.y;
                  if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
                  d.moved = true;
                  setOffsets((all) => ({ ...all, [skill]: { x: d.ox + dx, y: d.oy + dy } }));
                }}
                onPointerUp={() => {
                  suppressClick.current = !!drag.current?.moved;
                  drag.current = null;
                }}
                onClick={() => {
                  if (suppressClick.current) {
                    suppressClick.current = false;
                    return;
                  }
                  toggle(skill);
                }}
              >
                {skill}
              </button>
            );
          })}
        </div>

        {/* Plain-list alternative with the same filter. */}
        <div>
          <h3 className="mb-2 font-bold">{c.listLabel}</h3>
          <ul className="flex flex-wrap gap-2" aria-label={c.listLabel}>
            <li>
              <button
                type="button"
                aria-pressed={selected === null}
                onClick={() => setSelected(null)}
                className="min-h-11 border-2 border-black bg-surface px-3 text-sm font-bold aria-pressed:bg-accent aria-pressed:text-accent-contrast"
              >
                {c.clear}
              </button>
            </li>
            {skills.map((skill) => (
              <li key={skill}>
                <button
                  type="button"
                  aria-pressed={selected === skill}
                  onClick={() => toggle(skill)}
                  className="min-h-11 border-2 border-black bg-surface px-3 text-sm font-bold aria-pressed:bg-accent aria-pressed:text-accent-contrast"
                >
                  {skill}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p role="status" className="mb-3 font-bold">
            {selected ? c.results(selected, shown.length) : c.all(shown.length)}
          </p>
          <ul className="grid gap-4 md:grid-cols-3">
            {shown.map((w) => (
              <li key={w.slug} className="nb-card bg-surface p-4">
                <p className="font-bold">{w.title}</p>
                <p className="mt-1 font-mono text-xs text-text-muted">{w.tags.join(" · ")}</p>
                <Link
                  href={`/work/${w.slug}`}
                  aria-label={`${labels.readCaseStudy}: ${w.title}`}
                  className="mt-3 inline-block font-bold text-accent underline underline-offset-2"
                >
                  {labels.readCaseStudy}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
