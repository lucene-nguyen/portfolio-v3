import { describe, expect, it } from "vitest";
import { contents } from ".";

const { en, vi } = contents;

// Same shape everywhere: every key in English exists in Vietnamese and vice versa (functions included).
const shape = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(shape)
    : v && typeof v === "object"
      ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)]))
      : typeof v;

describe("Vietnamese copy", () => {
  it("has exactly the English shape", () => {
    expect(shape(vi)).toEqual(shape(en));
  });

  it("keeps the facts: links, dates, companies, technologies, ids and numbers", () => {
    const { profile: pe } = en;
    const { profile: pv } = vi;
    for (const k of [
      "email",
      "github",
      "githubLabel",
      "linkedin",
      "resumeUrl",
      "handle",
      "logo",
    ] as const)
      expect(pv[k], k).toBe(pe[k]);
    expect(pv.avatar.src).toBe(pe.avatar.src);
    expect(vi.experience.roles.map((r) => [r.period, r.company])).toEqual(
      en.experience.roles.map((r) => [r.period, r.company]),
    );
    expect(vi.skills.groups.map((g) => g.items)).toEqual(en.skills.groups.map((g) => g.items));
    expect(vi.skills.secondary.items).toEqual(en.skills.secondary.items);
    expect(
      vi.kits.items.map((k) => [k.name, k.state, k.stack, k.href, "demo" in k && k.demo]),
    ).toEqual(en.kits.items.map((k) => [k.name, k.state, k.stack, k.href, "demo" in k && k.demo]));
    expect(vi.collabTypes.map((t) => t.id)).toEqual(en.collabTypes.map((t) => t.id));
    expect(vi.workWithMe.services.map((s) => [s.type, s.kits])).toEqual(
      en.workWithMe.services.map((s) => [s.type, s.kits]),
    );
    expect(vi.contact.zalo).toEqual(en.contact.zalo);
    expect(
      vi.work.items.map((w) => [
        w.slug,
        w.period,
        w.tags,
        w.metrics.map((m) => m.value.replace(/\D/g, "")),
      ]),
    ).toEqual(
      en.work.items.map((w) => [
        w.slug,
        w.period,
        w.tags,
        w.metrics.map((m) => m.value.replace(/\D/g, "")),
      ]),
    );
    // Stats: same numbers (only units are translated).
    expect(vi.hero.stats.map((s) => s.value.replace(/\D/g, ""))).toEqual(
      en.hero.stats.map((s) => s.value.replace(/\D/g, "")),
    );
  });

  it("links to its own home page and switches to English", () => {
    expect(vi.nav.map((n) => n.href)).toEqual(en.nav.map((n) => n.href.replace(/^\//, "/vi")));
    expect(vi.language).toMatchObject({ href: "/", hrefLang: "en" });
    expect(en.language).toMatchObject({ href: "/vi", hrefLang: "vi" });
  });

  it("keeps every number in every string (prose included)", () => {
    const strings = (v: unknown, path = "", out = new Map<string, string>()) => {
      if (typeof v === "string") out.set(path, v);
      else if (Array.isArray(v)) v.forEach((x, i) => strings(x, `${path}[${i}]`, out));
      else if (v && typeof v === "object")
        for (const [k, x] of Object.entries(v)) strings(x, `${path}.${k}`, out);
      return out;
    };
    // Digit runs, ignoring Vietnamese thousands grouping (2.500 = 2,500).
    const digits = (s: string) =>
      (s.replace(/(\d)[.,](\d{3})/g, "$1$2").match(/\d+/g) ?? []).join(" ");
    const vis = strings(vi);
    for (const [path, text] of strings(en)) expect(digits(vis.get(path)!), path).toBe(digits(text));
  });

  it("never shows an active kit without a real link", () => {
    for (const c of [en, vi])
      for (const k of c.kits.items.filter((k) => k.state === "active"))
        expect(k.href, k.name).toMatch(/^https:\/\//);
  });
});
