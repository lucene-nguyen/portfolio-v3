// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { mapNodes, SystemMap } from "./system-map";

it("renders to static HTML with real links (no JavaScript needed)", () => {
  const html = renderToStaticMarkup(<SystemMap />);
  expect(html).toContain("<svg");
  expect(html.match(/<line /g)).toHaveLength(mapNodes.length);
  for (const n of mapNodes) expect(html).toContain(`href="${n.href}"`);
  expect(html).toContain("<details");
});

it("has one node per case study plus the public repo", () => {
  expect(mapNodes.map((n) => n.href)).toEqual([
    "/work/pharmacy-inventory",
    "/work/ai-image-pipeline",
    "/work/aws-file-ingestion",
    "https://github.com/lucene-nguyen/rate-limiting-lab",
  ]);
});
