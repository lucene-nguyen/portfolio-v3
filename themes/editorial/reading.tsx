"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Libre_Bodoni } from "next/font/google";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { readingCopy } from "@/content/home";
import "./editorial.css";

// Loaded only with this chunk, i.e. only while the Editorial theme is active.
const bodoni = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-bodoni",
});

const SIZE_KEY = "editorial:text-size";
const SIZES = ["s", "m", "l"] as const;
type Size = (typeof SIZES)[number];
const WORDS_PER_MINUTE = 230;

function readSize(): Size {
  try {
    const v = localStorage.getItem(SIZE_KEY);
    return (SIZES as readonly string[]).includes(v ?? "") ? (v as Size) : "m";
  } catch {
    return "m";
  }
}

function ReadingTools() {
  const [size, setSize] = useState<Size>(readSize);
  const radios = useRef<(HTMLButtonElement | null)[]>([]);
  const [{ minutes, toc }] = useState(() => {
    // Body only: header, metrics and tags are not reading.
    const article = document.querySelector(".prose-body");
    const words = article?.textContent?.trim().split(/\s+/).length ?? 0;
    return {
      minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
      toc: [...(article?.querySelectorAll("h2[id]") ?? [])].map((h) => ({
        id: h.id,
        text: h.textContent ?? "",
      })),
    };
  });

  useEffect(() => {
    document.documentElement.dataset.readingSize = size;
    try {
      localStorage.setItem(SIZE_KEY, size);
    } catch {}
  }, [size]);
  useEffect(() => () => void delete document.documentElement.dataset.readingSize, []);

  return (
    <div className="mt-8 flex flex-col gap-5 border-y border-border py-5">
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-sm">
        <span className="text-text-muted">{readingCopy.readTime(minutes)}</span>
        <div
          role="radiogroup"
          aria-label={readingCopy.textSize}
          className="flex gap-1"
          onKeyDown={(e) => {
            // Radio-group keyboard model: arrows move and select.
            const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
            if (!step) return;
            e.preventDefault();
            const next = (SIZES.indexOf(size) + step + SIZES.length) % SIZES.length;
            setSize(SIZES[next]);
            radios.current[next]?.focus();
          }}
        >
          {SIZES.map((s, i) => (
            <button
              key={s}
              ref={(el) => {
                radios.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={size === s}
              tabIndex={size === s ? 0 : -1}
              onClick={() => setSize(s)}
              className={`min-h-11 min-w-11 border px-2 ${
                size === s ? "border-accent bg-accent text-accent-contrast" : "border-border-strong text-text"
              }`}
              style={{ fontSize: s === "s" ? 13 : s === "m" ? 16 : 19 }}
            >
              <span aria-hidden>A</span>
              <span className="sr-only">{readingCopy.sizes[s]}</span>
            </button>
          ))}
        </div>
      </div>
      {toc.length > 0 && (
        <nav aria-label={readingCopy.toc}>
          <p className="mb-2 font-mono text-xs tracking-wide text-text-muted uppercase">
            {readingCopy.toc}
          </p>
          <ol className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-accent underline underline-offset-2">
                  {t.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 100);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      role="progressbar"
      aria-label={readingCopy.progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className="ed-progress"
      style={{ transform: `scaleX(${pct / 100})` }}
    />
  );
}

export default function EditorialReading() {
  const pathname = usePathname();
  const slot = useThemeSlot("theme-slot-article");

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add(bodoni.variable);
    return () => html.classList.remove(bodoni.variable);
  }, []);

  if (!pathname.startsWith("/work/") || !slot) return null;
  return (
    <>
      {createPortal(
        // Inside <main> (via the slot) so the fixed bar sits in a landmark.
        <>
          <ProgressBar />
          <ReadingTools />
        </>,
        slot,
        pathname, // key: fresh read time and contents per article
      )}
    </>
  );
}
