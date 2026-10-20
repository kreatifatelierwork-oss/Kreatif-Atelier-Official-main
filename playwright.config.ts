import { defineConfig } from "@playwright/test";

/**
 * Visual tests for the home-v2 artifacts (against the dev server on port 3000) and unit tests
 * (`npx playwright test --project=unit`, no browser needed).
 */
export default defineConfig({
  projects: [
    { name: "visual", testDir: "tests/visual" },
    { name: "unit", testDir: ".", testMatch: /(features|lib)\/.*\.test\.ts$/ },
  ],
  outputDir: "tests/visual/out/.results",
  timeout: 180_000,
  use: { baseURL: "http://localhost:3000", channel: "chrome", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, video: "off" },
  reporter: [["list"]],
});
