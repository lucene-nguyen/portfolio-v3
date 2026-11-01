import { describe, expect, it } from "vitest";
import { move, moveTo, sanitizeOrder } from "./bento";

const ids = ["a", "b", "c", "d"];

describe("bento order", () => {
  it("sanitizes saved orders", () => {
    expect(sanitizeOrder(["c", "x", "a", "c"], ids)).toEqual(["c", "a", "b", "d"]);
    expect(sanitizeOrder("nope", ids)).toEqual(ids);
  });
  it("moves up and down, clamped", () => {
    expect(move(ids, "c", -1)).toEqual(["a", "c", "b", "d"]);
    expect(move(ids, "c", 1)).toEqual(["a", "b", "d", "c"]);
    expect(move(ids, "a", -1)).toEqual(ids);
    expect(move(ids, "d", 5)).toEqual(ids);
  });
  it("moves onto a drop target", () => {
    expect(moveTo(ids, "d", "a")).toEqual(["d", "a", "b", "c"]);
    expect(moveTo(ids, "a", "c")).toEqual(["b", "c", "a", "d"]);
  });
});
