import "server-only";
import { cache } from "react";
import { contents } from "@/content";
import { defaultLocale, type Locale } from "./i18n";

// Request-scoped locale for Server Components (React cache = one store per request/render).
// Every layout, page and route that renders copy calls setLocale() first.
const current = cache(() => ({ locale: defaultLocale as Locale }));

export function setLocale(locale: Locale) {
  current().locale = locale;
}
export const getLocale = () => current().locale;
export const getContent = () => contents[getLocale()];
