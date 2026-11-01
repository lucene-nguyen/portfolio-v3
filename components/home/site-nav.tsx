import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { labels, nav, profile } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { container } from "./ui";

const resume =
  "inline-flex min-h-10 items-center rounded-lg border border-border-strong px-4 font-mono text-sm text-text";

export function SiteNav() {
  return (
    <header className="border-b border-border">
      <nav
        aria-label="Main"
        className={`${container} flex flex-wrap items-center justify-between gap-4 py-[18px]`}
      >
        <Link href="/" className="font-mono text-lg font-bold text-text">
          {profile.handle}
          <span className="text-accent">.dev</span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-text-muted transition-colors duration-150 hover:text-text"
            >
              {item.label}
            </Link>
          ))}
          {shown(profile.resumeUrl) && (
            <a href={profile.resumeUrl} className={`${resume} hover:bg-surface`}>
              {labels.resume} <span aria-hidden>↓</span>
            </a>
          )}
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
