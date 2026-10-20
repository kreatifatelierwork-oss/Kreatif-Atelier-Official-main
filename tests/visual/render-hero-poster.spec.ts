import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public/images/home");

/**
 * Renders the home hero's 3D stage (the factory on its podium, nothing else) as transparent posters, wide and
 * narrow, at rest (reduced motion). They show until the live scene loads, and stay on phones.
 * Run against the dev server after changing the scene: npx playwright test tests/visual/render-hero-poster.spec.ts
 */
for (const [name, width, height, outWidth] of [
  ["wide", 1440, 900, 1600],
  ["narrow", 390, 844, 780],
] as const) {
  test(`hero poster, ${name}`, async ({ page }) => {
    test.setTimeout(180_000);
    fs.mkdirSync(OUT, { recursive: true });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height });
    await page.goto("/?live=1&poster");
    const canvas = page.locator("#home [data-stage] canvas");
    await canvas.waitFor({ timeout: 60_000 });
    await page.waitForTimeout(4000);
    // The factory canvas's own pixels (kept with ?poster): real transparency, exactly the stage's box, and
    // nothing else on the page (a screenshot would also take the floating objects, mountains and fog).
    const data = await canvas.evaluate((c: HTMLCanvasElement) => c.toDataURL("image/png"));
    const png = Buffer.from(data.split(",")[1], "base64");
    await sharp(png).resize({ width: outWidth }).webp({ quality: 80, alphaQuality: 85 }).toFile(path.join(OUT, `hero-stage-${name}.webp`));
  });
}
