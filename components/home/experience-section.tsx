import { getContent } from "@/lib/i18n-server";
import { container, SectionHeader, Tag } from "./ui";

export function ExperienceSection() {
  const { experience, labels } = getContent();
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
                <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-6">
                  <h3 className="text-xl font-semibold">{r.company}</h3>
                  {/* Verbatim from the resume (LEARNING-183): every bullet, no "show more". */}
                  {r.entries.map((e) => (
                    <div
                      key={`${e.title}-${e.period}`}
                      data-part="role-entry"
                      className="flex flex-col gap-3"
                    >
                      <div>
                        <h4 className="font-semibold">{e.title}</h4>
                        <p className="font-mono text-sm text-text-muted">
                          {[e.period !== r.period && e.period, e.context]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <ul className="flex max-w-[70ch] list-disc flex-col gap-3 pl-5 text-[15px] leading-[1.55]">
                        {e.bullets.map((b) => (
                          <li key={b.text} data-part="bullet">
                            <p className="text-text-2">{b.text}</p>
                            <p className="text-text-secondary">
                              <span aria-hidden>→ </span>
                              {b.result}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <ul
                        className="flex flex-wrap gap-2"
                        aria-label={`${labels.technologies}: ${r.company}, ${e.title}, ${e.period}`}
                      >
                        {e.tags.map((t) => (
                          <li key={t}>
                            <Tag>{t}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <div data-part="certifications" className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold">{experience.certificationsTitle}</h3>
            <ul className="flex flex-col gap-2 text-[15px]">
              {experience.certifications.map((c) => (
                <li key={c.url}>
                  <a href={c.url} className="font-medium text-accent underline underline-offset-4">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
