import { skills } from "@/content/home";
import { SkillIcon } from "./skill-icon";
import { container, SectionHeader } from "./ui";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-border">
      <div className={`${container} flex flex-col gap-8 py-[88px]`}>
        <SectionHeader id="skills-title" eyebrow={skills.eyebrow} title={skills.title} />
        {/* data-part="stack": every theme's stack-panel restyle applies here (LEARNING-165). */}
        <div data-part="stack" className="flex min-w-0 flex-col gap-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skills.groups.map((g) => (
              <div key={g.name} className="flex min-w-0 flex-col gap-3">
                <h3 className="text-sm font-semibold text-text-2">{g.name}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      data-part="skill"
                      className="inline-flex min-h-9 items-center gap-2 rounded-md border border-border bg-surface px-3 text-sm whitespace-nowrap text-text"
                    >
                      <SkillIcon name={it} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div data-part="skills-secondary" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 className="text-sm font-medium text-text-muted">{skills.secondary.name}</h3>
            <ul className="flex flex-wrap gap-3">
              {skills.secondary.items.map((it) => (
                <li
                  key={it}
                  data-part="skill"
                  className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap text-text-muted"
                >
                  <SkillIcon name={it} size={14} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
