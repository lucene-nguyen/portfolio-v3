import { profile } from "@/content/home";

// Public GitHub data, cached for an hour (unauthenticated API limit: 60 requests/hour per server IP).
export const revalidate = 3600;

const user = new URL(profile.github).pathname.slice(1);

interface GhEvent {
  type: string;
  repo: { name: string };
  created_at: string;
}

export async function GET() {
  try {
    const opts = { headers: { Accept: "application/vnd.github+json" }, next: { revalidate } };
    const [u, ev] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, opts),
      fetch(`https://api.github.com/users/${user}/events/public?per_page=30`, opts),
    ]);
    if (!u.ok || !ev.ok) throw new Error(`GitHub ${u.status}/${ev.status}`);
    const { public_repos } = (await u.json()) as { public_repos: number };
    const events = ((await ev.json()) as GhEvent[]).slice(0, 30).map((e) => ({
      type: e.type.replace(/Event$/, ""),
      repo: e.repo.name,
      at: e.created_at,
    }));
    return Response.json({
      user,
      publicRepos: public_repos,
      events,
      fetchedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error("github unavailable", e);
    return Response.json({ error: "GitHub unavailable" }, { status: 503 });
  }
}
