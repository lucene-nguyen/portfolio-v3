"use client";

import { useRouter } from "next/navigation";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useContent, useLocale } from "@/components/i18n/locale-provider";
import { isTyping, restoreFocus } from "@/lib/dom";
import { search, type SearchDoc } from "@/lib/search";

export interface SearchHandle {
  open: () => void;
}

export function SearchDialog({ ref }: { ref: React.Ref<SearchHandle> }) {
  const { docsCopy } = useContent();
  const locale = useLocale();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState<SearchDoc[] | null>(null);
  const [failed, setFailed] = useState(false);
  const indexRef = useRef<SearchDoc[] | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();

  const open = () => {
    if (!dialog.current || dialog.current.open) return;
    opener.current = document.activeElement as HTMLElement | null;
    dialog.current.showModal();
    input.current?.focus();
    // Static file generated at build time; fetched on first use, retried on the next open after a failure.
    if (!indexRef.current) {
      setFailed(false);
      fetch(`${locale === "en" ? "" : `/${locale}`}/search-index.json`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((docs: SearchDoc[]) => {
          indexRef.current = docs;
          setIndex(docs);
        })
        .catch(() => setFailed(true));
    }
  };
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  });
  useImperativeHandle(ref, () => ({ open }));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const slash =
        e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey && !e.isComposing && !isTyping(e.target);
      const k = e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey);
      if (slash || k) {
        e.preventDefault();
        openRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.dataset.searchShortcuts = "on";
    return () => {
      window.removeEventListener("keydown", onKey);
      delete document.documentElement.dataset.searchShortcuts;
    };
  }, []);

  const hits = index ? search(index, query) : [];
  const go = (href: string) => {
    dialog.current?.close();
    router.push(href);
  };

  return (
    <dialog
      ref={dialog}
      aria-label={docsCopy.searchLabel}
      onClose={() => {
        setQuery("");
        setActive(0);
        restoreFocus(opener.current);
      }}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
      className="mx-auto mt-[12vh] w-[min(92vw,640px)] rounded-lg border border-border bg-surface p-0 text-text shadow-xl backdrop:bg-text/30"
    >
      <input
        ref={input}
        type="search"
        role="combobox"
        aria-label={docsCopy.searchLabel}
        aria-expanded={hits.length > 0}
        aria-controls="docs-search-results"
        aria-activedescendant={hits.length ? `docs-hit-${active}` : undefined}
        aria-autocomplete="list"
        placeholder={docsCopy.placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && hits.length) {
            e.preventDefault();
            setActive((a) => (a + 1) % hits.length);
          } else if (e.key === "ArrowUp" && hits.length) {
            e.preventDefault();
            setActive((a) => (a - 1 + hits.length) % hits.length);
          } else if (e.key === "Escape") {
            // type=search would clear the text first; one Escape always closes.
            e.preventDefault();
            dialog.current?.close();
          } else if (e.key === "Enter" && hits[active]) {
            e.preventDefault();
            go(hits[active].doc.href);
          }
        }}
        className="w-full border-b border-border bg-transparent px-4 py-3 text-base"
      />
      <p role="status" className="px-4 pt-2 text-xs text-text-muted">
        {!query.trim()
          ? ""
          : failed
            ? docsCopy.loadFailed
            : !index
              ? docsCopy.searching
              : hits.length
                ? docsCopy.results(hits.length)
                : docsCopy.noResults}
      </p>
      <ul id="docs-search-results" role="listbox" aria-label={docsCopy.search} className="max-h-[50vh] overflow-y-auto p-2">
        {hits.map((h, i) => (
          <li
            key={h.doc.href + i}
            id={`docs-hit-${i}`}
            role="option"
            aria-selected={i === active}
            onClick={() => go(h.doc.href)}
            onMouseMove={() => setActive(i)}
            className="cursor-pointer rounded-md px-3 py-2 aria-selected:bg-surface-2 aria-selected:shadow-[inset_4px_0_0_var(--accent)] aria-selected:outline-2 aria-selected:-outline-offset-2 aria-selected:outline-accent"
          >
            <span className="block text-xs text-text-muted">{h.doc.section}</span>
            <span className="block font-semibold">{h.doc.title}</span>
            <span className="block text-sm text-text-secondary">{h.snippet}</span>
          </li>
        ))}
      </ul>
    </dialog>
  );
}
