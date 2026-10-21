import { test } from "@playwright/test";
import path from "node:path";
import sharp from "sharp";
import { FRAMING } from "../../features/home-v2/scene/factoryFraming";

const OUT = path.join(process.cwd(), "public/images/home");

/**
 * Renders the home factory's still pictures, shown until the live scene draws. Each is the camera's exact fit box
 * (FactoryStage FRAMING), so object-fit: contain in any stage reproduces the live framing pixel for pixel, and it
 * is rendered at 2× so it is sharp on high-density screens.
 * - wide: the stage set to the fit box's own aspect (both fits equal), the whole canvas.
 * - narrow: a portrait stage (portrait framing, always width-driven), cropped to a centred square: the zoom is about
 *   the centre and fixed by the width, so a square is contained width-first in every portrait stage.
 * Run against the dev server after changing the scene: npx playwright test tests/visual/render-hero-poster.spec.ts
 */
const CSS_W = 1200;

for (const name of ["wide", "narrow"] as const) {
  test(`hero poster, ${name}`, async ({ browser }) => {
    test.setTimeout(180_000);
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1400 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/?live=1&poster");
    const f = name === "wide" ? FRAMING.landscape : FRAMING.portrait;
    const w = name === "wide" ? CSS_W : 800;
    const h = name === "wide" ? Math.round((CSS_W * f.fitH) / f.fitW) : 1200;
    await page.addStyleTag({ content: `#home [data-stage]{position:fixed!important;inset:auto!important;left:0!important;top:0!important;width:${w}px!important;height:${h}px!important;z-index:999}` });
    const canvas = page.locator("#home [data-stage] canvas");
    await canvas.waitFor({ timeout: 60_000 });
    await page.waitForTimeout(4500);
    const data = await canvas.evaluate((c: HTMLCanvasElement) => c.toDataURL("image/png"));
    let img = sharp(Buffer.from(data.split(",")[1], "base64"));
    const meta = await img.metadata();
    if (name === "narrow") {
      // A centred square (portrait stages are narrower than 1:1, so the square is always contained by its width).
      const boxH = meta.width!;
      img = sharp(await img.extract({ left: 0, top: Math.round((meta.height! - boxH) / 2), width: meta.width!, height: boxH }).png().toBuffer());
    }
    await img.webp({ quality: 86, alphaQuality: 90 }).toFile(path.join(OUT, `hero-stage-${name}.webp`));
    await ctx.close();
  });
}
