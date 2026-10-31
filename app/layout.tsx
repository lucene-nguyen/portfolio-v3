import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeRuntime } from "@/components/theme/theme-runtime";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
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
  title: "Nguyen Manh Cuong — Fullstack Software Engineer",
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
          {/* Outside ThemeRuntime: a layout swap must not remount the switcher (focus, announcement). */}
          <header className="mx-auto flex w-full max-w-5xl justify-end px-4 pt-4">
            <ThemeSwitcher />
          </header>
          <ThemeRuntime>{children}</ThemeRuntime>
        </ThemeProvider>
      </body>
    </html>
  );
}
