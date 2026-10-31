import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeRuntime } from "@/components/theme/theme-runtime";
import { SiteNav } from "@/components/home/site-nav";
import { profile } from "@/content/home";
import { themeScript, themesToCss } from "@/lib/theme/css";
import { defaultTheme, themes } from "@/themes/registry";
import "./globals.css";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

const themeCss = themesToCss(themes, defaultTheme.id);
const initScript = themeScript(
  themes.map((t) => t.id),
  defaultTheme.id,
);

export const metadata: Metadata = {
  title: { default: `${profile.name} — ${profile.title}`, template: `%s — ${profile.name}` },
  description: "Case studies, a live rate-limiting lab, and starter kits.",
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
