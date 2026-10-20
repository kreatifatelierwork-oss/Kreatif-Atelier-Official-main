import { expect, test } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/site");
const PAGES = ["/aurelius/", "/aurelius/services/", "/aurelius/services/seo/", "/aurelius/services/film-video-photography/", "/approach/", "/contact/", "/about/kreatif-atelier/", "/valora/"];

/** Every revamped page: renders without errors, no pictures where the artifacts replaced them, no sideways scroll. */
for (const url of PAGES) {
  test(`page ${url}`, async ({ page }) => {
    test.setTimeout(180_000);
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${url}?live=1`);
    await page.waitForSelector("#home-heading");
    if (url.includes("/services/") && url.split("/").filter(Boolean).length === 3) await page.waitForSelector("#home canvas", { timeout: 60_000 });
    await page.waitForTimeout(2500);
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 700) {
      await page.mouse.wheel(0, 700);
      await page.waitForTimeout(150);
    }
    await page.waitForTimeout(600);
    const name = url.replace(/\//g, "_").replace(/^_|_$/g, "") || "root";
    await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors.filter((e) => !/Download the React DevTools/.test(e))).toEqual([]);
  });
}
