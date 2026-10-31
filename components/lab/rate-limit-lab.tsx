"use client";

import { useEffect, useState } from "react";
import { lab } from "@/content/home";
import { project, windowResetsIn, type Snapshot } from "@/lib/lab/meter";
import type { Algo } from "@/lib/rate-limit/algorithms";
import { LIMITS } from "@/lib/rate-limit/algorithms";
import { cn } from "@/lib/utils";

interface LogRow {
  id: number;
  time: string;
  code: number;
  msg: string;
}

const LOG_SIZE = 8;
const ALGOS: { id: Algo; label: string }[] = [
  { id: "token", label: lab.ui.token },
  { id: "window", label: lab.ui.window },
];

let seq = 0;
const stamp = (d = new Date()) =>
  `${d.toTimeString().slice(0, 8)}.${String(d.getMilliseconds()).padStart(3, "0")}`;

export function RateLimitLab() {
  const [algo, setAlgo] = useState<Algo>("token");
  const [snapshots, setSnapshots] = useState<Partial<Record<Algo, Snapshot>>>({});
  const [counts, setCounts] = useState({ ok: 0, blocked: 0 });
  const [log, setLog] = useState<LogRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState("");
  const [now, setNow] = useState(0);

  const snapshot = snapshots[algo];
  const level = project(algo, snapshot, now);

  // Tick only while capacity is still coming back.
  useEffect(() => {
    if (!snapshot || project(algo, snapshot, Date.now()) >= snapshot.limit) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [algo, snapshot, now]);

  async function ping(): Promise<LogRow> {
    try {
      const res = await fetch(`/api/ping?algo=${algo}`, { cache: "no-store" });
      const remaining = Number(res.headers.get("X-RateLimit-Remaining") ?? 0);
      const resetMs = Number(res.headers.get("X-RateLimit-Reset-Ms") ?? 0);
      const at = Date.now();
      if (res.status === 200 || res.status === 429) {
        setSnapshots((s) => ({
          ...s,
          [algo]: { remaining, resetMs, limit: LIMITS.capacity, at },
        }));
        setNow(at);
      }
      const msg =
        res.status === 200
          ? `OK · X-RateLimit-Remaining: ${remaining}`
          : res.status === 429
            ? `Too Many Requests · Retry-After: ${res.headers.get("Retry-After")}s`
            : `Error · ${res.statusText || "unavailable"}`;
      return { id: ++seq, time: stamp(), code: res.status, msg };
    } catch {
      return { id: ++seq, time: stamp(), code: 0, msg: "Network error" };
    }
  }

  async function send(n: number) {
    setBusy(true);
    const rows = await Promise.all(Array.from({ length: n }, ping));
    const ok = rows.filter((r) => r.code === 200).length;
    const blocked = rows.filter((r) => r.code === 429).length;
    setCounts((c) => ({ ok: c.ok + ok, blocked: c.blocked + blocked }));
    setLog((l) => [...rows.toReversed(), ...l].slice(0, LOG_SIZE));
    setSummary(`${n} sent: ${ok} × 200, ${blocked} × 429.`);
    setBusy(false);
  }

  async function reset() {
    setBusy(true);
    await fetch(`/api/ping?algo=${algo}`, { method: "DELETE" }).catch(() => {});
    setSnapshots((s) => ({ ...s, [algo]: undefined }));
    setCounts({ ok: 0, blocked: 0 });
    setLog([]);
    setSummary(lab.ui.resetDone);
    setBusy(false);
  }

  const pct = Math.round((level / LIMITS.capacity) * 100);
  const low = pct <= 20;
  const resetsIn = algo === "window" ? windowResetsIn(snapshot, now) : null;
  const meterLabel =
    algo === "token"
      ? lab.ui.tokensLabel
      : resetsIn
        ? `${lab.ui.windowLabel} · resets in ${resetsIn}s`
        : lab.ui.windowLabel;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-[18px] py-3.5">
        <span className="font-mono text-sm text-text-2">
          <span className="text-accent">GET</span> /api/ping
        </span>
        <div
          role="group"
          aria-label={lab.ui.algorithm}
          className="flex gap-1.5 rounded-[10px] bg-bg p-1"
        >
          {ALGOS.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={algo === a.id}
              onClick={() => setAlgo(a.id)}
              className={cn(
                "min-h-11 rounded-[7px] px-3.5 text-sm font-semibold transition-colors duration-150",
                algo === a.id ? "bg-surface-2 text-text" : "text-text-muted hover:text-text",
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between gap-3 font-mono text-sm">
            <span id="lab-meter-label" className="text-text-muted">
              {meterLabel}
            </span>
            <span>
              {level} / {LIMITS.capacity}
            </span>
          </div>
          <div
            role="meter"
            aria-labelledby="lab-meter-label"
            aria-valuemin={0}
            aria-valuemax={LIMITS.capacity}
            aria-valuenow={level}
            aria-valuetext={`${level} of ${LIMITS.capacity} requests left`}
            className="h-3 overflow-hidden rounded-md bg-bg"
          >
            <div
              className={cn(
                "h-full rounded-md transition-[width] duration-200",
                low ? "bg-danger" : "bg-accent",
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={busy}
            onClick={() => send(1)}
            className="min-h-11 rounded-[10px] bg-accent px-5 text-[15px] font-semibold text-accent-contrast disabled:opacity-60"
          >
            {lab.ui.send}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => send(10)}
            className="min-h-11 rounded-[10px] border border-border-strong px-5 text-[15px] font-medium text-text disabled:opacity-60"
          >
            {lab.ui.burst}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={reset}
            className="min-h-11 rounded-[10px] px-4 text-[15px] text-text-muted hover:text-text disabled:opacity-60"
          >
            {lab.ui.reset}
          </button>
          <div className="ml-auto flex gap-4 font-mono text-sm" aria-label={lab.ui.counters}>
            <span className="text-accent" data-testid="count-200">
              200 × {counts.ok}
            </span>
            <span className="text-danger" data-testid="count-429">
              429 × {counts.blocked}
            </span>
          </div>
        </div>

        <p role="status" className="sr-only">
          {summary}
        </p>

        <ol
          aria-label={lab.ui.logLabel}
          className="flex min-h-[236px] flex-col rounded-[10px] bg-bg px-4 py-3.5 font-mono text-[13px] leading-[1.75]"
        >
          {log.length === 0 && <li className="text-text-subtle">{lab.ui.empty}</li>}
          {log.map((r) => (
            <li key={r.id} className="flex gap-3.5 overflow-hidden whitespace-nowrap">
              <span className="text-text-subtle">{r.time}</span>
              <span className={cn("font-bold", r.code === 200 ? "text-accent" : "text-danger")}>
                {r.code || "ERR"}
              </span>
              <span className="truncate text-text-secondary">{r.msg}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
