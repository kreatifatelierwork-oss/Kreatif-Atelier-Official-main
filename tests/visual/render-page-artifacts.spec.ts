import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { usedObjectSlugs } from "../../features/home-v2/data/artifactSets";

const OUT = path.join(process.cwd(), "public/images/artifacts");

/** Records where each poster was cut from its 640px render, so the live model can be laid exactly over it. */
const FRAMES = path.join(process.cwd(), "features/home-v2/data/posterFrames.json");
function saveFrame(key: string, info: { width: number; height: number; trimOffsetLeft?: number; trimOffsetTop?: number }) {
  const all = fs.existsSync(FRAMES) ? JSON.parse(fs.readFileSync(FRAMES, "utf8")) : {};
  all[key] = { frame: 640, left: -(info.trimOffsetLeft ?? 0), top: -(info.trimOffsetTop ?? 0), width: info.width, height: info.height };
  fs.writeFileSync(FRAMES, JSON.stringify(all, null, 2) + "\n");
}

test.use({ viewport: { width: 640, height: 640 } });

/** Renders every object the practice pages float as a transparent WebP poster (same framing as the hero objects). */
test("render page artifacts", async ({ page }) => {
  test.setTimeout(480_000);
  fs.mkdirSync(OUT, { recursive: true });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const slug of usedObjectSlugs) {
    await page.goto(`/lab/render/?obj=${slug}`);
    await page.waitForSelector(`[data-stage="${slug}"] canvas`);
    await page.waitForTimeout(1600);
    const png = await page.screenshot({ omitBackground: true });
    const { data, info } = await sharp(png).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
    saveFrame(`obj:${slug}`, info);
    await sharp(data).resize(420, 420, { fit: "inside" }).webp({ quality: 84, alphaQuality: 92 }).toFile(path.join(OUT, `${slug}.webp`));
  }
});
