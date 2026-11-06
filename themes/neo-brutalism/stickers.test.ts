import { expect, it } from "vitest";
import { contrast } from "@/lib/theme/contrast";
import { contents } from "@/content";
import { projectsFor, projectsWith as filterBy, skillsOf, STICKER_FILLS } from "./stickers";

const projects = projectsFor(contents.en);
const skills = skillsOf(projects);
const projectsWith = (skill: string) => filterBy(projects, skill);
import { features } from "@/lib/features";

it("black sticker text reaches 4.5:1 on every saturated fill", () => {
  for (const fill of STICKER_FILLS)
    expect(contrast("#000000", fill), fill).toBeGreaterThanOrEqual(4.5);
});

it("lists each skill once and filters by it: case studies, or the kits while those are parked", () => {
  expect(new Set(skills).size).toBe(skills.length);
  expect(projectsWith("NestJS").map((p) => p.key)).toEqual(
    features.caseStudies ? ["pharmacy-inventory", "aws-file-ingestion"] : ["TableTap"],
  );
  expect(projectsWith("Nope")).toEqual([]);
});

it.skipIf(features.caseStudies)(
  "never turns unfinished kit stacks or links into stickers or links",
  () => {
    // Unfinished stacks and links never become stickers or dead links.
    expect(skills.some((s) => s.includes("PLACEHOLDER"))).toBe(false);
    expect(projects.filter((p) => p.href).map((p) => p.key)).toEqual(["rate-limiting-lab"]);
  },
);
