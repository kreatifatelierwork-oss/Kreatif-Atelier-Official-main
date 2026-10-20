import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { contrast, contrastPairs, palette } from "./tokens";

test("every text/surface pairing meets WCAG AA", () => {
  for (const { text, on, min } of contrastPairs) {
    const ratio = contrast(palette[text], palette[on]);
    expect(ratio, `${text} on ${on} = ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(min);
  }
});

test("the JS mirror matches tokens.css", () => {
  const css = fs.readFileSync(path.join(process.cwd(), "styles/design/tokens.css"), "utf8");
  const pairs: [string, string][] = [
    ["--ds-surface", palette.surface],
    ["--ds-surface-raised", palette.surfaceRaised],
    ["--ds-surface-sunken", palette.surfaceSunken],
    ["--ds-text", palette.text],
    ["--ds-text-muted", palette.textMuted],
    ["--ds-text-subtle", palette.textSubtle],
    ["--ds-brand", palette.brand],
    ["--ds-navy", palette.navy],
    ["--ds-blue", palette.blue],
  ];
  for (const [name, value] of pairs) expect(css, name).toMatch(new RegExp(`${name}:\\s*${value};`, "i"));
});
