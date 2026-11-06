import { getContent } from "@/lib/i18n-server";
import { shown } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import { container, kitCard, SectionHeader } from "./ui";

const action =
  "inline-flex min-h-11 items-center gap-1.5 rounded-md border border-text-subtle px-3 text-sm font-semibold text-text transition-colors duration-150 hover:bg-surface-2";

export function KitsSection() {
  const { kits, labels } = getContent();
  return (
    <section id="kits" aria-labelledby="kits-title" className="border-t border-border">
      <div className={`${container} flex flex-col gap-10 py-[88px]`}>
        <SectionHeader id="kits-title" eyebrow={kits.eyebrow} title={kits.title} />
        <ul className="flex flex-wrap gap-4">
          {kits.items.map((k) => {
            // One template for every kit: the card is not a link; links are buttons in the action row.
            const links = [
              k.repo && { href: k.repo, label: labels.github },
              k.demo && { href: k.demo, label: labels.liveDemo },
            ].filter((l): l is { href: string; label: string } => !!l);
            return (
              <li key={k.name} data-part="kit" className="flex min-w-0 flex-[1_1_250px]">
                <div
                  className={cn(
                    kitCard,
                    "transition-colors duration-150 hover:border-border-strong has-[:focus-visible]:border-border-strong",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-xs",
                      k.state === "active" ? "text-accent" : "text-warning",
                    )}
                  >
                    <span aria-hidden>{k.state === "active" ? "● " : "○ "}</span>
                    {k.status}
                  </span>
                  <h3 className="text-xl font-semibold">{k.name}</h3>
                  <span className="text-[15px] leading-normal text-text-muted">
                    {k.description}
                  </span>
                  {shown(k.stack) && (
                    <span className="font-mono text-[13px] text-text-secondary">{k.stack}</span>
                  )}
                  <div data-part="kit-actions" className="mt-auto flex flex-wrap gap-2 pt-2">
                    {links.length ? (
                      links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={action}
                        >
                          {l.label} <span aria-hidden>↗</span>
                          <span className="sr-only">
                            {" "}
                            {k.name} {labels.newTab}
                          </span>
                        </a>
                      ))
                    ) : (
                      <span className="inline-flex min-h-11 items-center font-mono text-sm text-text-muted">
                        {labels.comingSoon}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
