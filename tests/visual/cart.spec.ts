import { expect, test, type Page } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/cart");
const status = (page: Page) => page.locator('#index [role="status"]');
const cards = (page: Page) => page.locator("#index ul > li article");
const cartButton = (page: Page) => page.locator("header [data-cart-button]:visible");

async function openIndex(page: Page, query = "") {
  await page.goto(`/aurelius/services/${query}#index`);
  await expect(status(page)).toBeVisible();
  // The toaster (mounted with the cart) is listening once its region is in the page.
  await page.locator("section[aria-label^=Notifications]").waitFor({ state: "attached" });
  await page.waitForTimeout(200);
}

test("all services: count, filter, search, sort, load more", async ({ page }) => {
  await openIndex(page);
  await expect(status(page)).toHaveText("206 services");
  await expect(cards(page)).toHaveCount(24);
  await page.getByRole("button", { name: /^Show 24 more$/ }).click();
  await expect(cards(page)).toHaveCount(48);
  // Focus moved to the first new card.
  expect(await page.evaluate(() => document.activeElement?.closest("li") === document.querySelectorAll("#index ul > li")[24])).toBe(true);

  await page.getByRole("group", { name: "Filter by domain" }).getByRole("button", { name: /^Digital Marketing/ }).click();
  await expect(status(page)).toHaveText("29 of 206 services");
  await expect(cards(page)).toHaveCount(24);
  await page.getByRole("group", { name: "Filter by domain" }).getByRole("button", { name: /^Public Relations/ }).click();
  await expect(status(page)).toHaveText("46 of 206 services");

  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Search services").fill("podcast");
  await expect(cards(page).first()).toContainText(/podcast/i);

  await page.getByLabel("Search services").fill("");
  await page.getByLabel("Sort").selectOption("za");
  const first = await cards(page).first().locator("h3").innerText();
  const names = await cards(page).locator("h3").allInnerTexts();
  expect(first).toBe([...names].sort((a, b) => b.localeCompare(a))[0]);

  await page.getByLabel("Search services").fill("zzzz-nothing");
  await expect(status(page)).toHaveText("0 of 206 services");
  await expect(page.getByText("No services match")).toBeVisible();
});

test("pillar and query links still arrive filtered", async ({ page }) => {
  await openIndex(page, "?pillar=brand");
  await expect(status(page)).toHaveText("25 of 206 services");
  await openIndex(page, `?q=${encodeURIComponent("Answer Engine Optimization")}`);
  await expect(status(page)).toHaveText("1 of 206 services");
});

test("cart: add, badge, persist, drawer, remove, undo, clear, form", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await openIndex(page);
  const add = cards(page).first().getByRole("button", { name: /^Add .* to your selection$/ });
  await add.click();
  await expect(cards(page).first().getByRole("button", { pressed: true })).toHaveText(/Added/);
  await expect(cartButton(page).locator(".nb__badge")).toHaveText("1");
  await expect(page.locator("[data-sonner-toast]")).toContainText("added to your selection");
  await cards(page).nth(1).getByRole("button", { name: /^Add / }).click();
  await expect(cartButton(page).locator(".nb__badge")).toHaveText("2");

  // Persisted across a reload.
  await page.reload();
  await expect(cartButton(page).locator(".nb__badge")).toHaveText("2");
  await expect(cards(page).first().getByRole("button", { pressed: true })).toBeVisible();

  // Drawer: opens with focus inside, lists both.
  await cartButton(page).click();
  const drawer = page.getByRole("dialog", { name: "Your selection" });
  await expect(drawer).toBeVisible();
  await page.waitForTimeout(500);
  expect(await drawer.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  await expect(drawer.locator(".cart-item")).toHaveCount(2);
  await page.screenshot({ path: path.join(OUT, `drawer-${page.viewportSize()?.width}.png`) });

  // Focus stays trapped: tabbing round the drawer twice never leaves it. (base-ui moves focus back in
  // from its edge guards on the next frame, so wait a frame between presses, as a person would.)
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(50);
    expect(await drawer.evaluate((el) => el.contains(document.activeElement) || !!document.activeElement?.closest("[data-base-ui-focus-guard]"))).toBe(true);
  }
  expect(await drawer.evaluate((el) => el.contains(document.activeElement))).toBe(true);

  // Remove one: focus moves to the remaining remove button; Undo brings it back.
  await drawer.locator("button[data-remove]").first().click();
  await expect(drawer.locator(".cart-item")).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => document.activeElement?.hasAttribute("data-remove"))).toBe(true);
  await expect(drawer.getByRole("status")).toContainText("removed");
  await drawer.getByRole("button", { name: "Undo" }).click();
  await expect(drawer.locator(".cart-item")).toHaveCount(2);

  // Validation: empty submit marks the fields and focuses the first.
  await drawer.getByRole("button", { name: /Request quote/ }).click();
  await expect(drawer.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
  await expect(drawer.getByLabel("Email")).toHaveAttribute("aria-invalid", "true");
  await expect(drawer.getByLabel("Name")).toBeFocused();
  await page.screenshot({ path: path.join(OUT, `drawer-errors-${page.viewportSize()?.width}.png`) });

  // Clear, then Escape closes and returns focus to the cart button.
  await drawer.getByRole("button", { name: "Clear all" }).click();
  await expect(drawer.getByText("Nothing selected yet.")).toBeVisible();
  await expect(drawer.getByRole("status")).toContainText("Selection cleared");
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(cartButton(page)).toBeFocused();
  await expect(cartButton(page).locator(".nb__badge")).toHaveCount(0);
  expect(errors.filter((e) => !/Download the React DevTools/.test(e))).toEqual([]);
});

test("cart works with storage blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get: () => { throw new Error("blocked"); } });
  });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await openIndex(page);
  await cards(page).first().getByRole("button", { name: /^Add / }).click();
  await expect(cartButton(page).locator(".nb__badge")).toHaveText("1");
  expect(errors).toEqual([]);
});

test("index and drawer, phone width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openIndex(page);
  await cards(page).first().getByRole("button", { name: /^Add / }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, "index-390.png") });
  await cartButton(page).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, "drawer-390.png") });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
