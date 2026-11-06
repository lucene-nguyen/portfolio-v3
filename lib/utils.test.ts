import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges conflicting tailwind classes, last wins", () => {
    expect(cn("px-2 text-text", false && "hidden", "px-4")).toBe("text-text px-4");
  });
});
