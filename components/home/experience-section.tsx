import { experience } from "@/content/home";
import { container, SectionHeader, Tag } from "./ui";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-border">
      <div className={`${container} flex flex-wrap gap-16 py-[88px]`}>
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-8">
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
        <div data-part="stack" className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
          <h3 className="font-mono text-sm font-normal text-accent">{experience.stackLabel}</h3>
          {experience.stack.map((g) => (
            <div key={g.name} className="flex flex-col gap-2.5">
              <h4 className="text-sm font-semibold text-text-2">{g.name}</h4>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li key={it}>
                    <Tag outline>{it}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
