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

it("maps the roles and the starter kits while case studies are parked", () => {
  expect(mapNodes.map((n) => [n.title, n.href])).toEqual([
    ["FPT Software", "#experience"],
    ["NEOX", "#experience"],
    ["Faboshop", "#experience"],
    ["Starter kits & labs", "#kits"],
  ]);
});
