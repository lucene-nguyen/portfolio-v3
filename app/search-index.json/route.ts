import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  experience,
  kits,
  lab,
  profile,
  publicStudies,
  skills,
  work,
  workWithMe,
} from "@/content/home";
import { features } from "@/lib/features";
import { SHOW_PLACEHOLDERS, stripPlaceholders } from "@/lib/placeholder";
import { mdxToDocs, type SearchDoc } from "@/lib/search";

// Built once at build time into a static JSON file; no search service.
export const dynamic = "force-static";

// List items with a placeholder are dropped whole on the page; do the same here.
const withoutUnfinishedItems = (mdx: string) =>
  SHOW_PLACEHOLDERS ? mdx : mdx.replace(/^\s*[-*] .*\[PLACEHOLDER.*$/gm, "");

export async function GET() {
  const home: SearchDoc[] = [
    {
      title: profile.name,
      section: "Home",
      href: "/#top",
      text: `${profile.title}. ${profile.email}`,
    },
    ...publicStudies.map((c) => ({
      title: c.title,
      section: work.title,
      href: `/work/${c.slug}`,
      text: [c.meta, c.summary, ...c.metrics.map((m) => `${m.value} ${m.label}`), ...c.tags].join(
        " ",
      ),
    })),
    ...(features.lab
      ? [
          {
            title: lab.title,
            section: "Live lab",
            href: "/#lab",
            text: [lab.intro, ...lab.facts].join(" "),
          },
        ]
      : []),
    ...kits.items.map((k) => ({
      title: k.name,
      section: kits.title,
      href: "/#kits",
      text: `${k.status}. ${k.description} ${k.stack}`,
    })),
    {
      title: workWithMe.title,
      section: workWithMe.title,
      href: "/#work-with-me",
      text: [
        workWithMe.intro,
        ...workWithMe.services.map((s) => `${s.name}: ${s.description}`),
        ...workWithMe.steps.map((s) => `${s.name}: ${s.description}`),
      ].join(" "),
    },
    ...experience.roles.map((r) => ({
      title: r.company,
      section: experience.title,
      href: "/#experience",
      text: `${r.period} ${r.summary}`,
    })),
    {
      title: skills.title,
      section: skills.title,
      href: "/#skills",
      text: [...skills.groups, skills.secondary]
        .map((g) => `${g.name}: ${g.items.join(", ")}`)
        .join(". "),
    },
  ];
  const studies = await Promise.all(
    publicStudies.map(async (c) =>
      mdxToDocs(
        withoutUnfinishedItems(
          await readFile(path.join(process.cwd(), "content/work", `${c.slug}.mdx`), "utf8"),
        ),
        {
          title: c.title,
          href: `/work/${c.slug}`,
        },
      ),
    ),
  );
  // Unfinished notes never reach search; sections left empty are dropped.
  const docs = [...home, ...studies.flat()]
    .map((d) => ({ ...d, text: stripPlaceholders(d.text) }))
    .filter((d) => d.text);
  return Response.json(docs);
}
