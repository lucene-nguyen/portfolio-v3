import { expect, it } from "vitest";
import { fileFor, files } from "./files";

it("maps pages and anchors to files", () => {
  expect(fileFor("/work/ai-image-pipeline", "").path).toBe("work/ai-image-pipeline.md");
  expect(fileFor("/", "#lab").path).toBe("lab/rate-limiter.ts");
  expect(fileFor("/", "").path).toBe("about.ts");
  expect(fileFor("/", "#unknown").path).toBe("about.ts");
});

it("has unique paths and hrefs", () => {
  expect(new Set(files.map((f) => f.path)).size).toBe(files.length);
  expect(new Set(files.map((f) => f.href)).size).toBe(files.length);
});
