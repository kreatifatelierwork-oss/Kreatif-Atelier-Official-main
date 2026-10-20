/**
 * Every tunable visual value lives here so it can be tweaked without touching components.
 * Camera keyframes, particle counts and quality tiers are added in Phases 3–5.
 */
export const config = {
  /** Width (px) below which the mobile layout, native scrolling and reduced 3D apply. */
  mobileBreakpoint: 768,
  /** Founder card hover tilt, in degrees (Phase 1 uses CSS only; lerped tilt comes later). */
  founderTiltDeg: 6,

  /**
   * The sky above the footer (components/footer/FooterSky.tsx): two hills in a 1536×600 box, stretched to
   * the band's size. The ridges are the hills' top edges, traced by the gold rims.
   */
  footerSky: {
    viewBox: "0 0 1536 600",
    backRidge: "M0 565 C 260 520 500 452 760 432 C 900 422 1050 428 1200 445",
    frontRidge: "M620 515 C 760 488 940 446 1120 437 C 1300 430 1430 468 1536 515",
    back: "M0 565 C 260 520 500 452 760 432 C 900 422 1050 428 1200 445 C 1350 460 1450 470 1536 476 L1536 600 L0 600 Z",
    // The front hill slopes in from the left edge under the back ridge, so it has no visible start.
    front: "M0 592 C 260 568 480 528 620 515 C 760 488 940 446 1120 437 C 1300 430 1430 468 1536 515 L1536 600 L0 600 Z",
  },
  /**
   * The home hero's content factory (features/home-v2/scene/FactoryStage.tsx): it turns half way round and back,
   * slowly, never a full spin (Roo, 2026-10-20). Swing is either side of its resting angle.
   */
  factory: { swingDeg: 35, periodS: 60 },
  /**
   * The scroll-drawn wire through step buttons (components/design/StepWire.tsx): the curve's sag (px) and the
   * scroll window it draws over (ScrollTrigger start/end), with scrub smoothing in seconds.
   */
  stepWire: { sag: 14, start: "top 78%", end: "bottom 60%", scrub: 0.6 },
  /** About page: the opening card rises by this much (% of its height) and fades to this opacity as you scroll on. */
  about: { drift: { rise: 18, fade: 0.35 } },
  /** Services mega menu: hover must rest this long on a row before it becomes active (no flicker on diagonal moves). */
  megaMenu: {
    intentMs: 90,
    /** Close this long after the pointer leaves the menu (re-entering cancels). */
    closeDelay: 180,
    /** After a click closes it, hover cannot reopen it for this long (or until the pointer leaves). */
    reopenAfter: 300,
    /** Scrolling more than this (px) while it is open closes it. */
    scrollClose: 80,
    /** Whether a click- or keyboard-opened menu also closes when the pointer leaves. */
    pinnedClosesOnLeave: false,
  },
  /** 3D artifacts. */
  artifacts: {
    /**
     * Who responds to the pointer. "hover" (default): only the artifact under the cursor. "proximity":
     * artifacts within `proximityRadius` lean toward the pointer too, weaker with distance (never all at once).
     */
    pointerMode: "proximity" as "hover" | "proximity", // Roo, 2026-10-20: move before the pointer reaches the artifact
    /** Proximity: how far outside an artifact's edge (px) the pointer starts to move it. */
    proximityPad: 140,
    /** Kept for reference by older code paths. */
    proximityRadius: 260,
    /** The live 3D model that replaces a poster under the pointer (components/design/LiveArtifactLayer.tsx). */
    live: {
      /** Rotation toward the pointer at the artifact's edge, degrees on X and Y. */
      maxTiltDeg: 20,
      /** Lift toward the viewer at full hover (world units) and the matching scale. */
      lift: 0.5,
      scale: 0.06,
      /** Spring smoothing (seconds to settle, maath damp). */
      smooth: 0.18,
      /** After the pointer leaves: poster back after `settleMs`, model disposed after `disposeAfterMs`. */
      settleMs: 380,
      disposeAfterMs: 900,
      /** Device pixel ratio cap for the live canvas. */
      maxDpr: 2,
      maxDprTouch: 1.5,
      /** The live canvas is this much larger than the poster's frame (camera widened to match), so a tilted,
       *  lifted model is never clipped by the canvas edge. */
      pad: 1.6,
      /** No live model starts while the page scrolls, nor this long after it stops. */
      scrollQuietMs: 250,
    },
    /** Every gold-scale colour (gold-400 to gold-700) is drawn as this polished metal, not yellow plastic. */
    goldMetal: { metalness: 0.92, roughness: 0.26, envMapIntensity: 2.2, clearcoat: 0.4, clearcoatRoughness: 0.1 },
  },
  /** The Aurelius pages' Vanta fog (components/aurelius-site/vantaFog.ts). */
  background: {
    /** Drift speed (Vanta's 1 = its default). */
    speed: 0.6,
    zoom: 0.7,
    /** Fog softness: higher = smoother, larger shapes. */
    blur: 0.62,
    /** Render resolution divisor: 2 draws at half size (the fog is soft, so it does not show). */
    scale: 2,
    /** Pointer: radius of its reach (px at render scale), twist (radians at the centre), warm light (0–1). */
    radius: 140,
    swirl: 1.3,
    glow: 0.45,
    /** The pointer's effect fades out this long after it stops moving; per-frame fade in and out. */
    restAfterMs: 1400,
    fadeIn: 0.08,
    fadeOut: 0.025,
  },
  scroll: {
    /** Lenis smoothing: lower = floatier, higher = snappier (0–1). */
    lerp: 0.09,
    wheelMultiplier: 1,
    /** Anchor jumps (nav links) — seconds, and the easing curve. */
    anchorDuration: 1.6,
    anchorEase: (t: number) => 1 - Math.pow(1 - t, 4),
    /** Past this many px the nav turns solid and the back-to-top button appears. */
    navSolidAfter: 40,
    backToTopAfter: 600,
  },

  reveal: {
    /** Where an element's top must reach (from the viewport top) before it reveals. */
    start: "top 88%",
    // review-animations: 12–20px travel, ease-out, 40–80ms stagger (tokens: --ds-reveal-distance, --ds-stagger).
    distance: 16,
    duration: 0.7,
    stagger: 0.06,
    /** Headline lines slide up from behind a mask. */
    lineDuration: 1.25,
    lineStagger: 0.1,
  },

  pin: {
    /**
     * When the Services / Process sections pin. Must match the `pin:` variant in globals.css.
     * Pins need room: wide and tall enough (a tighter layout applies from 620–759px tall),
     * and no reduced-motion preference.
     */
    query: "(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)",
    /** Scroll distance per px of horizontal card travel in Services (1 = one-to-one). */
    servicesScrollRatio: 1.15,
    /** Scroll distance per Process step, in viewport heights. */
    processStepVh: 0.55,
  },

  /** Home page: the Aurelius hero, the magnetic step to the light block, and the dark rising at its end. */
  front: {
    hero: {
      /** Height of the hero stage in viewport heights; everything past 100 is the sticky hold. */
      stageVh: 140,
      /** Wide screens: the title starts this far left of its resting place (% of viewport width), behind the figure. */
      titleShiftVw: 37,
      /** Narrow screens: it starts this far below its resting place (% of viewport height), behind the figure. */
      titleRiseSvh: 26,
      /** The figure grows to this as the title clears it. */
      figureScale: 1.05,
      /** Full-bleed hero: the picture eases from this scale and sideways offset (%) to its opposite while the stage holds. */
      fullScale: { from: 1.12, to: 1 },
      fullDriftPercent: 3.2,
      /** The word slides the other way behind the horse, by this much of the screen width (vw) each side. */
      wordDriftVw: 1.2,
    },
    /** The pull between the hero and the light block. */
    magnet: { duration: 1.15, ease: (t: number) => 1 - Math.pow(1 - t, 4) },
    /** The exit starts this many viewport heights before the light block's bottom enters the frame. */
    exitLead: 0.85,
    /** The header stays dark-on-light until `exit` passes this. */
    navLightBeforeExit: 0.55,
    /** The liquid-gold sculpture and the dust are parked. */
    sculpture: false,
    dust: false,
    /** Dust drifts with the page at this fraction of scroll speed. */
    dustParallax: 0.05,
    /** The sunset under the hero: how far the dark bowl hangs (percent of its band) as it scrolls through. */
    sunset: { depth: { from: 92, to: 26 } },
    veil: {
      /** Glow ramp, dark edge → page colour (the last stop must match --cream). */
      ramp: ["#5E1322", "#C2551A", "#EDA02F", "#F6D488", "#F3F0E9"],
      /** What rises from below (must match --ink, the dark sections that follow). */
      dark: "#111210",
      /** The dark dome: curvature, glow width, and how far it leads the next section. */
      dome: { curve: 0.3, width: 0.34, margin: 0.15 },
      /** Idle sway of the edge (viewport heights). */
      sway: 0.012,
      /** Canvas fades out over this stretch of `exit`, once the frame is fully dark. */
      canvasFade: [0.93, 1],
    },
  },

  three: {
    /** Palette in sRGB hex; converted to linear by three. */
    background: "#111210",
    /** Polished gold F0 (≈ measured gold reflectance), not the flat brand gold — highlights do the rest. */
    gold: "#F4D08F",

    camera: { fov: 35, z: 6 },
    /** AgX tone mapping keeps hot highlights white-gold instead of clipping to yellow. */
    exposure: 1.05,

    /** Quality tiers (see lib/three/quality.ts). DPR range is scaled by PerformanceMonitor. */
    tiers: {
      high: { dpr: [1, 2], sculptureSegments: [640, 72], dust: 2600, postfx: "full", envResolution: 256 },
      medium: { dpr: [1, 1.5], sculptureSegments: [320, 36], dust: 780, postfx: "light", envResolution: 128 },
      low: { dpr: [1, 1], sculptureSegments: [200, 24], dust: 400, postfx: "none", envResolution: 64 },
    },

    /** Mount the canvas after the page is idle (or this many ms at most) so the HTML hero paints first. */
    mountDelayMs: 1800,

    lights: {
      key: { color: "#FFD9A6", intensity: 2.6, position: [4, 5, 4] },
      rim: { color: "#9DB6FF", intensity: 1.6, position: [-5, 1.5, -4] },
    },

    /** Studio environment built from light panels (no HDR download). Reflections are what make metal read as metal. */
    studio: {
      intensity: 1,
      panels: [
        // Overhead softbox: the broad bright sheen on upward faces.
        { form: "rect", color: "#FFF4E2", intensity: 3.2, position: [0, 5, -1], rotation: [Math.PI / 2, 0, 0], scale: [9, 3] },
        // Tall warm strip, camera-left: the long crisp highlight that runs along the ribbon.
        { form: "rect", color: "#FFE2B8", intensity: 5, position: [-4.5, 1, 2], rotation: [0, Math.PI / 2.4, 0], scale: [0.5, 7] },
        // Thin cool strip, camera-right: a cinematic blue-white edge.
        { form: "rect", color: "#D8E6FF", intensity: 2.4, position: [4.8, 0.5, 1], rotation: [0, -Math.PI / 2.4, 0], scale: [0.3, 6] },
        // Warm ring behind: separates the silhouette from the dark.
        { form: "ring", color: "#FFC980", intensity: 1.4, position: [0, 0, -6], rotation: [0, 0, 0], scale: [5, 5] },
        // Low bronze bounce from below.
        { form: "rect", color: "#8C6A3F", intensity: 0.5, position: [0, -5, 0], rotation: [-Math.PI / 2, 0, 0], scale: [10, 10] },
      ],
    },

    postfx: {
      bloom: { intensity: 0.55, threshold: 0.82, smoothing: 0.25, radius: 0.7 },
      vignette: { offset: 0.28, darkness: 0.72 },
    },

    hero: {
      /** Sculpture drifts with the page at this fraction of scroll speed while the hero scrolls away. */
      parallax: 0.75,
      /** Pointer lean, radians. */
      leanX: 0.16,
      leanY: 0.24,
      leanDamping: 3.5,
      /** Intro: the ribbon grows along its length over this many seconds. */
      revealSeconds: 2.4,
      /** Canvas fades out between these scroll distances (in viewport heights) — until Phase 4's director takes over. */
      fadeFromVh: 0.55,
      fadeToVh: 1.05,
    },

    dust: {
      color: "#E8C98A",
      size: 4.2,
      /** Share of particles clustered around the sculpture (the rest drift through the whole frame). */
      clustered: 0.9,
      innerRadius: 1.35,
      outerRadius: 3.4,
      opacity: 0.85,
    },
  },
} as const;

/** The three hero sculpture studies — switch with ?sculpture=1|2|3. */
export type SculptureVariant = {
  name: string;
  /** Torus-knot windings: the path's shape. */
  p: number;
  q: number;
  knotRadius: number;
  tubeRadius: number;
  /** Slow breathing of the knot's minor radius. */
  breath: number;
  /** Cross-section: half-width, half-thickness, superellipse exponent (2 = ellipse, higher = squarer edges). */
  width: number;
  thickness: number;
  exponent: number;
  /** Cross-section turns along one full loop (half-turns allowed), and how fast the twist drifts. */
  twist: number;
  twistSpeed: number;
  /** Flowing surface noise. */
  noiseAmp: number;
  noiseFreq: number;
  noiseSpeed: number;
  /** Swells that travel along the length (molten ripple). */
  rippleAmp: number;
  rippleFreq: number;
  rippleSpeed: number;
  /** Material. */
  roughness: number;
  roughnessVariation: number;
  clearcoat: number;
  clearcoatRoughness: number;
  envIntensity: number;
  /** Scene orientation (radians) and idle spin speed (rad/s). */
  tilt: [number, number, number];
  spin: number;
  /** Multiplies the key light and studio panels for this study. */
  lightBoost: number;
};

export const sculptureVariants: Record<1 | 2 | 3, SculptureVariant> = {
  /** 1 · Ribbon — an open trefoil of slim satin-gold ribbon with a single slow half-turn. */
  1: {
    name: "Ribbon",
    p: 2, q: 3, knotRadius: 1, tubeRadius: 0.36, breath: 0.05,
    width: 0.17, thickness: 0.028, exponent: 2.8,
    twist: 0.5, twistSpeed: 0.1,
    noiseAmp: 0.018, noiseFreq: 0.9, noiseSpeed: 0.1,
    rippleAmp: 0, rippleFreq: 0, rippleSpeed: 0,
    roughness: 0.14, roughnessVariation: 0.25, clearcoat: 0, clearcoatRoughness: 0,
    envIntensity: 1.15,
    tilt: [-0.75, 0.25, 0.1], spin: 0.05, lightBoost: 1,
  },
  /** 2 · Torsion — a sweeping (3,2) rosette in a thin, blade-edged band that twists hard; mirror polish. */
  2: {
    name: "Torsion",
    p: 3, q: 2, knotRadius: 1, tubeRadius: 0.55, breath: 0.03,
    width: 0.15, thickness: 0.012, exponent: 4,
    twist: 2.5, twistSpeed: 0.28,
    noiseAmp: 0.01, noiseFreq: 1.2, noiseSpeed: 0.16,
    rippleAmp: 0, rippleFreq: 0, rippleSpeed: 0,
    roughness: 0.05, roughnessVariation: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.03,
    envIntensity: 1.4,
    tilt: [-0.95, 0.3, -0.2], spin: 0.08, lightBoost: 1.3,
  },
  /** 3 · Molten — a slim round trefoil whose surface swells and ripples slowly, like poured metal. */
  3: {
    name: "Molten",
    p: 2, q: 3, knotRadius: 1, tubeRadius: 0.38, breath: 0.06,
    width: 0.12, thickness: 0.12, exponent: 2,
    twist: 1, twistSpeed: 0.05,
    noiseAmp: 0.035, noiseFreq: 0.85, noiseSpeed: 0.08,
    rippleAmp: 0.22, rippleFreq: 7, rippleSpeed: 0.55,
    roughness: 0.17, roughnessVariation: 0.4, clearcoat: 0, clearcoatRoughness: 0,
    envIntensity: 1.15,
    tilt: [-0.7, -0.15, 0.35], spin: 0.04, lightBoost: 1,
  },
};
