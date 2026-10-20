import { expect, test } from "@playwright/test";
import path from "node:path";

/** The Phase 1 foundations page renders without errors; a full-page capture for review. */
test("design foundations", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/lab/design/");
  await page.waitForSelector("#surfaces");
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(process.cwd(), "tests/visual/out/design-foundations.png"), fullPage: true });
  expect(errors).toEqual([]);
});
