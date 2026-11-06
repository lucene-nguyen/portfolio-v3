// Unfinished owner facts are written "[PLACEHOLDER…]" in content/. They never render, except in
// local editing with `SHOW_PLACEHOLDERS=1 npm run dev` (ignored in production builds).
export const SHOW_PLACEHOLDERS =
  process.env.NODE_ENV !== "production" && process.env.SHOW_PLACEHOLDERS === "1";

export const hasPlaceholder = (s: string) => s.includes("[PLACEHOLDER");

/** The value, or undefined when it is unfinished. */
export const shown = (s: string) => (SHOW_PLACEHOLDERS || !hasPlaceholder(s) ? s : undefined);

/** Removes trailing "[PLACEHOLDER: …]" notes from a sentence. */
export const stripPlaceholders = (s: string) =>
  SHOW_PLACEHOLDERS ? s : s.replace(/\s*\[PLACEHOLDER[^\]]*\]/g, "").trim();
