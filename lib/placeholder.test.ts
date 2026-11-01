import { describe, expect, it } from "vitest";
import { shown, stripPlaceholders } from "./placeholder";

describe("placeholders (flag off)", () => {
  it("hides unfinished values and keeps real ones", () => {
    expect(shown("[PLACEHOLDER]")).toBeUndefined();
    expect(shown("[PLACEHOLDER: x] y")).toBeUndefined();
    expect(shown("5 min")).toBe("5 min");
  });
  it("strips notes from sentences", () => {
    expect(stripPlaceholders("Large files are handled asynchronously. [PLACEHOLDER: how]")).toBe(
      "Large files are handled asynchronously.",
    );
    expect(stripPlaceholders("[PLACEHOLDER]")).toBe("");
  });
});
