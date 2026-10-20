import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "tests/visual/out");

/**
 * Screenshots every artifact in snapshot mode (turntable off, reference camera) beside its reference,
 * then builds a contact sheet: reference on the left, render on the right.
 */
test("artifact snapshots and contact sheet", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(m.text()));
  await page.goto("/lab/artifacts/?snapshot=1");
  await page.waitForSelector("[data-artifact]");
  const ids = await page.$$eval("[data-artifact]", (els) => els.map((e) => e.getAttribute("data-artifact")!));
  fs.mkdirSync(OUT, { recursive: true });
  const rows: Buffer[] = [];
  for (const id of ids) {
    const card = page.locator(`[data-artifact="${id}"]`);
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const render = await card.locator("[data-render]").screenshot();
    fs.writeFileSync(path.join(OUT, `${id}.render.png`), render);
    const hasRef = (await card.locator("[data-ref]").count()) > 0;
    const ref = hasRef ? await card.locator("[data-ref]").screenshot() : null;
    if (ref) fs.writeFileSync(path.join(OUT, `${id}.ref.png`), ref);
    const a = ref
      ? await sharp(ref).resize(400, 400).toBuffer()
      : await sharp({ create: { width: 400, height: 400, channels: 3, background: "#ffffff" } }).png().toBuffer();
    const b = await sharp(render).resize(400, 400).toBuffer();
    rows.push(await sharp({ create: { width: 820, height: 400, channels: 3, background: "#ffffff" } }).composite([{ input: a, left: 0, top: 0 }, { input: b, left: 420, top: 0 }]).png().toBuffer());
  }
  await sharp({ create: { width: 820, height: rows.length * 410, channels: 3, background: "#ffffff" } })
    .composite(rows.map((input, i) => ({ input, left: 0, top: i * 410 })))
    .png()
    .toFile(path.join(OUT, "contact-sheet.png"));
  expect(errors.filter((e) => !/DevTools|Download the React|THREE\.Clock: This module has been deprecated/.test(e))).toEqual([]);
});
