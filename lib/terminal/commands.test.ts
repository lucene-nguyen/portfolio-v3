import { describe, expect, it } from "vitest";
import { complete, run, type TerminalContext } from "./commands";

const ctx: TerminalContext = {
  projects: [
    { slug: "pharmacy-inventory", title: "Inventory" },
    { slug: "ai-image-pipeline", title: "AI" },
  ],
  themes: [
    { id: "night-terminal", name: "Night terminal" },
    { id: "editorial", name: "Editorial" },
  ],
  resume: ["Name", "Role"],
};

describe("run", () => {
  it("lists help", () => expect(run("help", ctx).lines.length).toBeGreaterThan(5));
  it("lists projects", () => {
    expect(run("ls projects", ctx).lines.map((l) => l.text.split(/\s+/)[0])).toEqual([
      "pharmacy-inventory",
      "ai-image-pipeline",
    ]);
  });
  it("prints the resume", () =>
    expect(run("cat resume", ctx).lines.map((l) => l.text)).toEqual(["Name", "Role"]));
  it("opens a case study", () =>
    expect(run("open ai-image-pipeline", ctx).action).toEqual({
      type: "navigate",
      href: "/work/ai-image-pipeline",
    }));
  it("rejects an unknown case study", () => {
    const r = run("open nope", ctx);
    expect(r.action).toBeUndefined();
    expect(r.lines[0]).toMatchObject({ kind: "err" });
  });
  it("switches theme", () =>
    expect(run("theme editorial", ctx).action).toEqual({ type: "theme", id: "editorial" }));
  it("lists themes without an argument", () => expect(run("theme", ctx).lines).toHaveLength(2));
  it("rejects an unknown theme", () => expect(run("theme x", ctx).lines[0].kind).toBe("err"));
  it("goes to contact", () =>
    expect(run("contact", ctx).action).toEqual({ type: "navigate", href: "/#contact" }));
  it("clears", () => expect(run("clear", ctx).action).toEqual({ type: "clear" }));
  it("reports unknown commands and bad usage", () => {
    expect(run("rm -rf /", ctx).lines[0].text).toContain("command not found: rm");
    expect(run("ls", ctx).lines[0].text).toContain("usage");
  });
  it("ignores blank input", () => expect(run("   ", ctx)).toEqual({ lines: [] }));
});

describe("complete", () => {
  it("completes a unique command", () => expect(complete("th", ctx)).toBe("theme "));
  it("keeps ambiguous input", () => expect(complete("c", ctx)).toBe("c"));
  it("completes arguments", () => {
    expect(complete("open ph", ctx)).toBe("open pharmacy-inventory");
    expect(complete("theme ed", ctx)).toBe("theme editorial");
    expect(complete("ls p", ctx)).toBe("ls projects");
  });
  it("leaves unknown commands alone", () => expect(complete("foo b", ctx)).toBe("foo b"));
});
