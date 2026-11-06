"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { useContent } from "@/components/i18n/locale-provider";
import { LAB_RESPONSE, type LabResponseDetail } from "@/lib/lab/events";

// The firewall may light up at most every 400ms: well under 3 flashes per second.
const FLASH_MS = 250;
const FLASH_GAP_MS = 400;
// A burst arrives in one tick; stagger packets so they read as a stream.
const STAGGER_MS = 60;
const TRAVEL_MS = 900;

function PacketStream() {
  const { hudCopy } = useContent();
  const [packets, setPackets] = useState<{ id: number; status: number; delay: number }[]>([]);
  const [hit, setHit] = useState(false);
  const seq = useRef(0);
  const lastFlash = useRef(0);
  const queuedUntil = useRef(0);

  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    };
    const onResponse = (e: Event) => {
      const { status } = (e as CustomEvent<LabResponseDetail>).detail;
      const id = ++seq.current;
      const now = Date.now();
      const delay = Math.max(0, queuedUntil.current - now);
      queuedUntil.current = now + delay + STAGGER_MS;
      setPackets((p) => [...p, { id, status, delay }]);
      later(() => setPackets((p) => p.filter((x) => x.id !== id)), delay + TRAVEL_MS + 50);
      // Only rate-limit blocks hit the firewall; other errors just stop.
      const hitAt = now + delay + TRAVEL_MS * 0.8;
      if (status === 429 && hitAt - lastFlash.current >= FLASH_GAP_MS) {
        lastFlash.current = hitAt;
        later(() => setHit(true), hitAt - now);
        later(() => setHit(false), hitAt - now + FLASH_MS);
      }
    };
    window.addEventListener(LAB_RESPONSE, onResponse);
    return () => {
      window.removeEventListener(LAB_RESPONSE, onResponse);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    // Decorative: the lab's log and status line carry the same information as text.
    <div className="cp-hud" aria-hidden data-testid="cp-hud">
      <span className="cp-hud__label" style={{ left: 6 }}>
        {hudCopy.client}
      </span>
      <span className="cp-hud__label" style={{ left: "calc(62% + 8px)" }}>
        {hudCopy.firewall}
      </span>
      <span className="cp-hud__label" style={{ right: 6 }}>
        {hudCopy.server}
      </span>
      <span className="cp-hud__wall" data-hit={hit} />
      {packets.map((p) => (
        <span
          key={p.id}
          className="cp-packet"
          data-ok={p.status === 200}
          style={{ animationDelay: `${p.delay}ms` }}
        >
          {p.status === 200
            ? `${hudCopy.packet} 200`
            : p.status === 429
              ? `${hudCopy.blocked} 429`
              : `${hudCopy.packet} ${p.status}`}
        </span>
      ))}
    </div>
  );
}

export default function CyberpunkHud() {
  const slot = useThemeSlot("theme-slot-lab");
  const pathname = usePathname();

  // One-shot glitch the first time each section scrolls into view.
  useEffect(() => {
    const sections = document.querySelectorAll("main section, footer");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("cp-glitch");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.3 },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      io.disconnect();
      sections.forEach((s) => s.classList.remove("cp-glitch"));
    };
  }, [pathname]);

  return slot ? createPortal(<PacketStream />, slot) : null;
}
