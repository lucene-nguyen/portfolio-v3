import { lab } from "@/content/home";
import { container, SectionHeader } from "./ui";

/** Intro copy for the live lab; the interactive panel is passed in as children. */
export function LabSection({ children }: { children?: React.ReactNode }) {
  return (
    <section id="lab" aria-labelledby="lab-title" className="border-t border-border bg-bg-alt">
      <div className={`${container} flex flex-wrap items-start gap-12 py-[88px]`}>
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px]">
          <SectionHeader id="lab-title" eyebrow={lab.eyebrow} title={lab.title} />
          <p className="text-[17px] leading-relaxed text-text-secondary">
            {lab.intro}{" "}
            <a href={lab.repo.href} className="text-accent underline underline-offset-2">
              {lab.repo.label}
            </a>
            .
          </p>
          <ul className="list-disc pl-[18px] text-[15px] leading-[1.8] text-text-muted">
            {lab.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        {children && <div className="min-w-0 flex-[999_1_560px]">{children}</div>}
      </div>
    </section>
  );
}
