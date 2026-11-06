// Locales (LEARNING-168): English at "/", Vietnamese at "/vi". Copy lives in content/<locale>/.
export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** Home page of a locale: "/" (English, no prefix) or "/vi". */
export const homePath = (l: Locale) => (l === "en" ? "/" : `/${l}`);

/** Link to a home section from any page: "/#skills" or "/vi#skills". */
export const homeHref = (l: Locale, hash = "") => (l === "en" ? `/${hash}` : `/${l}${hash}`);

/** hreflang alternates for the home page. */
export const homeAlternates = {
  en: "/",
  vi: "/vi",
  "x-default": "/",
} as const;
