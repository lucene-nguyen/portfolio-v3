import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/i18n-server";
import { container, kitCard, SectionHeader } from "./ui";

export function WorkWithMeSection() {
  const { kits, workWithMe: c } = getContent();
  return (
    <section
      id="work-with-me"
      aria-labelledby="work-with-me-title"
      className="border-t border-border"
    >
      <div className={`${container} flex flex-col gap-12 py-[88px]`}>
        <div className="flex max-w-[680px] flex-col gap-4">
          <SectionHeader id="work-with-me-title" eyebrow={c.eyebrow} title={c.title} />
          <p className="text-lg leading-[1.6] text-text-secondary">{c.intro}</p>
        </div>
        {/* data-part="kit" / "roles": every theme's card and timeline restyles apply here. */}
        <ul className="flex flex-wrap gap-4">
          {c.services.map((s) => (
            <li key={s.name} data-part="kit" className="flex min-w-0 flex-[1_1_250px]">
              <div className={kitCard}>
                <h3 className="text-xl font-semibold">{s.name}</h3>
                <p className="text-[15px] leading-normal text-text-muted">{s.description}</p>
                {s.kits && (
                  <p className="font-mono text-[13px] text-text-secondary">
                    {kits.items
                      .filter((k) => s.kits.includes(k.name))
                      .map((k) => `${k.name}: ${k.status}`)
                      .join(" · ")}
                  </p>
                )}
                <Link
                  href={`/?type=${s.type}#contact`}
                  data-type={s.type}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent hover:underline"
                >
                  {s.cta}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex max-w-[880px] flex-col gap-6">
          <h3 className="font-heading text-2xl font-bold">{c.stepsTitle}</h3>
          <ol data-part="roles">
            {c.steps.map((step, i) => (
              <li
                key={step.name}
                data-part="role"
                className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border py-6 last:border-b"
              >
                <span className="flex-[0_0_170px] font-mono text-sm text-text-muted">
                  {c.stepLabel(i + 1)}
                </span>
                <div className="flex flex-[1_1_300px] flex-col gap-1.5">
                  <h4 className="text-xl font-semibold">{step.name}</h4>
                  <p className="text-[15px] leading-[1.55] text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
