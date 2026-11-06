import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Libre_Bodoni, Press_Start_2P } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeRuntime } from "@/components/theme/theme-runtime";
import { SiteNav } from "@/components/home/site-nav";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getContent, setLocale } from "@/lib/i18n-server";
import { ogBase, siteUrl } from "@/lib/site";
import { themeScript, themesToCss } from "@/lib/theme/css";
import { activeThemes, defaultTheme } from "@/themes/registry";
import "../globals.css";
// Theme stylesheets are static and scoped by [data-theme]: a stored theme is styled on first paint
// (no restyle when its lazy chunk loads) and the Swiss print CV works without JS.
import "@/themes/3d-world/world.css";
import "@/themes/anime/anime.css";
import "@/themes/bento/bento.css";
import "@/themes/blueprint/blueprint.css";
import "@/themes/cyberpunk/cyberpunk.css";
import "@/themes/dashboard/dashboard.css";
import "@/themes/docs/docs.css";
import "@/themes/editorial/editorial.css";
import "@/themes/ide/ide.css";
import "@/themes/neo-brutalism/neo.css";
import "@/themes/night-terminal/night-terminal.css";
import "@/themes/pixel/pixel.css";
import "@/themes/swiss-minimal/swiss.css";

// Vietnamese subsets for the /vi copy (Press Start 2P has none: accented letters fall back in Pixel).
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "vietnamese"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
});
// Theme heading fonts: not preloaded, so a browser only downloads them when a theme actually uses them,
// and the theme is styled with its font from first paint (no swap when the theme chunk loads).
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  preload: false,
});
const bodoni = Libre_Bodoni({
  weight: ["400", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-bodoni",
  preload: false,
});

const themeCss = themesToCss(activeThemes, defaultTheme.id);
const initScript = themeScript(
  activeThemes.map((t) => t.id),
  defaultTheme.id,
);

export const generateStaticParams = () => locales.map((locale) => ({ locale }));
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  setLocale((await params).locale as Locale);
  const { profile } = getContent();
  return {
    metadataBase: siteUrl(),
    title: { default: `${profile.name} — ${profile.title}`, template: `%s — ${profile.name}` },
    openGraph: { type: "website", ...ogBase },
    twitter: { card: "summary_large_image" },
    description: profile.siteDescription,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) return null; // dynamicParams = false: never reached
  setLocale(locale);
  const { labels } = getContent();
  return (
    <html
      lang={locale}
      data-theme={defaultTheme.id}
      suppressHydrationWarning
      className={`${interTight.variable} ${jetbrainsMono.variable} ${pressStart.variable} ${bodoni.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-text">
        <LocaleProvider locale={locale}>
          <ThemeProvider>
            <a
              href="#main"
              className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-accent-contrast focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              {labels.skip}
            </a>
            {/* Outside ThemeRuntime: a layout swap must not remount the nav/switcher (focus, announcement). */}
            <SiteNav />
            <ThemeRuntime>{children}</ThemeRuntime>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
