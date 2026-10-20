import { expect, test } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/reel");

/**
 * The film reel under the home hero: renders, both strips move (two captures a second apart differ),
 * no sideways overflow, and the service names exist as real text for screen readers.
 */
for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
] as const) {
  test(`film reel, ${name}`, async ({ page }) => {
    test.setTimeout(180_000);
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.setViewportSize({ width, height });
    await page.goto("/aurelius/");
    const section = page.locator("#what-we-create");
    await section.scrollIntoViewIfNeeded();
    await page.waitForSelector("#what-we-create canvas", { timeout: 60_000 });
    await page.waitForTimeout(3000);
    const a = await section.screenshot({ path: path.join(OUT, `${name}-a.png`) });
    await page.waitForTimeout(1200);
    const b = await section.screenshot({ path: path.join(OUT, `${name}-b.png`) });
    expect(a.equals(b)).toBe(false);
    await expect(section.locator("ul.sr-only li")).toHaveCount(8);
    const order = await page.$$eval("main section", (els) => els.slice(0, 2).map((e) => e.id));
    expect(order).toEqual(["home", "what-we-create"]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors.filter((e) => !/Download the React DevTools/.test(e))).toEqual([]);
  });
}
