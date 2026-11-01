import { getStats } from "@/lib/rate-limit/stats";

/** Last 60 s of /api/ping outcomes across all visitors. */
export async function GET() {
  try {
    const seconds = await getStats().last();
    // Many open dashboards share one Redis read every ~2 s via the CDN.
    return Response.json(
      { seconds },
      { headers: { "Cache-Control": "public, s-maxage=2, stale-while-revalidate=3" } },
    );
  } catch (e) {
    console.error("stats unavailable", e);
    return Response.json(
      { error: "Stats unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "5" } },
    );
  }
}
