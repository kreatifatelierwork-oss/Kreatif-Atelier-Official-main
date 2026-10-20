import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public/images/services/artifacts");
const IDS = [
  "all-services",
  "digital-marketing",
  "public-relations",
  "promotions",
  "seo",
  "branding-creative-design",
  "advertising",
  "analytics-performance",
  "lead-generation-growth",
  "film-video-photography",
  "technology-product",
  "advisory-transformation",
];

test.use({ viewport: { width: 720, height: 720 } });

/** Exports the twelve service artifacts as transparent WebP pictures for the mega menu and service pages. */
test("render service artifacts", async ({ page }) => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const id of IDS) {
    await page.goto(`/lab/render/?id=${id}`);
    await page.waitForSelector(`[data-stage="${id}"] canvas`);
    await page.waitForTimeout(1800);
    const png = await page.screenshot({ omitBackground: true });
    await sharp(png).resize(640, 640).webp({ quality: 82, alphaQuality: 90 }).toFile(path.join(OUT, `${id}.webp`));
  }
});
