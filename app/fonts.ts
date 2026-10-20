import localFont from "next/font/local";

// Self-hosted (no build-time or runtime requests to Google). Variable weight axes.
export const cormorant = localFont({
  src: [
    {
      path: "../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});

// The latin subset has no ₹ — this 1 KB face (Cormorant latin-ext, subset to U+20B9) fills it in for prices.
export const rupee = localFont({
  src: "./fonts/cormorant-rupee.woff2",
  weight: "300 700",
  variable: "--font-rupee",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

// The Aurelius hero's wordmark only: a heavy, high-contrast display serif.
export const abril = localFont({
  src: "../node_modules/@fontsource/abril-fatface/files/abril-fatface-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-abril",
  display: "swap",
  // Only the older typeset wordmark used it; the hero now shows the owner's wordmark picture.
  preload: false,
  fallback: ["Didot", "Bodoni MT", "Georgia", "serif"],
});

// The condensed poster face from the Asraya profile, now used for headlines across the site.
export const anton = localFont({
  src: "../node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  // Headlines start below the fold on phones: not worth delaying the first paint for.
  preload: false,
  fallback: ["Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
});
