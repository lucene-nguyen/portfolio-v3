import type { Locale } from "@/lib/i18n";
import * as en from "./en/home";
import * as vi from "./vi/home";

export type Content = typeof en;
// Typed against English: a missing or misshapen Vietnamese export fails the build.
export const contents: Record<Locale, Content> = { en, vi };
