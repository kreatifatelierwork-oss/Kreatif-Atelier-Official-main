import { expect, test } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/header");

/** Neumorphic at the top, frosted glass once the page scrolls; links stay readable in both. */
test("header turns to glass on scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/aurelius/services/");
  const header = page.locator("header.ds-header");
  await expect(header).not.toHaveAttribute("data-scrolled");
  await page.screenshot({ path: path.join(OUT, "top.png"), clip: { x: 0, y: 0, width: 1440, height: 160 } });
  await page.mouse.wheel(0, 1300);
  await page.waitForTimeout(900);
  await expect(header).toHaveAttribute("data-scrolled", "true");
  await page.screenshot({ path: path.join(OUT, "scrolled.png"), clip: { x: 0, y: 0, width: 1440, height: 160 } });
  const opacity = await header.evaluate((el) => getComputedStyle(el, "::before").opacity);
  expect(Number(opacity)).toBeGreaterThan(0.9);
});
