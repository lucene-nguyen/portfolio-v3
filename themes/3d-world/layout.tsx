"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { zones } from "@/lib/world";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Box } from "lucide-react";
import { worldCopy as c } from "@/content/home";
import type { Input, Zone } from "@/lib/world";
import type { SceneHandle } from "./scene";

const CLOSED_KEY = "world:closed";

function initiallyOpen() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(CLOSED_KEY) !== "1";
  } catch {
    return true;
  }
}

function World({ onExit }: { onExit: (zone?: Zone["id"]) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const handle = useRef<SceneHandle | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  // Per-frame values go straight to the DOM (no React re-render per frame).
  const labelEls = useRef(new Map<Zone["id"], HTMLSpanElement>());

  useEffect(() => {
    dialog.current?.showModal();
    host.current?.focus();
    let alive = true;
    // Three.js is only fetched here, i.e. only in this theme.
    import("./scene")
      .then(({ createScene }) => {
        if (!alive || !host.current) return;
        handle.current = createScene(host.current, {
          onEnter: (zone) => onExit(zone.id),
          onFrame: (f, l) => {
            if (host.current) host.current.dataset.fps = String(f);
            for (const { id, x, y } of l) {
              const el = labelEls.current.get(id);
              if (el) {
                el.style.left = `${x}%`;
                el.style.top = `${y}%`;
              }
            }
          },
        });
        setStatus("ready");
      })
      .catch(() => alive && setStatus("failed"));
    return () => {
      alive = false;
      handle.current?.dispose();
      handle.current = null;
    };
  }, [onExit]);

  const pad = (dir: keyof Input, Icon: typeof ArrowUp) => (
    <button
      type="button"
      aria-label={c.pad[dir]}
      onPointerDown={() => handle.current?.press(dir, true)}
      onPointerUp={() => handle.current?.press(dir, false)}
      onPointerLeave={() => handle.current?.press(dir, false)}
      className="flex size-12 items-center justify-center rounded-[10px] border border-border-strong bg-surface/90 text-text"
    >
      <Icon size={20} aria-hidden />
    </button>
  );

  return (
    <dialog
      ref={dialog}
      aria-label={c.title}
      onCancel={(e) => {
        e.preventDefault();
        onExit();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-bg p-0 text-text"
    >
      <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-start justify-between gap-3 bg-bg/80 p-4">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold">{c.title}</h2>
          <p className="text-sm text-text-secondary">{c.instructions}</p>
        </div>
        <button
          type="button"
          onClick={() => onExit()}
          className="min-h-11 rounded-[10px] bg-accent px-4 font-semibold text-accent-contrast"
        >
          {c.skip}
        </button>
      </div>

      <div
        ref={host}
        tabIndex={0}
        role="application"
        aria-label={c.canvasLabel}
        data-testid="world-canvas"
        data-status={status}
        className="absolute inset-0 outline-none focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-accent"
      />

      {/* Zone labels follow the pads on screen (HTML text keeps contrast and scale). */}
      {zones.map((l) => (
        <span
          key={l.id}
          ref={(el) => {
            if (el) labelEls.current.set(l.id, el);
          }}
          aria-hidden
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md bg-bg/85 px-2 py-0.5 font-mono text-sm font-semibold text-accent"
          style={{ left: "-100%", top: "-100%" }}
        >
          {c.zones[l.id]}
        </span>
      ))}

      <p role="status" className="absolute top-1/2 left-1/2 -translate-1/2 text-text-secondary">
        {status === "loading" ? c.loading : status === "failed" ? c.failed : ""}
      </p>

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-4 bg-bg/80 p-4">
        <nav aria-label={c.zonesLabel}>
          <p className="mb-1 text-xs text-text-muted">{c.zonesLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {(Object.keys(c.zones) as Zone["id"][]).map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onExit(id)}
                  className="min-h-11 rounded-[10px] border border-border-strong px-3 text-sm"
                >
                  {c.zones[id]}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid grid-cols-3 gap-1" aria-label="Movement pad" role="group">
          <span />
          {pad("forward", ArrowUp)}
          <span />
          {pad("left", ArrowLeft)}
          {pad("back", ArrowDown)}
          {pad("right", ArrowRight)}
        </div>
      </div>
    </dialog>
  );
}

/** Opens the 3D world over the standard page; skipping or entering a zone returns to the standard layout. */
export default function WorldLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(initiallyOpen);
  const exit = useCallback((zone?: Zone["id"]) => {
    try {
      sessionStorage.setItem(CLOSED_KEY, "1");
    } catch {}
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.getElementById(zone ?? "main");
      if (zone && window.location.pathname === "/") history.replaceState(null, "", `#${zone}`);
      target?.scrollIntoView();
      // Land keyboard and screen-reader users on the section they chose.
      if (target) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus();
      }
    });
  }, []);

  return (
    <>
      {children}
      {open ? (
        <World onExit={exit} />
      ) : (
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches && (
          <>
            <div aria-hidden className="h-20" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="fixed right-4 bottom-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-border-strong bg-surface px-4 text-sm text-text"
            >
              <Box size={18} aria-hidden className="text-accent" />
              {c.enter}
            </button>
          </>
        )
      )}
    </>
  );
}
