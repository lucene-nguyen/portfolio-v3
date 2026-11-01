import { ImageResponse } from "next/og";
import { profile } from "@/content/home";
import { defaultTheme } from "@/themes/registry";

export const ogSize = { width: 1200, height: 630 };
const t = defaultTheme.tokens;

/** Shared Open Graph card in the default theme's colours. */
export function ogImage({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: t.bg,
        color: t.text,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, color: t.accent }}>{eyebrow}</div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
          color: t.textMuted,
        }}
      >
        <span>{footer}</span>
        <span style={{ color: t.accent }}>{profile.logo}</span>
      </div>
    </div>,
    ogSize,
  );
}
