import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { BRAND, palette } from "./palette";

/** The palette audit (scripts/palette-audit.mjs) must pass: no artifact defines its own colours. */
test("palette audit passes", () => {
  const out = execFileSync("node", ["scripts/palette-audit.mjs"], { encoding: "utf8" });
  expect(out).toContain("0 hardcoded colour(s)");
});

/** Social tiles keep their exact platform colours: brand accuracy overrides the palette. */
test("social logo faces keep their brand colours", () => {
  expect(palette.socials.facebook).toBe(BRAND.facebook);
  expect(palette.socials.youtube).toBe(BRAND.youtube);
  expect(palette.socials.linkedin).toBe(BRAND.linkedin);
  expect(palette.socials.whatsapp).toBe(BRAND.whatsapp);
  expect(palette.socials.instagram).toEqual(BRAND.instagram);
});
