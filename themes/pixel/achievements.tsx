"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Press_Start_2P } from "next/font/google";
import { Trophy } from "lucide-react";
import { createPortal } from "react-dom";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { achievementsCopy } from "@/content/home";
import { CHANGE_EVENT, evaluate, loadProgress, type Achievement } from "@/lib/achievements";
import { themes } from "@/themes/registry";
import "./pixel.css";

// Loaded only with this chunk, i.e. only while the Pixel theme is active.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const SOUND_KEY = "pixel:sound";
const ids = themes.map((t) => t.id);

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
// Snapshot must be referentially stable: serialize.
const getSnapshot = () => JSON.stringify(evaluate(loadProgress(), ids));
const getServerSnapshot = () =>
  JSON.stringify(evaluate({ readCaseStudy: false, hit429: false, themesSeen: [] }, ids));

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.setValueAtTime(990, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    osc.connect(gain).connect(ctx.destination);
    osc.onended = () => ctx.close();
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch {}
}

export default function PixelAchievements() {
  const navSlot = useThemeSlot("theme-slot-nav");
  const list: Achievement[] = JSON.parse(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [sound, setSound] = useState(() => {
    try {
      return typeof window !== "undefined" && localStorage.getItem(SOUND_KEY) === "on";
    } catch {
      return false;
    }
  });
  const [toast, setToast] = useState("");
  const unlockedRef = useRef<Set<string> | null>(null);

  // Pixel heading font: the variable lives on <html> only while this theme is active.
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add(pressStart.variable);
    return () => html.classList.remove(pressStart.variable);
  }, []);

  // Announce newly unlocked achievements (not ones unlocked before this mount).
  const unlockedKey = list
    .filter((a) => a.unlocked)
    .map((a) => a.id)
    .join(",");
  useEffect(() => {
    const now = new Set(unlockedKey ? unlockedKey.split(",") : []);
    const before = unlockedRef.current;
    unlockedRef.current = now;
    if (!before) return;
    const fresh = [...now].filter((id) => !before.has(id));
    if (!fresh.length) return;
    const names = fresh
      .map((id) => achievementsCopy.items[id as Achievement["id"]].name)
      .join(", ");
    setToast(`${achievementsCopy.unlocked}: ${names}`);
    if (sound) beep();
  }, [unlockedKey, sound]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const toggleSound = (on: boolean) => {
    setSound(on);
    try {
      localStorage.setItem(SOUND_KEY, on ? "on" : "off");
    } catch {}
  };

  const done = list.filter((a) => a.unlocked).length;

  return (
    <>
      {/* Desktop: floating button (spacer keeps it off the end of the page). Mobile: entry in the nav menu. */}
      <div aria-hidden className="hidden h-20 md:block" />
      {navSlot &&
        createPortal(
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            aria-haspopup="dialog"
            className="flex min-h-11 items-center gap-2 font-mono text-sm text-text md:hidden"
          >
            <Trophy size={18} aria-hidden className="text-accent" />
            {achievementsCopy.button} {done}/{list.length}
          </button>,
          navSlot,
        )}
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        className="fixed right-4 bottom-4 z-40 hidden min-h-11 items-center gap-2 border-2 border-border-strong bg-surface px-4 font-mono text-sm text-text md:inline-flex"
      >
        <Trophy size={18} aria-hidden className="text-accent" />
        {achievementsCopy.button} {done}/{list.length}
      </button>

      <p role="status" className="fixed right-4 bottom-20 z-40 max-w-xs">
        {toast && (
          <span className="block border-2 border-accent bg-bg px-3 py-2 font-mono text-sm text-text">
            {toast}
          </span>
        )}
      </p>

      <dialog
        ref={dialogRef}
        aria-labelledby="achievements-title"
        className="m-auto w-[min(92vw,520px)] border-2 border-border-strong bg-bg p-6 text-text backdrop:bg-bg/70"
      >
        <h2 id="achievements-title" className="font-heading text-lg">
          {achievementsCopy.title}
        </h2>
        <ul className="mt-5 flex flex-col gap-3">
          {list.map((a) => {
            const copy = achievementsCopy.items[a.id];
            return (
              <li key={a.id} className="border-2 border-border bg-surface p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold">{copy.name}</span>
                  <span
                    className={
                      a.unlocked
                        ? "font-mono text-sm text-accent"
                        : "font-mono text-sm text-text-muted"
                    }
                  >
                    {a.unlocked ? achievementsCopy.statusUnlocked : achievementsCopy.statusLocked}
                    {a.progress && ` · ${a.progress}`}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-secondary">{copy.hint}</p>
              </li>
            );
          })}
        </ul>
        <label className="mt-5 flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={sound}
            onChange={(e) => toggleSound(e.target.checked)}
            className="size-5 accent-accent"
          />
          {achievementsCopy.sound}
        </label>
        <form method="dialog" className="mt-4">
          <button
            type="submit"
            className="min-h-11 border-2 border-border-strong px-4 font-mono text-sm"
          >
            {achievementsCopy.close}
          </button>
        </form>
      </dialog>
    </>
  );
}
