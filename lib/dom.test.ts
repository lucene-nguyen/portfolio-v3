import { expect, it } from "vitest";
import { isTyping } from "./dom";

it("treats fields as typing, except inside a closed dialog", () => {
  document.body.innerHTML = `<input id="a"><dialog open><input id="b"></dialog><dialog><input id="c"></dialog><div id="d"></div>`;
  const $ = (id: string) => document.getElementById(id);
  expect(isTyping($("a"))).toBe(true);
  expect(isTyping($("b"))).toBe(true);
  expect(isTyping($("c"))).toBe(false);
  expect(isTyping($("d"))).toBe(false);
});
