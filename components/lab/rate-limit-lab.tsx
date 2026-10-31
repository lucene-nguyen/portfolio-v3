"use client";

import { useEffect, useState } from "react";
import { lab } from "@/content/home";
import { recordRateLimited } from "@/lib/achievements";
import { project, windowResetsIn, type Snapshot } from "@/lib/lab/meter";
import { LIMITS, type Algo } from "@/lib/rate-limit/algorithms";
import { cn } from "@/lib/utils";

interface LogRow {
  id: number;
  time: string;
  code: number;
  msg: string;
  snapshot?: Snapshot;
}

const LOG_SIZE = 8;
const ALGOS: { id: Algo; label: string }[] = [
  { id: "token", label: lab.ui.token },
  { id: "window", label: lab.ui.window },
];

let seq = 0;
const stamp = (d = new Date()) =>
  `${d.toTimeString().slice(0, 8)}.${String(d.getMilliseconds()).padStart(3, "0")}`;

/** Responses of a burst arrive out of order; the most-drained one is closest to the server state. */
function mostDrained(rows: LogRow[]): Snapshot | undefined {
  return rows
    .map((r) => r.snapshot)
    .filter((s): s is Snapshot => !!s)
    .sort((a, b) => a.remaining - b.remaining || b.resetMs - a.resetMs)[0];
}

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
  const refilling = !!snapshot && level < snapshot.limit;
  useEffect(() => {
    if (!refilling) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [refilling]);

  async function ping(): Promise<LogRow> {
    try {
      const res = await fetch(`/api/ping?algo=${algo}`, { cache: "no-store" });
      const remaining = Number(res.headers.get("X-RateLimit-Remaining") ?? 0);
      const resetMs = Number(res.headers.get("X-RateLimit-Reset-Ms") ?? 0);
      const limited = res.status === 200 || res.status === 429;
      const msg =
        res.status === 200
          ? `${lab.ui.ok} · X-RateLimit-Remaining: ${remaining}`
          : res.status === 429
            ? `${lab.ui.tooMany} · Retry-After: ${res.headers.get("Retry-After")}s`
            : `${lab.ui.error} · ${res.status}`;
      return {
        id: ++seq,
        time: stamp(),
        code: res.status,
        msg,
        snapshot: limited
          ? { remaining, resetMs, limit: LIMITS.capacity, at: Date.now() }
          : undefined,
      };
    } catch {
      return { id: ++seq, time: stamp(), code: 0, msg: lab.ui.networkError };
    }
  }

  async function send(n: number) {
    if (busy) return;
    setBusy(true);
    const rows = await Promise.all(Array.from({ length: n }, ping));
    const latest = mostDrained(rows);
    if (latest) {
      setSnapshots((s) => ({ ...s, [algo]: latest }));
      setNow(Date.now());
    }
    const ok = rows.filter((r) => r.code === 200).length;
    const blocked = rows.filter((r) => r.code === 429).length;
    if (blocked) recordRateLimited();
    setCounts((c) => ({ ok: c.ok + ok, blocked: c.blocked + blocked }));
    setLog((l) => [...[...rows].reverse(), ...l].slice(0, LOG_SIZE));
    setSummary(`${stamp()}: ${lab.ui.sent(n, ok, blocked)}`);
    setBusy(false);
  }

  async function reset() {
    if (busy) return;
    setBusy(true);
    // Counters and log cover both algorithms, so reset both limiters.
    const results = await Promise.all(
      ALGOS.map((a) =>
        fetch(`/api/ping?algo=${a.id}`, { method: "DELETE" }).then(
          (r) => r.ok,
          () => false,
        ),
      ),
    );
    if (results.every(Boolean)) {
      setSnapshots({});
      setCounts({ ok: 0, blocked: 0 });
      setLog([]);
      setSummary(`${stamp()}: ${lab.ui.resetDone}`);
    } else {
      setSummary(`${stamp()}: ${lab.ui.resetFailed}`);
    }
    setBusy(false);
  }

  const pct = Math.round((level / LIMITS.capacity) * 100);
  const low = pct <= 20;
  const resetsIn = algo === "window" ? windowResetsIn(snapshot, now) : null;
  const meterLabel =
    algo === "token"
      ? lab.ui.tokensLabel
      : resetsIn
        ? `${lab.ui.windowLabel} · ${lab.ui.resetsIn(resetsIn)}`
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
              onClick={() => {
                setAlgo(a.id);
                setNow(Date.now());
              }}
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
            aria-valuetext={lab.ui.meterText(level, LIMITS.capacity)}
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
            aria-disabled={busy}
            onClick={() => send(1)}
            className="min-h-11 rounded-[10px] bg-accent px-5 text-[15px] font-semibold text-accent-contrast aria-disabled:opacity-60"
          >
            {lab.ui.send}
          </button>
          <button
            type="button"
            aria-disabled={busy}
            onClick={() => send(10)}
            className="min-h-11 rounded-[10px] border border-border-strong px-5 text-[15px] font-medium text-text aria-disabled:opacity-60"
          >
            {lab.ui.burst}
          </button>
          <button
            type="button"
            aria-disabled={busy}
            onClick={reset}
            className="min-h-11 rounded-[10px] px-4 text-[15px] text-text-muted hover:text-text aria-disabled:opacity-60"
          >
            {lab.ui.reset}
          </button>
          <div
            role="group"
            className="ml-auto flex gap-4 font-mono text-sm"
            aria-label={lab.ui.counters}
          >
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
