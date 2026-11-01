import { readFile } from "node:fs/promises";
import path from "node:path";
import { experience, kits, lab, profile, work } from "@/content/home";
import { stripPlaceholders } from "@/lib/placeholder";
import { mdxToDocs, type SearchDoc } from "@/lib/search";

// Built once at build time into a static JSON file; no search service.
export const dynamic = "force-static";

export async function GET() {
  const home: SearchDoc[] = [
    {
      title: profile.name,
      section: "Home",
      href: "/#top",
      text: `${profile.title}. ${profile.email}`,
    },
    ...work.items.map((c) => ({
      title: c.title,
      section: work.title,
      href: `/work/${c.slug}`,
      text: [c.meta, c.summary, ...c.metrics.map((m) => `${m.value} ${m.label}`), ...c.tags].join(
        " ",
      ),
    })),
    {
      title: lab.title,
      section: "Live lab",
      href: "/#lab",
      text: [lab.intro, ...lab.facts].join(" "),
    },
    ...kits.items.map((k) => ({
      title: k.name,
      section: kits.title,
      href: "/#kits",
      text: `${k.status}. ${k.description} ${k.stack}`,
    })),
    ...experience.roles.map((r) => ({
      title: r.company,
      section: experience.title,
      href: "/#experience",
      text: `${r.period} ${r.summary}`,
    })),
    {
      title: experience.stackLabel,
      section: experience.title,
      href: "/#experience",
      text: experience.stack.map((g) => `${g.name}: ${g.items.join(", ")}`).join(". "),
    },
  ];
  const studies = await Promise.all(
    work.items.map(async (c) =>
      mdxToDocs(await readFile(path.join(process.cwd(), "content/work", `${c.slug}.mdx`), "utf8"), {
        title: c.title,
        href: `/work/${c.slug}`,
      }),
    ),
  );
  // Unfinished notes never reach search; sections left empty are dropped.
  const docs = [...home, ...studies.flat()]
    .map((d) => ({ ...d, text: stripPlaceholders(d.text) }))
    .filter((d) => d.text);
  return Response.json(docs);
}
