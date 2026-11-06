// @vitest-environment node
import { beforeEach, expect, it, vi } from "vitest";
import type { Decision } from "./rate-limit/algorithms";

const hit = vi.fn<(...a: unknown[]) => Promise<Decision>>();
const deliver = vi.fn();
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "1.2.3.4" }),
}));
vi.mock("./rate-limit/store", () => ({ getLimiter: () => ({ hit }) }));
vi.mock("./contact-delivery", () => ({ deliver: (...a: unknown[]) => deliver(...a) }));
const { submitContact } = await import("./contact-action");
const { CONTACT_LIMITS } = await import("./contact");
// Server delivery is parked (LEARNING-188); these run with NEXT_PUBLIC_FEATURE_CONTACT_SERVER=on.
const { features } = await import("./features");

const ok: Decision = { allowed: true, limit: 3, remaining: 2, retryAfterMs: 0, resetMs: 1 };
const form = (extra: Record<string, string> = {}) => {
  const f = new FormData();
  const fields = {
    name: "Lan Tran",
    email: "lan@example.com",
    type: "consulting",
    message: "Review our NestJS architecture before launch.",
    ...extra,
  };
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

it.skipIf(!features.contactServer)(
  "honeypot: reports sent, but nothing is limited, stored or sent",
  async () => {
    expect((await submitContact({ status: "idle" }, form({ hp_contact_ref: "x" }))).status).toBe(
      "sent",
    );
    expect(hit).not.toHaveBeenCalled();
    expect(deliver).not.toHaveBeenCalled();
  },
);

it.skipIf(!features.contactServer)(
  "valid: limited per visitor with the contact limits, then delivered",
  async () => {
    hit.mockResolvedValue(ok);
    expect((await submitContact({ status: "idle" }, form())).status).toBe("sent");
    expect(hit).toHaveBeenCalledWith(
      "window",
      expect.stringMatching(/^rl:contact:[0-9a-f]{16}$/),
      CONTACT_LIMITS,
    );
    expect(deliver).toHaveBeenCalledWith(expect.objectContaining({ type: "consulting" }));
  },
);

it.skipIf(!features.contactServer)(
  "invalid input never reaches the limiter or delivery",
  async () => {
    const r = await submitContact({ status: "idle" }, form({ email: "nope" }));
    expect(r.status).toBe("invalid");
    expect(hit).not.toHaveBeenCalled();
  },
);

it.skipIf(!features.contactServer)(
  "over the limit, or the limiter failing: nothing delivered, values kept",
  async () => {
    hit.mockResolvedValue({ ...ok, allowed: false });
    const limited = await submitContact({ status: "idle" }, form());
    expect(limited).toMatchObject({ status: "limited", values: { name: "Lan Tran" } });
    hit.mockRejectedValue(new Error("redis down"));
    const failed = await submitContact({ status: "idle" }, form());
    expect(failed).toMatchObject({ status: "error", values: { email: "lan@example.com" } });
    expect(deliver).not.toHaveBeenCalled();
  },
);
