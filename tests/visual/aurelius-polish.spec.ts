import { expect, test } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/polish");

// The Aurelius polish pass (2026-10-20): the fog background, the pillar artifacts, the glass mega menu,
// and a readable service note.
test("fog background reacts and the hero reads over it", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
  await page.waitForSelector(".au-bg__fog[data-ready] canvas", { timeout: 30_000 });
  for (let i = 0; i < 30; i++) await page.mouse.move(250 + i * 12, 420 + i * 4);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, "hero-fog.png") });
  expect(errors.filter((e) => !/Download the React DevTools/.test(e))).toEqual([]);
});

test("our services pillars carry their artifacts", async ({ page }) => {
  await page.goto("/aurelius/");
  const section = page.locator("#our-services");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await expect(section.locator(".fa img")).toHaveCount(4);
  const art = section.locator(".fa").first();
  const box = await art.boundingBox();
  if (box) await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.45);
  await page.waitForTimeout(700);
  await section.screenshot({ path: path.join(OUT, "pillars.png") });
});

test("mega menu is glass", async ({ page }) => {
  await page.goto("/aurelius/");
  await page.waitForTimeout(1500);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(800);
  await page.locator('header a[aria-haspopup="true"]').first().hover();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, "mega-menu.png") });
  const bf = await page.locator(".glass-panel").first().evaluate((el) => getComputedStyle(el).backdropFilter);
  expect(bf).toContain("blur");
});

test("service note is readable", async ({ page }) => {
  await page.goto("/aurelius/services/seo/");
  await page.waitForTimeout(1500);
  // The tiles reveal on scroll.
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(1500);
  await page.locator('main button[aria-haspopup="dialog"]').first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, "service-note.png") });
  // Text and panel colours: dark maroon type on a light panel.
  const { fg, body, bg } = await page.locator(".ds-dialog__panel").evaluate((el) => {
    const h = el.querySelector("h2") as HTMLElement;
    const body = h.nextElementSibling as HTMLElement;
    return { fg: getComputedStyle(h).color, body: getComputedStyle(body).color, bg: getComputedStyle(el).backgroundColor };
  });
  const lum = (c: string) => {
    const [r, g, b] = (c.match(/[\d.]+/g) ?? []).map(Number);
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  };
  expect(lum(bg)).toBeGreaterThan(0.8);
  expect(lum(fg)).toBeLessThan(0.3);
  expect(lum(body)).toBeLessThan(0.4);
});
