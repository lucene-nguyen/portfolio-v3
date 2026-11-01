import { kits } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import { container, SectionHeader } from "./ui";

const card =
  "flex min-w-0 flex-[1_1_250px] flex-col gap-3 rounded-[14px] border border-border p-6 text-text";

export function KitsSection() {
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
            // No link until the owner provides one.
            return (
              <li key={k.name} data-part="kit" className="flex min-w-0 flex-[1_1_250px]">
                {shown(k.href) ? (
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
