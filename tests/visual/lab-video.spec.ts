import { test } from "@playwright/test";

test.use({ video: { mode: "on", size: { width: 1440, height: 900 } } });

/** Scrolls the lab with float and mouse parallax on, moving the cursor over each card, for the checkpoint video. */
test("lab walkthrough", async ({ page }) => {
  // The lab holds ~50 cards and the video lingers on each.
  test.setTimeout(480_000);
  await page.goto("/lab/artifacts/");
  await page.waitForSelector("[data-artifact]");
  const ids = await page.$$eval("[data-artifact]", (els) => els.map((e) => e.getAttribute("data-artifact")!));
  for (const id of ids) {
    const card = page.locator(`[data-artifact="${id}"]`);
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2600);
    const box = await card.locator("[data-render]").boundingBox();
    if (box) for (let i = 0; i <= 8; i++) await page.mouse.move(box.x + (box.width * i) / 8, box.y + box.height * (0.3 + 0.4 * Math.sin(i)), { steps: 6 });
  }
});
