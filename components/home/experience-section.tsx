import { experience } from "@/content/home";
import { container, SectionHeader } from "./ui";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-border">
      <div className={`${container} py-[88px]`}>
        <div className="flex max-w-[880px] min-w-0 flex-col gap-8">
          <SectionHeader
            id="experience-title"
            eyebrow={experience.eyebrow}
            title={experience.title}
          />
          <ol data-part="roles">
            {experience.roles.map((r) => (
              <li
                key={r.company}
                // flex-[0_0_170px] + gap-x-6: the dashboard theme's table header aligns to these values.
                data-part="role"
                className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border py-6 last:border-b"
              >
                <span className="flex-[0_0_170px] font-mono text-sm text-text-muted">
                  {r.period}
                </span>
                <div className="flex flex-[1_1_300px] flex-col gap-1.5">
                  <h3 className="text-xl font-semibold">{r.company}</h3>
                  <p className="text-[15px] leading-[1.55] text-text-secondary">{r.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
