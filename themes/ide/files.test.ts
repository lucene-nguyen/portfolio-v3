import { expect, it } from "vitest";
import { fileFor, files } from "./files";

it("maps pages and anchors to files", () => {
  expect(fileFor("/", "")?.path).toBe("about.ts");
  expect(fileFor("/", "#experience")?.path).toBe("resume.json");
  // Case studies and the lab are parked (LEARNING-164): no files for them.
  expect(fileFor("/work/ai-image-pipeline", "")).toBeUndefined();
  expect(fileFor("/", "#lab")).toBeUndefined();
  expect(files.some((f) => f.href.includes("work") || f.href.includes("lab"))).toBe(false);
  expect(fileFor("/", "#unknown")).toBeUndefined();
  expect(fileFor("/kits/nope", "")).toBeUndefined();
});

it("has unique paths and hrefs", () => {
  expect(new Set(files.map((f) => f.path)).size).toBe(files.length);
  expect(new Set(files.map((f) => f.href)).size).toBe(files.length);
});
