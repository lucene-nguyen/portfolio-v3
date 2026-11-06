// @vitest-environment node
import { describe, expect, it } from "vitest";
import { contents } from "@/content";
import { composeMail } from "./mail-compose";

const msg = {
  name: "Lan Tran",
  email: "lan@example.com",
  type: "freelance" as const,
  message: "A booking app for three clinics.\nLive by March & on budget?",
};

describe("composeMail", () => {
  it("builds the English message: To, Subject, labelled fields, message with line breaks", () => {
    const m = composeMail({ ...msg, phone: "+84 339 696 831" }, contents.en);
    expect(m.to).toBe("manhcuongmvc@gmail.com");
    expect(m.subject).toBe("[Portfolio] Freelance project — Lan Tran");
    expect(m.text).toBe(
      [
        "To: manhcuongmvc@gmail.com",
        "Subject: [Portfolio] Freelance project — Lan Tran",
        "",
        "Name: Lan Tran",
        "Email: lan@example.com",
        "Collaboration: Freelance project",
        "Phone or Zalo: +84 339 696 831",
        "",
        "Message:",
        "A booking app for three clinics.",
        "Live by March & on budget?",
      ].join("\n"),
    );
  });

  it("follows the page language and omits an empty phone", () => {
    const m = composeMail({ ...msg, type: "consulting" }, contents.vi);
    expect(m.subject).toBe("[Portfolio] Tư vấn — Lan Tran");
    expect(m.text).toContain("Đến: manhcuongmvc@gmail.com\nTiêu đề: [Portfolio] Tư vấn — Lan Tran");
    expect(m.text).toContain("Hình thức hợp tác: Tư vấn");
    expect(m.text).not.toMatch(/Số điện thoại/);
    expect(m.body.endsWith("Nội dung:\n" + msg.message)).toBe(true);
  });

  it("encodes every link part", () => {
    const m = composeMail(msg, contents.en);
    const subject = encodeURIComponent(m.subject);
    const body = encodeURIComponent(m.body);
    expect(m.gmail).toBe(
      `https://mail.google.com/mail/?view=cm&fs=1&to=manhcuongmvc%40gmail.com&su=${subject}&body=${body}`,
    );
    expect(m.outlook).toBe(
      `https://outlook.live.com/mail/0/deeplink/compose?to=manhcuongmvc%40gmail.com&subject=${subject}&body=${body}`,
    );
    expect(m.mailto).toBe(
      `mailto:manhcuongmvc@gmail.com?subject=${subject}&body=${encodeURIComponent(m.body.replace(/\n/g, "\r\n"))}`,
    );
    expect(m.mailto).toContain("%0D%0A"); // CRLF line breaks
    expect(m.gmail).not.toMatch(/[ &]on budget/); // "&" and spaces are encoded
    expect(new URL(m.gmail).searchParams.get("body")).toBe(m.body);
    expect(new URL(m.outlook).searchParams.get("subject")).toBe(m.subject);
  });
});
