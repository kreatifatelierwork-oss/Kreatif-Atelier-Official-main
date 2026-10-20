import { expect, test } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/practice");

/** On every practice page the services come straight after the hero, before the quotes, and each opens its note. */
for (const [name, width] of [
  ["desktop", 1440],
  ["mobile", 390],
] as const) {
  test(`practice services, ${name}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/aurelius/services/seo/");
    const sections = await page.$$eval("main section", (els) => els.map((e) => e.getAttribute("aria-labelledby") ?? "pov"));
    expect(sections.slice(0, 3)).toEqual(["home-heading", "services-heading", "pov"]);
    const list = page.locator("section[aria-labelledby=services-heading]");
    await list.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => ((el.style.opacity = "1"), (el.style.visibility = "visible"), (el.style.transform = "none"))));
    await page.waitForTimeout(400);
    await list.screenshot({ path: path.join(OUT, `${name}.png`) });
    await list.getByRole("button", { name: /Technical SEO/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
