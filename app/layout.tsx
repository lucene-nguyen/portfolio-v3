import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeRuntime } from "@/components/theme/theme-runtime";
import { SiteNav } from "@/components/home/site-nav";
import { profile } from "@/content/home";
import { ogBase, siteUrl } from "@/lib/site";
import { themeScript, themesToCss } from "@/lib/theme/css";
import { defaultTheme, themes } from "@/themes/registry";
import "./globals.css";
// Theme stylesheets are static and scoped by [data-theme]: a stored theme is styled on first paint
// (no restyle when its lazy chunk loads) and the Swiss print CV works without JS.
import "@/themes/anime/anime.css";
import "@/themes/blueprint/blueprint.css";
import "@/themes/cyberpunk/cyberpunk.css";
import "@/themes/editorial/editorial.css";
import "@/themes/neo-brutalism/neo.css";
import "@/themes/pixel/pixel.css";
import "@/themes/swiss-minimal/swiss.css";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

const themeCss = themesToCss(themes, defaultTheme.id);
const initScript = themeScript(
  themes.map((t) => t.id),
  defaultTheme.id,
);

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: `${profile.name} — ${profile.title}`, template: `%s — ${profile.name}` },
  openGraph: { type: "website", ...ogBase },
  twitter: { card: "summary_large_image" },
  description: profile.siteDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={defaultTheme.id}
      suppressHydrationWarning
      className={`${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-text">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-accent-contrast focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          {/* Outside ThemeRuntime: a layout swap must not remount the nav/switcher (focus, announcement). */}
          <SiteNav />
          <ThemeRuntime>{children}</ThemeRuntime>
        </ThemeProvider>
      </body>
    </html>
  );
}
