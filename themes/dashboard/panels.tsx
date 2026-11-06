"use client";

import { features } from "@/lib/features";
import { useEffect, useState } from "react";
import { container } from "@/components/home/ui";
import { useContent } from "@/components/i18n/locale-provider";
import { stackUsage, timeline } from "@/lib/dashboard";
import type { SecondBucket } from "@/lib/rate-limit/stats";

const POLL_MS = 5000;
const monthYear = (d: Date) =>
  d.toLocaleDateString("en", { month: "short", year: "numeric", timeZone: "UTC" });

function Panel({
  title,
  source,
  children,
  testId,
}: {
  title: string;
  source: string;
  children: React.ReactNode;
  testId?: string;
}) {
  const { dashboardCopy: c } = useContent();
  return (
    <section
      aria-label={title}
      data-testid={testId}
      className="flex min-w-0 flex-col gap-3 rounded-[4px] border border-border bg-surface p-4"
    >
      <h3 className="font-mono text-sm font-semibold text-text">{title}</h3>
      <div className="flex-1">{children}</div>
      <p className="font-mono text-xs text-text-muted">
        {c.sourceLabel}: {source}
      </p>
    </section>
  );
}

function usePolled<T>(url: string, intervalMs?: number) {
  const [data, setData] = useState<T | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let alive = true;
    // The first load always runs (even in a background tab); polling pauses while hidden.
    const load = (force = false) => {
      if (!force && document.hidden) return;
      fetch(url, { cache: "no-store" })
        // Always read the body: an unread error response keeps the request open in the browser.
        .then((r) => r.json().then((d: T) => (r.ok ? d : Promise.reject(r.status))))
        .then((d: T) => {
          if (!alive) return;
          setData(d);
          setFailed(false);
        })
        .catch(() => alive && setFailed(true));
    };
    load(true);
    const t = intervalMs ? setInterval(() => load(), intervalMs) : undefined;
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [url, intervalMs]);
  return { data, failed };
}

function Sparkline({ seconds }: { seconds: SecondBucket[] }) {
  const { dashboardCopy: c } = useContent();
  const w = 300;
  const h = 64;
  const max = Math.max(1, ...seconds.map((s) => Math.max(s.ok, s.limited)));
  const pts = (key: "ok" | "limited") =>
    seconds
      .map((s, i) => `${(i / (seconds.length - 1)) * w},${h - (s[key] / max) * (h - 4) - 2}`)
      .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={c.traffic.chart}
      className="h-16 w-full"
      preserveAspectRatio="none"
    >
      <polyline
        points={pts("ok")}
        fill="none"
        className="stroke-meter"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        points={pts("limited")}
        fill="none"
        className="stroke-danger"
        strokeWidth="2"
        strokeDasharray="5 4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function TrafficPanel() {
  const { dashboardCopy: c } = useContent();
  const { data, failed } = usePolled<{ seconds: SecondBucket[] }>("/api/stats", POLL_MS);
  const seconds = data?.seconds ?? [];
  const ok = seconds.reduce((a, s) => a + s.ok, 0);
  const limited = seconds.reduce((a, s) => a + s.limited, 0);
  const last10 = seconds.slice(-10).reduce((a, s) => a + s.ok + s.limited, 0) / 10;
  const share = ok + limited ? Math.round((limited / (ok + limited)) * 100) : 0;
  return (
    <Panel title={c.traffic.title} source={c.traffic.source} testId="panel-traffic">
      {failed && (
        <p role="status" className="mb-2 text-sm text-warning">
          {c.unavailable}
        </p>
      )}
      <dl className="grid grid-cols-2 gap-3 font-mono sm:grid-cols-4">
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-text-muted">{c.traffic.rps}</dt>
          <dd className="text-2xl font-bold text-text">{data ? last10.toFixed(1) : "—"}</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-text-muted">
            <span aria-hidden>— </span>
            {c.traffic.ok}
          </dt>
          <dd className="text-2xl font-bold text-meter" data-testid="stat-ok">
            {data ? ok : "—"}
          </dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-text-muted">
            <span aria-hidden>- - </span>
            {c.traffic.limited}
          </dt>
          <dd className="text-2xl font-bold text-danger" data-testid="stat-limited">
            {data ? limited : "—"}
          </dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-text-muted">{c.traffic.ratio}</dt>
          <dd className="text-2xl font-bold text-text">{data ? `${share}%` : "—"}</dd>
        </div>
      </dl>
      {seconds.length > 1 && (
        <div className="mt-3">
          <Sparkline seconds={seconds} />
          {/* Text alternative of the chart (wrapped: tables ignore sr-only's 1px width). */}
          <div className="sr-only">
            <table>
              <caption>{c.traffic.chart}</caption>
              <thead>
                <tr>
                  <th scope="col">second</th>
                  <th scope="col">200</th>
                  <th scope="col">429</th>
                </tr>
              </thead>
              <tbody>
                {seconds
                  .filter((s) => s.ok || s.limited)
                  .map((s) => (
                    <tr key={s.t}>
                      <td>{new Date(s.t * 1000).toISOString().slice(11, 19)}</td>
                      <td>{s.ok}</td>
                      <td>{s.limited}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Panel>
  );
}

interface GithubData {
  user: string;
  publicRepos: number;
  events: { type: string; repo: string; at: string }[];
}

function GithubPanel() {
  const { dashboardCopy: c } = useContent();
  const { data, failed } = usePolled<GithubData>("/api/github");
  return (
    <Panel title={c.github.title} source={c.github.source} testId="panel-github">
      {failed && !data ? (
        <p role="status" className="text-sm text-warning">
          {c.unavailable}
        </p>
      ) : (
        <div className="flex flex-col gap-3 font-mono">
          <p>
            <span className="text-2xl font-bold text-text">{data ? data.publicRepos : "—"}</span>{" "}
            <span className="text-xs text-text-muted">{c.github.repos}</span>
          </p>
          <p className="text-xs text-text-muted">{c.github.events}</p>
          <ul className="flex flex-col gap-1 text-xs text-text-secondary">
            {data?.events.slice(0, 5).map((e, i) => (
              <li key={i} className="truncate">
                {e.at.slice(0, 10)} · {e.type} · {e.repo}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  );
}

export function Panels() {
  const { dashboardCopy: c, experience, work } = useContent();
  const t = timeline(experience.roles);
  const usage = stackUsage(work.items);
  const top = Math.max(...usage.map((u) => u.count));
  return (
    <section aria-labelledby="dashboard-title" className="border-b border-border">
      <div className={`${container} flex flex-col gap-5 py-12`}>
        <div>
          <p className="mb-2 font-mono text-sm text-accent">{c.eyebrow}</p>
          <h2 id="dashboard-title" className="text-[32px] font-bold">
            {c.title}
          </h2>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
          {/* Live traffic comes from the lab: parked with it (LEARNING-164). */}
          {features.lab && (
            <div className="min-w-0 lg:col-span-2">
              <TrafficPanel />
            </div>
          )}
          <GithubPanel />
          <Panel title={c.career.title} source={c.career.source}>
            <p className="font-mono">
              <span className="text-2xl font-bold text-text">{Math.floor(t.years)}+</span>{" "}
              <span className="text-xs text-text-muted">{c.career.years}</span>
            </p>
            <p className="font-mono text-xs text-text-muted">
              {c.career.since(monthYear(t.start))}
            </p>
          </Panel>
          <Panel title={c.stack.title} source={c.stack.source}>
            <ul className="flex flex-col gap-1.5 font-mono text-xs" aria-label={c.stack.caption}>
              {usage.slice(0, 6).map((u) => (
                <li key={u.tag} className="flex items-center gap-2">
                  <span className="w-28 shrink-0 truncate text-text-secondary">
                    {u.tag}
                    <span className="sr-only">: </span>
                  </span>
                  <span
                    aria-hidden
                    className="h-2 rounded-sm bg-accent"
                    style={{ width: `${(u.count / top) * 60}%` }}
                  />
                  <span className="text-text">{u.count}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title={c.timeline.title} source={c.timeline.source}>
            <ol className="flex flex-col gap-2 font-mono text-xs">
              {t.spans.map((s) => (
                <li key={s.company + s.from.toISOString()}>
                  <span className="text-text-secondary">
                    {s.company} · {monthYear(s.from)} – {monthYear(s.to)}
                  </span>
                  <span aria-hidden className="mt-1 block h-2 rounded-sm bg-surface-2">
                    <span
                      className="block h-2 rounded-sm bg-accent"
                      style={{ marginLeft: `${s.offset * 100}%`, width: `${s.width * 100}%` }}
                    />
                  </span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </section>
  );
}
