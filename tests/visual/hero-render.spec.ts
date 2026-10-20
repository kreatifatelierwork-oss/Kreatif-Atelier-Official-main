import { test } from "@playwright/test";

/** Captures the actual rendered home hero (live 3D) at desktop size, for checking the lighting by eye. */
test("home hero render", async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/?live=1");
  await page.waitForSelector("#home [data-stage] canvas", { timeout: 60_000 });
  await page.waitForTimeout(4500);
  await page.mouse.move(720, 120);
  await page.waitForTimeout(800);
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.locator("#home").screenshot({ path: "tests/visual/out/glow/home-render.png" });
});
