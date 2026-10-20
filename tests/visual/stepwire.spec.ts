import { expect, test } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/wire");

test("steps light up as the wire draws, and open their detail", async ({ page }) => {
  await page.goto("/approach/");
  const sw = page.locator("#process .sw");
  await sw.scrollIntoViewIfNeeded();
  for (let i = 0; i < 12; i++) {
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(1200);
  await expect(sw.locator(".sw-step[data-lit]").first()).toBeVisible();
  const step = sw.getByRole("button", { name: /Strategy/ });
  await step.click();
  await expect(step).toHaveAttribute("aria-expanded", "true");
  await expect(sw.locator(".sw__detail")).toContainText("Positioning and messaging");
  await sw.screenshot({ path: path.join(OUT, "detail-open.png") });
  await step.press("Enter");
  await expect(step).toHaveAttribute("aria-expanded", "false");
});

test("reduced motion: the whole wire is drawn and every step is lit", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/approach/");
  await page.waitForTimeout(1500);
  await expect(page.locator("#process .sw-step[data-lit]")).toHaveCount(5);
  await expect(page.locator("#measurement .sw-step[data-lit]")).toHaveCount(4);
});
