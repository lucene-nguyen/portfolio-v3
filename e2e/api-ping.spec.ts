import { expect, test } from "@playwright/test";
import { features } from "../lib/features";

test.skip(!features.lab, "lab APIs parked with the lab (404)");

test("burst of 6 against /api/ping returns one 429", async ({ request }) => {
  const headers = { "x-forwarded-for": `198.51.100.${Date.now() % 250}` };
  const statuses: number[] = [];
  let last;
  for (let i = 0; i < 6; i++) {
    last = await request.get("/api/ping?algo=window", { headers });
    statuses.push(last.status());
  }
  expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
  expect(last!.headers()["retry-after"]).toBeTruthy();
  expect(last!.headers()["x-ratelimit-remaining"]).toBe("0");
});
