import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { AU, AU_UI } from "./aurelius";
import { contrast } from "./tokens";

test("Aurelius scales match aurelius-theme.css", () => {
  const css = fs.readFileSync(path.join(process.cwd(), "styles/design/aurelius-theme.css"), "utf8");
  const name = (k: string) => `--au-${k.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/(\d+)$/, "-$1")}`;
  for (const [k, v] of Object.entries(AU)) expect(css, k).toMatch(new RegExp(`${name(k)}:\\s*${v};`, "i"));
  for (const [k, v] of [
    ["--ds-surface", AU_UI.surface],
    ["--ds-surface-raised", AU_UI.surfaceRaised],
    ["--ds-surface-sunken", AU_UI.surfaceSunken],
    ["--ds-text-muted", AU_UI.textMuted],
    ["--ds-text-subtle", AU_UI.textSubtle],
  ])
    expect(css, k).toMatch(new RegExp(`${k}:\\s*${v};`, "i"));
});

test("Aurelius text meets WCAG AA on every surface", () => {
  const surfaces = [AU_UI.surface, AU_UI.surfaceRaised, AU_UI.surfaceSunken, AU.cream50];
  for (const on of surfaces)
    for (const [label, fg] of Object.entries({ text: AU_UI.text, muted: AU_UI.textMuted, subtle: AU_UI.textSubtle, brand: AU_UI.brand, link: AU_UI.link })) {
      const r = contrast(fg, on);
      expect(r, `${label} on ${on} = ${r.toFixed(2)}`).toBeGreaterThanOrEqual(4.5);
    }
  // The gold CTA: maroon type on the gradient's lightest and darkest stops.
  for (const stop of [AU.gold400, AU.gold500, AU.gold600]) expect(contrast(AU_UI.ctaInk, stop), `cta ink on ${stop}`).toBeGreaterThanOrEqual(4.5);
  // Gold text: gold ink passes AA as body text; the display golds pass 3:1 for large type.
  for (const on of surfaces) {
    expect(contrast(AU.goldInk, on), `gold ink on ${on}`).toBeGreaterThanOrEqual(4.5);
    for (const g of [AU.gold700, AU.goldInk]) expect(contrast(g, on), `display gold ${g} on ${on}`).toBeGreaterThanOrEqual(3);
  }
  // Cream type on the maroon fill.
  expect(contrast(AU_UI.onAccent, AU.maroon800)).toBeGreaterThanOrEqual(4.5);
});
