import { expect, test } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/home");

for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
] as const) {
  test(`home, ${name}`, async ({ page }) => {
    test.setTimeout(240_000);
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.setViewportSize({ width, height });
    await page.goto("/?live=1");
    await page.waitForSelector("#home-heading");
    await page.waitForSelector("#home canvas", { timeout: 60_000 });
    await page.waitForTimeout(3500);
    await page.mouse.move(width * 0.7, height * 0.4);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT, `${name}-hero.png`) });
    // Scroll through so the one-time reveals run, then capture the whole page.
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += height * 0.8) {
      await page.mouse.wheel(0, height * 0.8);
      await page.waitForTimeout(250);
    }
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT, `${name}-full.png`), fullPage: true });
    // No photographs: the only pictures are the 3D stage posters, the rendered artifacts and the relief world map.
    expect(await page.locator('main img:not([data-stage] img):not([src*="/images/services/artifacts/"]):not([src*="/images/hero/objects/"]):not([src*="world-relief"]):not([src*="/images/artifacts/"]):not([src*="aurelius-wordmark"])').count()).toBe(0);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors.filter((e) => !/Download the React DevTools/.test(e))).toEqual([]);
  });
}
