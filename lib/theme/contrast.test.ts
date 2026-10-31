import { expect, it } from "vitest";
import { contrast } from "./contrast";

it("computes WCAG contrast ratios", () => {
  expect(contrast("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
  expect(contrast("#777777", "#FFFFFF")).toBeCloseTo(4.48, 2);
  expect(contrast("#ffffff", "#ffffff")).toBe(1);
});
