// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { contactCopy } from "@/content/home";
import { validate } from "./contact";
import { deliver, memoryMessages, sendEmail, type StoredMessage } from "./contact-delivery";

const form = (fields: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
};
const valid = {
  name: "Lan Tran",
  email: "lan@example.com",
  type: "freelance",
  message: "A booking app for three clinics, live by March.",
};
const e = contactCopy.errors;

describe("validate", () => {
  it("accepts a valid message, trims, and drops an empty phone", () => {
    const r = validate(form({ ...valid, name: "  Lan Tran ", phone: "" }));
    expect(r).toEqual({ ok: true, data: valid });
  });

  it("reports every invalid field and keeps the values", () => {
    const r = validate(
      form({ name: "", email: "nope", type: "budget", message: "short", phone: "abc" }),
    );
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors).toEqual({
      name: e.nameRequired,
      email: e.emailInvalid,
      type: e.typeRequired,
      message: e.messageShort,
      phone: e.phoneInvalid,
    });
    expect(r.values.email).toBe("nope");
  });

  it("enforces lengths and accepts phone formats", () => {
    const long = validate(form({ ...valid, name: "x".repeat(101), message: "x".repeat(4001) }));
    expect(long.ok || long.errors).toEqual({ name: e.nameLong, message: e.messageLong });
    expect(validate(form({ ...valid, phone: "+84 339 696 831" })).ok).toBe(true);
    expect(validate(form({ ...valid, email: "" })).ok).toBe(false);
  });

  it("keeps names on one line (they go into the email subject)", () => {
    const r = validate(form({ ...valid, name: "x\nEmail: evil@example.com" }));
    expect(r.ok || r.errors.name).toBe(e.nameInvalid);
  });

  it("has no budget field", () => {
    expect(validate(form({ ...valid, budget: "5000" }))).toEqual({ ok: true, data: valid });
  });
});

describe("delivery", () => {
  afterEach(() => vi.unstubAllEnvs());
  const msg: StoredMessage = { ...valid, type: "freelance", id: "1", at: "2026-11-01T00:00:00Z" };

  it("emails through Resend only when RESEND_API_KEY is set", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubEnv("RESEND_API_KEY", "");
    expect(await sendEmail(msg, fetch)).toBe(false);
    expect(fetch).not.toHaveBeenCalled();

    vi.stubEnv("RESEND_API_KEY", "re_test");
    expect(await sendEmail(msg, fetch)).toBe(true);
    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    expect(JSON.parse(init.body)).toMatchObject({
      to: ["manhcuongmvc@gmail.com"],
      reply_to: valid.email,
    });
  });

  it("stores before mailing, so a mail failure loses nothing", async () => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 500 })));
    const store = memoryMessages();
    const saved = await deliver({ ...valid, type: "consulting" }, store);
    expect(await store.list()).toEqual([saved]);
    vi.unstubAllGlobals();
  });
});
