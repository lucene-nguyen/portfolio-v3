import { expect, it } from "vitest";
import { fileFor as fileIn, filesFor } from "./files";

const files = filesFor("en");
const fileFor = (pathname: string, hash: string) => fileIn(files, pathname, hash);
import { features } from "@/lib/features";

it("maps pages and anchors to files", () => {
  expect(fileFor("/", "")?.path).toBe("about.ts");
  expect(fileFor("/", "#experience")?.path).toBe("resume.json");
  // Parked sections (LEARNING-164) have no files.
  expect(fileFor("/work/ai-image-pipeline", "")?.path).toBe(
    features.caseStudies ? "work/ai-image-pipeline.md" : undefined,
  );
  expect(fileFor("/", "#work")?.path).toBe(features.caseStudies ? "work/README.md" : undefined);
  expect(fileFor("/", "#lab")?.path).toBe(features.lab ? "lab/rate-limiter.ts" : undefined);
  expect(fileFor("/", "#unknown")).toBeUndefined();
  expect(fileFor("/kits/nope", "")).toBeUndefined();
});

it("has unique paths and hrefs", () => {
  expect(new Set(files.map((f) => f.path)).size).toBe(files.length);
  expect(new Set(files.map((f) => f.href)).size).toBe(files.length);
});

it("points section files at the Vietnamese home page under /vi", () => {
  const vi = filesFor("vi");
  expect(vi.find((f) => f.path === "skills.json")?.href).toBe("/vi#skills");
  expect(fileIn(vi, "/vi", "", "/vi")?.path).toBe("about.ts");
  expect(fileIn(vi, "/vi", "#skills")?.path).toBe("skills.json");
});
