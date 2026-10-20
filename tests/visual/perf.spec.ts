import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/**
 * animation-performance: frame times on the home hero while the pointer moves (artifacts +
 * factory all live), and while scrolling the sections below. Records the median and the share of
 * frames slower than 1/50 s.
 */
test("frame budget", async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForSelector("#home canvas", { timeout: 60_000 });
  await page.waitForTimeout(4000);
  const sample = async (label: string, drive: () => Promise<void>) => {
    await page.evaluate(() => {
      const w = window as unknown as { __f: number[]; __run: boolean };
      w.__f = [];
      w.__run = true;
      let last = performance.now();
      const loop = (t: number) => {
        w.__f.push(t - last);
        last = t;
        if (w.__run) requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });
    await drive();
    const f = await page.evaluate(() => {
      const w = window as unknown as { __f: number[]; __run: boolean };
      w.__run = false;
      return w.__f.slice(5);
    });
    const sorted = [...f].sort((a, b) => a - b);
    return { label, frames: f.length, medianMs: +sorted[Math.floor(sorted.length / 2)].toFixed(1), p95Ms: +sorted[Math.floor(sorted.length * 0.95)].toFixed(1), slowShare: +(f.filter((x) => x > 20).length / f.length).toFixed(3) };
  };
  const results = [
    await sample("hero, pointer moving", async () => {
      for (let i = 0; i < 120; i++) await page.mouse.move(300 + (i % 60) * 14, 250 + Math.sin(i / 6) * 150);
    }),
    await sample("scrolling the sections", async () => {
      for (let i = 0; i < 40; i++) {
        await page.mouse.wheel(0, 180);
        await page.waitForTimeout(40);
      }
    }),
  ];
  fs.writeFileSync(path.join(process.cwd(), "tests/visual/out/perf.json"), JSON.stringify(results, null, 2));
});
