import { expect, test } from "@playwright/test";

/** Opening a page from the menu or a pillar button, from far down the page, lands at the top of the new page. */
test("menu category, menu service and pillar button all land at the top", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const menu = () => page.getByRole("list", { name: "Service categories" }).first();
  const openMenu = async () => {
    await page.mouse.wheel(0, 2500);
    await page.waitForTimeout(1000);
    await page.getByRole("banner").getByRole("link", { name: "Services", exact: true }).hover();
    await page.waitForTimeout(400);
  };
  const landed = async (label: string) => {
    await page.waitForTimeout(2000);
    const y = await page.evaluate(() => window.scrollY);
    console.log(label, page.url(), "scrollY", y);
    expect(y, label).toBeLessThan(10);
  };

  await page.goto("/");
  await openMenu();
  await menu().getByRole("link", { name: "Advertising" }).click();
  await landed("category");

  await page.goto("/");
  await openMenu();
  await menu().getByRole("link", { name: "Search Engine Optimization" }).hover();
  await page.waitForTimeout(300);
  await page.getByRole("region", { name: "Search Engine Optimization" }).getByRole("link").first().click();
  await landed("service");

  await page.goto("/aurelius/");
  const pillar = page.locator("#our-services a[href*='pillar=']").first();
  await pillar.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await pillar.click();
  await landed("pillar");
});
