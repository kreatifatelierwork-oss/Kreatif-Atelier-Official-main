import { expect, test } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/menu");

/** The Services mega menu at desktop width: opens on hover, follows the hovered category, works from the keyboard. */
test("services mega menu, desktop", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/aurelius/");
  const services = page.getByRole("banner").getByRole("link", { name: "Services", exact: true });
  await services.hover();
  const panel = page.getByRole("list", { name: "Service categories" }).first();
  await expect(panel).toBeVisible();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, "desktop-all.png") });
  await panel.getByRole("link", { name: "Film, Video & Photography" }).hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, "desktop-film.png") });
  // Keyboard: the right arrow on a card moves into that category's services.
  await panel.getByRole("link", { name: "Film, Video & Photography" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(":focus")).toHaveText("Brand Film & Commercials");
  // Escape closes it.
  await panel.getByRole("link", { name: "Advertising" }).focus();
  await page.mouse.move(700, 880);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, "desktop-keyboard.png") });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  await expect(panel).toBeHidden();
  expect(errors).toEqual([]);
});

/** The mobile menu at phone width: categories with artifacts, and the separate "Other services" section. */
test("services menu, mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/aurelius/");
  await page.getByRole("button", { name: /menu/i }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.locator("summary", { hasText: "Services" }).first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, "mobile-categories.png"), fullPage: false });
  await dialog.locator("summary", { hasText: "Other services" }).click();
  await dialog.locator("summary", { hasText: "Film, Video & Photography" }).click();
  await page.waitForTimeout(400);
  await dialog.locator("summary", { hasText: "Other services" }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(OUT, "mobile-other.png") });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
