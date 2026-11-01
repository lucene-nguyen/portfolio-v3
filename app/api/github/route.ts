import { profile } from "@/content/home";

// Dynamic route + in-memory cache of the last *successful* response, so a GitHub outage is never cached.
export const dynamic = "force-dynamic";

const TTL_MS = 60 * 60 * 1000;
const user = new URL(profile.github).pathname.slice(1);

interface GhEvent {
  type: string;
  repo: { name: string };
  created_at: string;
}
interface Payload {
  user: string;
  publicRepos: number;
  events: { type: string; repo: string; at: string }[];
  fetchedAt: string;
}

let cached: { data: Payload; at: number } | undefined;

async function fetchGithub(): Promise<Payload> {
  // Unauthenticated limit is 60 requests/hour per IP; a token (optional) raises it.
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  // A slow GitHub must not hang the panel: give up after 5s and report it unavailable.
  const signal = AbortSignal.timeout(5000);
  const [u, ev] = await Promise.all([
    fetch(`https://api.github.com/users/${user}`, { headers, cache: "no-store", signal }),
    fetch(`https://api.github.com/users/${user}/events/public?per_page=5`, {
      headers,
      cache: "no-store",
      signal,
    }),
  ]);
  if (!u.ok || !ev.ok) throw new Error(`GitHub ${u.status}/${ev.status}`);
  const { public_repos } = (await u.json()) as { public_repos: number };
  const events = ((await ev.json()) as GhEvent[]).map((e) => ({
    type: e.type.replace(/Event$/, ""),
    repo: e.repo.name,
    at: e.created_at,
  }));
  return { user, publicRepos: public_repos, events, fetchedAt: new Date().toISOString() };
}

export async function GET() {
  if (!cached || Date.now() - cached.at > TTL_MS) {
    try {
      cached = { data: await fetchGithub(), at: Date.now() };
    } catch (e) {
      console.error("github unavailable", e);
      // Serve stale data if we have any; otherwise report the outage (not cached).
      if (!cached)
        return Response.json(
          { error: "GitHub unavailable" },
          { status: 503, headers: { "Cache-Control": "no-store" } },
        );
    }
  }
  return Response.json(cached.data, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" },
  });
}
