// Metrics derived only from content/ (no invented numbers).

const parseMonth = (mmYYYY: string) => {
  const [m, y] = mmYYYY.trim().split("/").map(Number);
  return new Date(Date.UTC(y, m - 1, 1));
};

export interface Role {
  period: string; // "MM/YYYY – MM/YYYY"
  company: string;
}

export function timeline(roles: readonly Role[]) {
  const spans = roles.map((r) => {
    const [from, to] = r.period.split(/\s*[–-]\s*/).map(parseMonth);
    return { company: r.company, from, to };
  });
  const start = Math.min(...spans.map((s) => +s.from));
  const end = Math.max(...spans.map((s) => +s.to));
  return {
    start: new Date(start),
    end: new Date(end),
    years: (end - start) / (365.25 * 24 * 3600 * 1000),
    spans: spans.map((s) => ({
      ...s,
      offset: (+s.from - start) / (end - start),
      width: (+s.to - +s.from) / (end - start),
    })),
  };
}

/** How many case studies use each technology tag, most used first. */
export function stackUsage(studies: readonly { tags: readonly string[] }[]) {
  const counts = new Map<string, number>();
  for (const s of studies) for (const t of s.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
