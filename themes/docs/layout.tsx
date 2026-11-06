"use client";

import Link from "next/link";
import { useRef } from "react";
import { Menu, Search } from "lucide-react";
import { useContent, useLocale, usePublicPathname } from "@/components/i18n/locale-provider";
import { homeHref } from "@/lib/i18n";
import { features } from "@/lib/features";
import { SearchDialog, type SearchHandle } from "./search";

function useHomeLinks() {
  const { docsCopy, experience, kits, lab, skills, work, workWithMe } = useContent();
  const locale = useLocale();
  const at = (hash: string) => homeHref(locale, hash);
  return [
  { href: at("#top"), label: docsCopy.home },
  { href: at("#skills"), label: skills.title },
  { href: at("#experience"), label: experience.title },
  ...(features.caseStudies ? [{ href: at("#work"), label: work.title }] : []),
  ...(features.lab ? [{ href: at("#lab"), label: lab.title }] : []),
  { href: at("#kits"), label: kits.title },
  ...(features.workWithMe ? [{ href: at("#work-with-me"), label: workWithMe.title }] : []),
];
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { docsCopy, publicStudies, work } = useContent();
  const homeLinks = useHomeLinks();
  const pathname = usePublicPathname();
  return (
    <nav aria-label={docsCopy.sidebar} className="flex flex-col gap-6 text-[15px]">
      <ul className="flex flex-col gap-0.5">
        {homeLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} onClick={onNavigate} className="block rounded-md px-2 py-1.5 text-text-secondary hover:bg-surface-2">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      {publicStudies.length > 0 && (
      <div>
        <p className="mb-1 px-2 font-mono text-xs text-text-muted uppercase">{work.title}</p>
        <ul className="flex flex-col gap-0.5">
          {publicStudies.map((c) => {
            const href = `/work/${c.slug}`;
            return (
              <li key={c.slug}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={pathname === href ? "page" : undefined}
                  className="block rounded-md px-2 py-1.5 text-text-secondary hover:bg-surface-2 aria-[current=page]:bg-surface-2 aria-[current=page]:font-semibold aria-[current=page]:text-text"
                >
                  {c.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      )}
    </nav>
  );
}

function Breadcrumbs() {
  const { docsCopy, work } = useContent();
  const pathname = usePublicPathname();
  const study = work.items.find((c) => pathname === `/work/${c.slug}`);
  const trail = study
    ? [{ href: "/", label: docsCopy.home }, ...(features.caseStudies ? [{ href: "/#work", label: work.title }] : []), { label: study.title }]
    : [{ label: docsCopy.home }];
  return (
    <nav aria-label={docsCopy.breadcrumb} className="px-6 pt-6 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-text-muted">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {"href" in t && t.href ? (
              <Link href={t.href} className="hover:text-text hover:underline">
                {t.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-text">
                {t.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const drawer = useRef<HTMLDialogElement>(null);
  const { docsCopy } = useContent();
  const search = useRef<SearchHandle>(null);
  const searchButton = (
    <button
      type="button"
      onClick={() => search.current?.open()}
      aria-keyshortcuts="/ Control+K Meta+K"
      className="flex min-h-11 w-full items-center gap-2 rounded-md border border-border-strong px-3 text-sm text-text-muted hover:bg-surface-2"
    >
      <Search size={16} aria-hidden />
      {docsCopy.search}
      <span className="ml-auto font-mono text-xs">{docsCopy.searchHint}</span>
    </button>
  );

  return (
    <div className="lg:grid lg:grid-cols-[272px_1fr]">
      <aside className="hidden border-r border-border bg-bg-alt lg:block">
        <div className="sticky top-0 flex max-h-screen flex-col gap-6 overflow-y-auto p-5">
          {searchButton}
          <SidebarNav />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex items-center gap-3 px-6 pt-4 lg:hidden">
          <button
            type="button"
            onClick={() => drawer.current?.showModal()}
            aria-haspopup="dialog"
            className="flex min-h-11 items-center gap-2 rounded-md border border-border-strong px-3 text-sm"
          >
            <Menu size={18} aria-hidden />
            {docsCopy.menu}
          </button>
          <div className="flex-1">{searchButton}</div>
        </div>
        <Breadcrumbs />
        {children}
      </div>

      <dialog
        ref={drawer}
        aria-label={docsCopy.sidebar}
        onClick={(e) => e.target === drawer.current && drawer.current.close()}
        className="m-0 h-full max-h-none w-[min(85vw,320px)] border-r border-border bg-bg-alt p-5 text-text backdrop:bg-text/30"
      >
        <form method="dialog" className="mb-4">
          <button type="submit" className="min-h-11 rounded-md border border-border-strong px-3 text-sm">
            {docsCopy.close}
          </button>
        </form>
        <SidebarNav onNavigate={() => drawer.current?.close()} />
      </dialog>

      <SearchDialog ref={search} />
    </div>
  );
}
