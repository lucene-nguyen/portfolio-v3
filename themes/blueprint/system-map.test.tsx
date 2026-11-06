// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { contents } from "@/content";
import { mapNodesFor, SystemMap } from "./system-map";

const mapNodes = mapNodesFor(contents.en);
import { features } from "@/lib/features";

it("renders to static HTML with real links (no JavaScript needed)", () => {
  const html = renderToStaticMarkup(<SystemMap />);
  expect(html).toContain("<svg");
  expect(html.match(/<line /g)).toHaveLength(mapNodes.length);
  for (const n of mapNodes) expect(html).toContain(`href="${n.href}"`);
  expect(html).toContain("<details");
});

it("maps the case studies plus the public repo, or the roles and kits while studies are parked", () => {
  expect(mapNodes.map((n) => n.href)).toEqual(
    features.caseStudies
      ? [
          "/work/pharmacy-inventory",
          "/work/ai-image-pipeline",
          "/work/aws-file-ingestion",
          "https://github.com/lucene-nguyen/rate-limiting-lab",
        ]
      : ["#experience", "#experience", "#experience", "#kits"],
  );
  if (!features.caseStudies)
    expect(mapNodes.map((n) => n.title)).toEqual([
      "FPT Software",
      "NEOX",
      "Faboshop",
      "Starter kits & labs",
    ]);
});
