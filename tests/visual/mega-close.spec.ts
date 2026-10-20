import { expect, test, type Page } from "@playwright/test";

/** The services mega menu opens and closes reliably (2026-10-21 bug: it stayed open). */
const trigger = (p: Page) => p.getByRole("banner").getByRole("link", { name: "Services", exact: true });
const panel = (p: Page) => p.locator("[data-mega-panel]");
const glass = (p: Page) => p.locator("[data-mega-panel] .glass-panel");

/** Wait until the header is interactive (React has hydrated). */
async function hydrated(page: Page) {
  await page.waitForLoadState("load");
  await page.waitForTimeout(1200);
}

async function openByHover(page: Page) {
  const t = await trigger(page).boundingBox();
  await page.mouse.move(t!.x + t!.width / 2, t!.y + t!.height / 2);
  await expect(panel(page)).toBeVisible();
  return t!;
}

for (const width of [1440, 1920]) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("leaving sideways closes it (left and right)", async ({ page }) => {
      await page.goto("/aurelius/");
  await hydrated(page);
      for (const side of ["left", "right"] as const) {
        await openByHover(page);
        const g = (await glass(page).boundingBox())!;
        await page.mouse.move(g.x + g.width / 2, g.y + 60, { steps: 6 });
        const x = side === "left" ? g.x - 40 : g.x + g.width + 40;
        await page.mouse.move(x, g.y + 60, { steps: 6 });
        await expect(panel(page)).toBeHidden({ timeout: 1500 });
      }
    });

    test("leaving through the bottom closes it; travelling from trigger to panel does not", async ({ page }) => {
      await page.goto("/aurelius/");
  await hydrated(page);
      const t = await openByHover(page);
      const g = (await glass(page).boundingBox())!;
      // Diagonal down into the panel: stays open.
      await page.mouse.move(g.x + g.width * 0.7, g.y + 80, { steps: 12 });
      await expect(panel(page)).toBeVisible();
      await page.mouse.move(g.x + g.width / 2, g.y + g.height + 60, { steps: 6 });
      await expect(panel(page)).toBeHidden({ timeout: 1500 });
      expect(t).toBeTruthy();
    });
  });
}

test("on a services page, clicking Services again closes it", async ({ page }) => {
  await page.goto("/aurelius/services/");
  await hydrated(page);
  await openByHover(page);
  await trigger(page).click();
  await expect(panel(page)).toBeHidden({ timeout: 1500 });
});

test("clicking a practice link for the current page closes it", async ({ page }) => {
  await page.goto("/aurelius/services/seo/");
  await hydrated(page);
  await openByHover(page);
  await panel(page).getByRole("link", { name: /Search Engine Optimization/ }).first().click();
  await expect(panel(page)).toBeHidden({ timeout: 1500 });
});

test("Escape closes it and returns focus to the trigger; outside click closes it", async ({ page }) => {
  await page.goto("/aurelius/");
  await hydrated(page);
  await trigger(page).focus();
  await page.keyboard.press("ArrowDown");
  await expect(panel(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel(page)).toBeHidden();
  await expect(trigger(page)).toBeFocused();
  await openByHover(page);
  await page.mouse.click(30, 860);
  await expect(panel(page)).toBeHidden({ timeout: 1500 });
});

test("leaving the window closes it", async ({ page }) => {
  await page.goto("/aurelius/");
  await hydrated(page);
  await openByHover(page);
  await page.mouse.move(700, -5);
  await page.dispatchEvent("html", "mouseout", { relatedTarget: null });
  await expect(panel(page)).toBeHidden({ timeout: 1500 });
});

test("nothing in the open menu covers the Services link", async ({ page }) => {
  await page.goto("/aurelius/");
  await hydrated(page);
  const t = await openByHover(page);
  for (const v of [0.2, 0.5, 0.95]) {
    const hit = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.textContent?.trim(), [t.x + t.width / 2, t.y + t.height * v]);
    expect(hit).toBe("Services");
  }
});
