"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useThemeSlot } from "@/components/theme/use-theme-slot";
import { hudCopy } from "@/content/home";
import { LAB_RESPONSE, type LabResponseDetail } from "@/lib/lab/events";
import "./cyberpunk.css";

// The firewall may light up at most every 400ms: well under 3 flashes per second.
const FLASH_MS = 250;
const FLASH_GAP_MS = 400;

function PacketStream() {
  const [packets, setPackets] = useState<{ id: number; ok: boolean }[]>([]);
  const [hit, setHit] = useState(false);
  const seq = useRef(0);
  const lastFlash = useRef(0);

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
      const ok = (e as CustomEvent<LabResponseDetail>).detail.status === 200;
      const id = ++seq.current;
      setPackets((p) => [...p, { id, ok }]);
      later(() => setPackets((p) => p.filter((x) => x.id !== id)), 950);
      if (!ok && Date.now() - lastFlash.current >= FLASH_GAP_MS) {
        lastFlash.current = Date.now();
        later(() => setHit(true), 700);
        later(() => setHit(false), 700 + FLASH_MS);
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
        <span key={p.id} className="cp-packet" data-ok={p.ok}>
          {p.ok ? "PKT 200" : `${hudCopy.blocked} 429`}
        </span>
      ))}
    </div>
  );
}

export default function CyberpunkHud() {
  const slot = useThemeSlot("theme-slot-lab");

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
  }, []);

  return slot ? createPortal(<PacketStream />, slot) : null;
}
