/**
 * Motion tokens for the whole site. Components read durations, easings and staggers from here
 * so the home page, the Aurelius page, the quote UI and the pre-footer move as one system.
 */
export const motion = {
  duration: {
    /** Hover and focus feedback. */
    fast: 0.2,
    /** Buttons, menus, small state changes. */
    base: 0.6,
    /** Headline and section reveals. */
    reveal: 1.1,
  },
  /** GSAP eases. `expo.out` for reveals, `none` for anything scrubbed to scroll. */
  ease: {
    out: "expo.out",
    scrub: "none",
    /** CSS cubic-bezier for transitions (matches the dialog). */
    css: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  stagger: {
    /** Between sibling blocks in one reveal. */
    block: 0.08,
    /** Between headline lines. */
    line: 0.1,
  },
  /** Smoothing, in seconds, for things that follow the scroll with a little lag. */
  scrub: {
    /** The history page's clock hands. */
    clock: 0.8,
  },
  parallax: {
    /** Column numerals drift against the text. Percent of their own height. */
    numerals: { from: 14, to: -8 },
    /** The staircase photo drifts slowly alongside its rows. Percent of its own height. */
    staircase: { from: 6, to: -6 },
    /** The pre-footer arc rises into place as it scrolls into view. Percent of its own height. */
    glow: { from: 35, to: 0 },
  },
} as const;
