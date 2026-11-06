// Where an accepted contact message goes (LEARNING-167): log + store, and email only when Resend is set up.
import { Redis } from "@upstash/redis";
import { profile } from "@/content/en/home";
import type { ContactMessage } from "./contact";

export interface StoredMessage extends ContactMessage {
  id: string;
  at: string;
}

export interface MessageStore {
  readonly kind: "redis" | "memory";
  save(m: StoredMessage): Promise<void>;
  list(): Promise<StoredMessage[]>;
}

const KEY = "contact:messages";
const KEEP = 500;

export function redisMessages(redis: Redis): MessageStore {
  return {
    kind: "redis",
    async save(m) {
      await redis.lpush(KEY, JSON.stringify(m));
      await redis.ltrim(KEY, 0, KEEP - 1);
    },
    async list() {
      const rows = await redis.lrange<string | StoredMessage>(KEY, 0, KEEP - 1);
      return rows.map((r) => (typeof r === "string" ? JSON.parse(r) : r));
    },
  };
}

// shortcut: per server instance and lost on restart; fine locally, production uses Redis.
export function memoryMessages(): MessageStore {
  const rows: StoredMessage[] = [];
  return {
    kind: "memory",
    async save(m) {
      rows.unshift(m);
      rows.length = Math.min(rows.length, KEEP);
    },
    async list() {
      return [...rows];
    },
  };
}

let store: MessageStore | undefined;
export function getMessageStore(): MessageStore {
  if (store) return store;
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
    store = redisMessages(Redis.fromEnv());
  // Fail loudly (the form shows the direct email) instead of keeping messages in one instance's memory.
  else if (process.env.VERCEL_ENV === "production")
    throw new Error("UPSTASH_REDIS_REST_URL/TOKEN are required in production");
  else store = memoryMessages();
  return store;
}

/** Emails the owner through Resend's HTTP API; a no-op without RESEND_API_KEY. */
export async function sendEmail(m: StoredMessage, fetchImpl: typeof fetch = fetch) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>",
      to: [profile.email],
      reply_to: m.email,
      subject: `New message (${m.type}) from ${m.name}`,
      text: [
        `Name: ${m.name}`,
        `Email: ${m.email}`,
        `Type: ${m.type}`,
        ...(m.phone ? [`Phone/Zalo: ${m.phone}`] : []),
        "",
        m.message,
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
  return true;
}

/** Stored first, so a mail outage never loses a message. */
export async function deliver(m: ContactMessage, store = getMessageStore()) {
  const stored: StoredMessage = { ...m, id: crypto.randomUUID(), at: new Date().toISOString() };
  await store.save(stored);
  console.info(
    "contact message",
    // Only production keeps message text out of logs (it is in Redis); dev and previews log it all.
    process.env.VERCEL_ENV === "production" ? { id: stored.id, type: stored.type } : stored,
  );
  try {
    await sendEmail(stored);
  } catch (e) {
    console.error("contact email failed (message is stored)", stored.id, e);
  }
  return stored;
}
