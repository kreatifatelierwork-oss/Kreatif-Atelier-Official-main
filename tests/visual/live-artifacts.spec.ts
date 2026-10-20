import { expect, test, type Page } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/live");

/** Moves the pointer over a poster's painted centre, then across it, recording the frame times. */
async function sweep(page: Page, box: { x: number; y: number; width: number; height: number }) {
  await page.evaluate(() => {
    const w = window as unknown as { __ft: number[] };
    w.__ft = [];
    let last = performance.now();
    const loop = (t: number) => {
      w.__ft.push(t - last);
      last = t;
      if (w.__ft.length < 240) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    await page.mouse.move(box.x + box.width * (0.3 + 0.4 * t), box.y + box.height * (0.35 + 0.3 * Math.sin(t * Math.PI)));
    await page.waitForTimeout(25);
  }
  return page.evaluate(() => (window as unknown as { __ft: number[] }).__ft.slice(10));
}

for (const [name, url, selector] of [
  ["hero object", "/", '.au-hero .fa:has(img[src*="megaphone"]), .au-hero .fa:has(img[src*="advertising"])'],
  ["practice object", "/aurelius/services/digital-marketing/", ".pf--hero-a"],
] as const) {
  test(`live 3D on hover: ${name}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto(url);
    await page.waitForTimeout(2500);
    const fa = page.locator(selector).first();
    await page.waitForTimeout(600);
    const box = (await fa.locator("img").boundingBox())!;
    const slug = name.replace(" ", "-");
    await page.screenshot({ path: path.join(OUT, `${slug}-poster.png`), clip: { x: box.x - 60, y: box.y - 60, width: box.width + 120, height: box.height + 120 } });

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await expect(page.locator(".live-artifact[data-ready] canvas")).toBeVisible({ timeout: 15_000 });
    await expect(fa).toHaveAttribute("data-live", "");
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.2);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT, `${slug}-live-top-right.png`), clip: { x: box.x - 60, y: box.y - 60, width: box.width + 120, height: box.height + 120 } });
    await page.mouse.move(box.x + box.width * 0.15, box.y + box.height * 0.8);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT, `${slug}-live-bottom-left.png`), clip: { x: box.x - 60, y: box.y - 60, width: box.width + 120, height: box.height + 120 } });

    const ft = await sweep(page, box);
    const avg = ft.reduce((a, b) => a + b, 0) / ft.length;
    const dropped = ft.filter((d) => d > 1000 / 50).length;
    console.log(`${name}: avg frame ${avg.toFixed(1)}ms, frames over 20ms: ${dropped}/${ft.length}`);

    // Leave: the poster comes back and the live view hides. (The canvas itself is kept for the visit, so the
    // next hover never creates a new one; only the model inside is let go.)
    await page.mouse.move(5, 5);
    await expect(fa).not.toHaveAttribute("data-live", "", { timeout: 3000 });
    await expect(page.locator(".live-artifact")).not.toHaveAttribute("data-ready", /.*/, { timeout: 3000 });
    expect(errors.filter((e) => !/Download the React DevTools|THREE.Clock/.test(e))).toEqual([]);
  });
}

/** Proximity (the default): the artifact responds before the pointer reaches it. */
test("live 3D starts near the artifact, not only on it", async ({ page }) => {
  await page.goto("/aurelius/services/digital-marketing/");
  await page.waitForTimeout(2500);
  const fa = page.locator(".pf--hero-a");
  const box = (await fa.locator("img").boundingBox())!;
  // 60px to the left of the picture's edge, level with its middle.
  for (let i = 0; i < 8; i++) {
    await page.mouse.move(box.x - 60 - (8 - i) * 6, box.y + box.height / 2);
    await page.waitForTimeout(40);
  }
  await expect(page.locator(".live-artifact[data-ready] canvas")).toBeVisible({ timeout: 15_000 });
  await page.screenshot({ path: path.join(OUT, "proximity.png"), clip: { x: box.x - 140, y: box.y - 60, width: box.width + 200, height: box.height + 120 } });
  await page.mouse.move(5, 5);
  await expect(fa).not.toHaveAttribute("data-live", "", { timeout: 3000 });
});

/** Regression (2026-10-20): once live, the poster must keep receiving the pointer, so the model follows it across. */
test("the live model keeps following the pointer across the artifact", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2500);
  const fa = page.locator('.au-hero [data-hero-float] .fa:has(img[src*="advertising"])');
  const box = (await fa.locator("img").boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);
  await expect(page.locator(".live-artifact[data-ready] canvas")).toBeVisible({ timeout: 15_000 });
  const shadow = () => fa.evaluate((el) => parseFloat(el.style.getPropertyValue("--fa-sx")));
  await page.waitForTimeout(600);
  const left = await shadow();
  // Stops at 68% across: past that, the megaphone's bell is transparent, which (correctly) ends the hover.
  for (let i = 1; i <= 8; i++) {
    await page.mouse.move(box.x + box.width * (0.2 + 0.06 * i), box.y + box.height / 2);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(600);
  const right = await shadow();
  // Turned toward the pointer on each side: the shadow offset changes sign.
  expect(left).toBeGreaterThan(0);
  expect(right).toBeLessThan(0);
});
