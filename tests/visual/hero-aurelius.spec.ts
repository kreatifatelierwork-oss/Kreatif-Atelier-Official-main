import { expect, test } from "@playwright/test";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/hero");
const SIZES = [
  [1440, 900],
  [1920, 1080],
  [1280, 720],
  [390, 844],
] as const;

/**
 * The Aurelius home hero fits exactly one screen at each size, and no floating object covers the
 * wordmark, tagline or buttons. Captures each size.
 */
for (const [w, h] of SIZES) {
  for (const variant of ["centered"] as const) {
    test(`hero ${variant} ${w}x${h}`, async ({ page }) => {
      test.setTimeout(120_000);
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      await page.setViewportSize({ width: w, height: h });
      await page.goto("/?live=1");
      await page.waitForSelector("#home [data-stage] canvas", { timeout: 60_000 });
      await page.waitForTimeout(3500);
      const box = await page.locator("#home").boundingBox();
      expect(Math.round(box!.height)).toBe(Math.max(h, 560));
      const overlaps = await page.evaluate(() => {
        const solid = Array.from(document.querySelectorAll<HTMLElement>("#home-heading, .au-tagline, #home .neu-btn")).map((e) => e.getBoundingClientRect());
        const items = Array.from(document.querySelectorAll<HTMLElement>("#home .fa")).filter((e) => getComputedStyle(e).display !== "none");
        const hit: string[] = [];
        for (const el of items) {
          const r = el.getBoundingClientRect();
          for (const s of solid) if (r.left < s.right - 4 && r.right > s.left + 4 && r.top < s.bottom - 4 && r.bottom > s.top + 4) hit.push(el.querySelector("img")?.getAttribute("src") ?? "orb");
        }
        return hit;
      });
      await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
      await page.screenshot({ path: path.join(OUT, `${variant}-${w}x${h}.png`) });
      expect(overlaps).toEqual([]);
      expect(errors.filter((e) => !/Download the React DevTools/.test(e))).toEqual([]);
    });
  }
}
