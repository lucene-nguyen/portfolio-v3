"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FileCode, FileJson, FileText, Files, X } from "lucide-react";
import { ideCopy } from "@/content/home";
import { restoreFocus } from "@/lib/dom";
import { basename, fileFor, files, type IdeFile } from "./files";

const TABS_KEY = "ide:tabs";

const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

function useCurrentFile(): IdeFile | undefined {
  const pathname = usePathname();
  const hash = useSyncExternalStore(
    subscribeHash,
    () => window.location.hash,
    () => "",
  );
  return fileFor(pathname, hash);
}

function Icon({ path }: { path: string }) {
  const C = path.endsWith(".json") ? FileJson : path.endsWith(".ts") ? FileCode : FileText;
  return <C size={15} aria-hidden className="shrink-0 text-accent" />;
}

function Explorer({
  current,
  onOpen,
}: {
  current: IdeFile | undefined;
  onOpen: (f: IdeFile) => void;
}) {
  return (
    <nav aria-label={ideCopy.explorer} className="font-mono text-[13px]">
      <p className="px-3 py-2 text-xs tracking-wide text-text-muted uppercase">{ideCopy.project}</p>
      <ul>
        {files.map((f) => (
          <li key={f.path}>
            <Link
              href={f.href}
              onClick={() => onOpen(f)}
              aria-current={f === current ? "page" : undefined}
              className="flex min-h-9 items-center gap-2 px-3 text-text-secondary hover:bg-surface-2 aria-[current=page]:bg-surface-2 aria-[current=page]:text-text"
              style={{ paddingLeft: 12 + (f.path.split("/").length - 1) * 14 }}
            >
              <Icon path={f.path} />
              {f.path.includes("/") ? basename(f.path) : f.path}
              {f.path.includes("/") && <span className="sr-only"> in {f.path.split("/")[0]}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Palette({
  dialog,
  onOpen,
}: {
  dialog: React.RefObject<HTMLDialogElement | null>;
  onOpen: (f: IdeFile) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const matches = files.filter((f) => f.path.toLowerCase().includes(query.trim().toLowerCase()));
  const go = (f: IdeFile) => {
    onOpen(f);
    dialog.current?.close();
    router.push(f.href);
  };
  return (
    <>
      <input
        role="combobox"
        aria-label={ideCopy.palette}
        aria-expanded={matches.length > 0}
        aria-controls="ide-palette-list"
        aria-activedescendant={matches.length ? `ide-file-${active}` : undefined}
        aria-autocomplete="list"
        placeholder={ideCopy.placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && matches.length) {
            e.preventDefault();
            setActive((a) => (a + 1) % matches.length);
          } else if (e.key === "ArrowUp" && matches.length) {
            e.preventDefault();
            setActive((a) => (a - 1 + matches.length) % matches.length);
          } else if (e.key === "Enter" && matches[active]) {
            e.preventDefault();
            go(matches[active]);
          }
        }}
        className="w-full border-b border-border bg-transparent px-4 py-3 font-mono text-sm"
      />
      <p role="status" className="px-4 pt-2 text-xs text-text-muted">
        {matches.length ? "" : ideCopy.noMatch}
      </p>
      <ul
        id="ide-palette-list"
        role="listbox"
        aria-label={ideCopy.palette}
        className="p-1 font-mono text-[13px]"
      >
        {matches.map((f, i) => (
          <li
            key={f.path}
            id={`ide-file-${i}`}
            role="option"
            aria-selected={i === active}
            onClick={() => go(f)}
            onMouseMove={() => setActive(i)}
            className="flex cursor-pointer items-center gap-2 px-3 py-1.5 aria-selected:bg-surface-2 aria-selected:outline-1 aria-selected:outline-accent"
          >
            <Icon path={f.path} />
            {f.path}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function IdeLayout({ children }: { children: React.ReactNode }) {
  const current = useCurrentFile();
  const [tabs, setTabs] = useState<string[]>(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(TABS_KEY) ?? "[]");
      const valid = Array.isArray(saved)
        ? saved.filter((p) => files.some((f) => f.path === p))
        : [];
      return !current || valid.includes(current.path) ? valid : [...valid, current.path];
    } catch {
      return current ? [current.path] : [];
    }
  });
  const drawer = useRef<HTMLDialogElement>(null);
  const palette = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [paletteKey, setPaletteKey] = useState(0);
  const router = useRouter();

  // The file on screen is always open in a tab.
  const shown = !current || tabs.includes(current.path) ? tabs : [...tabs, current.path];
  const shownKey = JSON.stringify(shown);
  useEffect(() => {
    try {
      sessionStorage.setItem(TABS_KEY, shownKey);
    } catch {}
  }, [shownKey]);

  // Opening a file keeps the one on screen as a tab too (like pinning a preview tab).
  const open = (f: IdeFile) => {
    setTabs((t) => [...new Set([...t, ...(current ? [current.path] : []), f.path])]);
    drawer.current?.close();
  };
  // Keyboard users keep their place: focus moves to a neighbouring tab's close button (or the tab bar).
  const tabBar = useRef<HTMLElement>(null);
  const pendingFocus = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (pendingFocus.current === undefined) return;
    const target = pendingFocus.current
      ? tabBar.current?.querySelector<HTMLElement>(`[data-close="${pendingFocus.current}"]`)
      : tabBar.current;
    target?.focus();
    pendingFocus.current = undefined;
  });
  const close = (path: string) => {
    const i = shown.indexOf(path);
    const rest = shown.filter((p) => p !== path);
    pendingFocus.current = rest[Math.min(i, rest.length - 1)] ?? null;
    setTabs(rest);
    if (path === current?.path) {
      const next = files.find((f) => f.path === rest.at(-1)) ?? files[0];
      router.push(next.href);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (palette.current?.open) return;
        opener.current = document.activeElement as HTMLElement | null;
        palette.current?.showModal();
      }
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.dataset.ideShortcuts = "on";
    return () => {
      window.removeEventListener("keydown", onKey);
      delete document.documentElement.dataset.ideShortcuts;
    };
  }, []);

  return (
    <div className="flex">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-surface md:block">
        <div className="sticky top-0 max-h-screen overflow-y-auto py-2">
          <Explorer current={current} onOpen={open} />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <section aria-label={ideCopy.editor}>
          <div className="flex items-stretch border-b border-border bg-surface">
            <button
              type="button"
              onClick={() => drawer.current?.showModal()}
              aria-haspopup="dialog"
              className="flex min-h-11 items-center gap-2 border-r border-border px-3 text-sm md:hidden"
            >
              <Files size={16} aria-hidden />
              {ideCopy.explorer}
            </button>
            <nav
              ref={tabBar}
              tabIndex={-1}
              aria-label={ideCopy.openEditors}
              className="min-w-0 flex-1 overflow-x-auto"
            >
              <ul className="flex">
                {shown.map((path) => {
                  const f = files.find((x) => x.path === path)!;
                  const active = f === current;
                  return (
                    <li
                      key={path}
                      className={`flex shrink-0 items-center border-r border-border ${active ? "bg-bg shadow-[inset_0_2px_0_var(--accent)]" : ""}`}
                    >
                      <Link
                        href={f.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-11 items-center gap-2 pr-1 pl-3 font-mono text-[13px] ${active ? "text-text" : "text-text-muted"}`}
                      >
                        <Icon path={path} />
                        {basename(path)}
                      </Link>
                      <button
                        type="button"
                        data-close={path}
                        onClick={() => close(path)}
                        aria-label={ideCopy.close(basename(path))}
                        className="mr-1 flex size-8 items-center justify-center text-text-muted hover:bg-surface-2 hover:text-text"
                      >
                        <X size={14} aria-hidden />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <span className="hidden items-center px-3 font-mono text-xs text-text-muted sm:flex">
              {ideCopy.palette}: {ideCopy.paletteHint}
            </span>
          </div>
          <p className="border-b border-border px-4 py-1.5 font-mono text-xs text-text-muted">
            {ideCopy.project}
            {current && ` › ${current.path.split("/").join(" › ")}`}
          </p>
        </section>
        {children}
      </div>

      <dialog
        ref={drawer}
        aria-label={ideCopy.explorer}
        onClick={(e) => e.target === drawer.current && drawer.current.close()}
        className="m-0 h-full max-h-none w-[min(85vw,300px)] border-r border-border bg-surface p-0 text-text backdrop:bg-bg/70"
      >
        <form method="dialog" className="border-b border-border p-2">
          <button type="submit" className="min-h-11 px-3 text-sm">
            {ideCopy.closeDrawer}
          </button>
        </form>
        <Explorer current={current} onOpen={open} />
      </dialog>

      <dialog
        ref={palette}
        aria-label={ideCopy.palette}
        onClose={() => {
          setPaletteKey((k) => k + 1); // fresh query next time
          restoreFocus(opener.current);
        }}
        onClick={(e) => e.target === palette.current && palette.current.close()}
        className="mx-auto mt-[10vh] w-[min(92vw,560px)] border border-border-strong bg-surface p-0 text-text backdrop:bg-bg/60"
      >
        <Palette key={paletteKey} dialog={palette} onOpen={open} />
      </dialog>
    </div>
  );
}
