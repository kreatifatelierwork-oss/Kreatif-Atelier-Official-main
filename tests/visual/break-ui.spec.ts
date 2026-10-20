import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "tests/visual/out/break");
const PAGES = ["/", "/aurelius/", "/aurelius/services/", "/aurelius/services/branding-creative-design/", "/aurelius/services/film-video-photography/", "/contact/", "/approach/", "/about/kreatif-atelier/"];

/**
 * break-ui, adapted to fixed site copy: the worst real content at the narrowest phone (320px) and at
 * 200% text size, plus the empty and one-result states of the service search. Writes every element
 * that pokes past the viewport, so each finding names its element.
 */
test("worst cases", async ({ page }) => {
  test.setTimeout(600_000);
  fs.mkdirSync(OUT, { recursive: true });
  const findings: Record<string, unknown> = {};
  const overflowing = () =>
    page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const out: string[] = [];
      for (const el of Array.from(document.querySelectorAll<HTMLElement>("main *"))) {
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > vw + 1 || r.left < -1) && getComputedStyle(el).position !== "fixed") {
          const text = (el.innerText || el.getAttribute("aria-label") || el.tagName).slice(0, 40).replace(/\s+/g, " ");
          out.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().slice(0, 50)} — "${text}" (${Math.round(r.left)}→${Math.round(r.right)} of ${vw})`);
        }
      }
      return { pageOverflow: document.documentElement.scrollWidth - vw, elements: out.slice(0, 12) };
    });
  for (const [mode, width, zoom] of [
    ["320", 320, 1],
    ["zoom200", 1280, 2],
  ] as const) {
    await page.setViewportSize({ width, height: 800 });
    for (const url of PAGES) {
      await page.goto(url);
      await page.waitForSelector("#home-heading");
      if (zoom > 1) await page.addStyleTag({ content: "html{font-size:200% !important}" });
      await page.waitForTimeout(1200);
      // Reveal everything so nothing is measured mid-animation.
      await page.evaluate(() => document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => ((el.style.opacity = "1"), (el.style.visibility = "visible"), (el.style.transform = "none"))));
      const name = `${mode}${url.replace(/\//g, "_")}`;
      findings[name] = await overflowing();
      await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
    }
  }
  // Empty and one-result states of the service search.
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [q, label] of [
    ["zzzz-no-such-service", "search-empty"],
    ["Answer Engine Optimization", "search-one"],
  ] as const) {
    await page.goto(`/aurelius/services/?q=${encodeURIComponent(q)}#index`);
    await page.waitForTimeout(1500);
    await page.locator("#index").screenshot({ path: path.join(OUT, `${label}.png`) });
    findings[label] = await page.locator('#index [role="status"]').innerText();
  }
  fs.writeFileSync(path.join(OUT, "findings.json"), JSON.stringify(findings, null, 2));
});
