import { createHmac } from "node:crypto";

// Per-visitor id; the IP is HMAC-ed with a secret salt so raw addresses are never stored or recoverable.
// Relies on the host (Vercel) overwriting x-forwarded-for; elsewhere the header can be spoofed.
export function visitorId(headers: Headers): string {
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "local";
  return createHmac("sha256", process.env.RL_SALT || "dev-salt")
    .update(ip)
    .digest("hex")
    .slice(0, 16);
}
