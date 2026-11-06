import { getContent } from "@/lib/i18n-server";
import { shown } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import { container, kitCard as card, SectionHeader } from "./ui";

export function KitsSection() {
  const { kits, labels } = getContent();
  return (
    <section id="kits" aria-labelledby="kits-title" className="border-t border-border">
      <div className={`${container} flex flex-col gap-10 py-[88px]`}>
        <SectionHeader id="kits-title" eyebrow={kits.eyebrow} title={kits.title} />
        <ul className="flex flex-wrap gap-4">
          {kits.items.map((k) => {
            const body = (
              <>
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
                <span className="text-[15px] leading-normal text-text-muted">{k.description}</span>
                {shown(k.stack) && (
                  <span className="mt-auto font-mono text-[13px] text-text-secondary">
                    {k.stack}
                  </span>
                )}
              </>
            );
            // No link until the owner provides one. A kit with a live demo gets two links, not a card link.
            return (
              <li key={k.name} data-part="kit" className="flex min-w-0 flex-[1_1_250px]">
                {"demo" in k && k.demo ? (
                  <div className={card}>
                    {body}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
                      <a
                        href={k.href}
                        aria-label={`${labels.viewRepo}: ${k.name}`}
                        className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline"
                      >
                        {labels.viewRepo}
                      </a>
                      <a
                        href={k.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline"
                      >
                        {labels.liveDemo}
                        <span className="sr-only">
                          {" "}
                          {k.name} {labels.newTab}
                        </span>
                      </a>
                    </div>
                  </div>
                ) : shown(k.href) ? (
                  <a
                    href={k.href}
                    className={`${card} transition-colors duration-150 hover:border-border-strong`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={card}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
