import { AU } from "@/lib/design/aurelius";

/**
 * Colours for every 3D artifact, all drawn from the Aurelius scales (lib/design/aurelius.ts, mirrored
 * from styles/design/aurelius-theme.css): maroon for bodies and depth, gold for hardware and accents,
 * cream for panels, paper and screens. Change a scale there and every artifact follows.
 *
 * The only colours not from the scales are BRAND: the platforms' own logo colours (social tiles, the
 * Google, Google Ads and Meta marks), kept exact because brand accuracy overrides the palette.
 * No artifact file may define a colour of its own (scripts/palette-audit.mjs enforces it).
 */
export { AU };

/** Official platform and mark colours. */
export const BRAND = {
  facebook: "#1877F2",
  x: "#000000",
  youtube: "#FF0000",
  tiktok: "#000000",
  linkedin: "#0A66C2",
  whatsapp: "#25D366",
  tiktokCyan: "#25F4EE",
  tiktokRed: "#FE2C55",
  instagram: ["#FEDA75", "#FA7E1E", "#D62976", "#962FBF", "#4F5BD5"],
  glyph: "#FFFFFF",
  googleRed: "#EA4335",
  googleYellow: "#FBBC05",
  googleGreen: "#34A853",
  googleBlue: "#4285F4",
  adsYellow: "#FBBC04",
  adsBlue: "#4285F4",
  adsGreen: "#34A853",
  meta: "#0866FF",
  /** Amazon: the smile's orange, the app icon's black and its cream "a". */
  amazonOrange: "#FF9900",
  amazonInk: "#232F3E",
  amazonBlack: "#0E0E0F",
  amazonCream: "#F4EAD5",
  /** Flipkart: its blue and its shopping-bag yellow. */
  flipkartBlue: "#2874F0",
  flipkartYellow: "#FFE11B",
} as const;

/** Neutral black for machinery (belt tops, camera bodies): reads as black, not maroon. */
export const NEUTRAL = { black: "#161414", blackSoft: "#262222" } as const;

/** Roles for the general artifacts (gift box, mic, billboard, pen nib and the content factory's parts). */
export const natural = {
  white: AU.cream100,
  light: AU.cream200,
  grey: AU.cream300,
  greyDark: AU.gold700,
  slate: AU.maroon900,
  slateLight: AU.maroon700,
  blue: AU.maroon700,
  blueDeep: AU.maroon800,
  sky: AU.gold300,
  coral: AU.maroon500,
  yellow: AU.gold400,
  green: AU.gold600,
  orange: AU.gold500,
  chrome: AU.gold300,
  glass: AU.cream50,
};

const socials = {
  facebook: BRAND.facebook,
  twitter: BRAND.x,
  youtube: BRAND.youtube,
  tiktok: BRAND.tiktok,
  linkedin: BRAND.linkedin,
  whatsapp: BRAND.whatsapp,
  tiktokCyan: BRAND.tiktokCyan,
  tiktokRed: BRAND.tiktokRed,
  instagram: BRAND.instagram,
  glyph: BRAND.glyph,
  amazon: BRAND.amazonBlack,
  amazonGlyph: BRAND.amazonCream,
  amazonSmile: BRAND.amazonOrange,
  flipkart: BRAND.flipkartYellow,
  flipkartGlyph: BRAND.flipkartBlue,
};

/** Roles for the referenced artifacts, recoloured into the Aurelius scales (the brief's recolour map). */
export const palette = {
  socials,
  growth: { figure: AU.gold400, block: AU.maroon700, arrow: AU.gold500, tip: AU.gold600 },
  meeting: {
    table: AU.maroon700,
    chair: AU.maroon800,
    chairLeg: AU.maroon900,
    blueShirt: AU.cream100,
    greenShirt: AU.gold300,
    yellowShirt: AU.cream200,
    trousers: AU.maroon800,
    skin: AU.cream100,
    hair: AU.maroon900,
    board: AU.cream50,
    boardYellow: AU.gold400,
    boardGrey: AU.maroon500,
    boardLine: AU.gold600,
    badge: AU.maroon600,
    badgeWhite: AU.cream50,
  },
  clapper: { body: AU.maroon900, stripe: AU.cream100, play: AU.maroon500, hinge: AU.gold500, pin: AU.gold300, background: AU.cream200 },
  camcorder: { body: NEUTRAL.blackSoft, trim: NEUTRAL.black, glass: AU.maroon600, orange: AU.gold500, blue: AU.cream200, gold: AU.gold500 },
  web: {
    window: AU.cream100,
    bar: AU.maroon700,
    textBar: AU.cream300,
    card: AU.cream50,
    shirt: AU.maroon600,
    collar: AU.maroon800,
    cart: AU.maroon700,
    wheel: AU.maroon950,
    badge: AU.gold500,
    button: AU.maroon700,
    buttonText: AU.cream50,
    bag: AU.maroon700,
    handle: AU.gold500,
    lens: AU.gold500,
    lensHandle: AU.maroon800,
    dots: [AU.gold400, AU.gold500, AU.gold600],
  },
  analytics: { board: AU.cream50, axis: AU.cream300, bars: AU.maroon600, line: AU.gold500, ring: AU.maroon700, glass: AU.cream50, handle: AU.maroon800 },
  film: { base: AU.maroon950, frame: AU.cream100, reel: AU.gold500, frames: [AU.cream100, AU.cream200, AU.gold200] },
  google: { red: BRAND.googleRed, yellow: BRAND.googleYellow, green: BRAND.googleGreen, blue: BRAND.googleBlue, pedestal: AU.maroon700, white: AU.cream50, grey: AU.cream300 },
};

/** The content factory (home scene): cream machines, maroon depth, gold hardware, on a cream podium. */
export const factory = {
  /** The play disc on the turntable: polished burgundy. */
  disc: AU.maroon700,
  bodyLight: AU.cream100,
  body: AU.cream200,
  bodyDark: AU.maroon900,
  base: AU.maroon800,
  floor: AU.cream200,
  belt: NEUTRAL.black,
  beltRail: AU.maroon900,
  pale: AU.cream50,
  paleShade: AU.cream300,
  red: AU.maroon500,
  orange: AU.gold500,
  teal: AU.maroon600,
  olive: AU.gold300,
  yellow: AU.gold400,
  green: AU.gold600,
  eraser: AU.maroon400,
  gRed: BRAND.googleRed,
  gYellow: BRAND.googleYellow,
  gGreen: BRAND.googleGreen,
  gBlue: BRAND.googleBlue,
  chrome: AU.gold300,
  chromeDark: AU.gold700,
  glass: AU.cream50,
};

/** The service artifacts' roles (mega menu, practice pages, the hero's floating objects). */
export const svc = {
  white: AU.cream100,
  card: AU.cream50,
  shade: AU.cream200,
  line: AU.cream300,
  navy: AU.maroon800,
  navyDeep: AU.maroon900,
  blue: AU.maroon600,
  blueLight: AU.gold300,
  sky: AU.cream200,
  orange: AU.gold500,
  green: AU.gold600,
  red: AU.maroon500,
  yellow: AU.gold400,
  leaf: AU.gold600,
  leafDark: AU.gold700,
  pot: AU.cream200,
  cream: AU.cream100,
  creamShade: AU.cream300,
  skin: AU.cream100,
  /** Dark hardware (camera bodies, mic heads, code-window grounds). */
  ink: AU.maroon950,
  inkSoft: AU.maroon900,
  glow: AU.gold400,
  glowCore: AU.gold200,
};

/** The lighting rig every artifact shares: a warm key, a cream fill, a faint maroon bounce, and warm contact shadows. */
export const LIGHT = {
  key: AU.cream50,
  keyWarm: AU.gold200,
  fill: AU.cream100,
  bounce: AU.maroon400,
  shadow: AU.maroon700,
};
