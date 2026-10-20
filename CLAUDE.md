# Kreatif Atelier — 3D Website Rebuild

## What this project is
A full redesign of https://kreatifatelier.com as an immersive, scroll-driven 3D website.
The current site is a single long page. We keep its content and information architecture,
but rebuild the experience from scratch: one persistent WebGL scene that choreographs with
scroll, a custom interactive cursor, and editorial typography on top.

Brand line: **Bold · Radiant · Timeless.**
Positioning: "Where Strategy Meets Story. Where Story Becomes Legacy."
Full-spectrum creative agency, Hyderabad. Four divisions. Six service pillars.

## Tech stack (do not swap without asking)
- Next.js (App Router, TypeScript), `output: 'export'` so it deploys as static files anywhere
- React Three Fiber + @react-three/drei + @react-three/postprocessing for 3D
- GSAP + ScrollTrigger for scroll choreography (use `@gsap/react` `useGSAP`)
- Lenis for smooth scrolling, synced to GSAP's ticker
- Tailwind CSS for layout; CSS variables for brand tokens
- Framer Motion only for small DOM UI transitions (modals, menus) — not for scroll
- pnpm as package manager

## Architecture rules
- ONE `<Canvas>` for the whole site, fixed behind the DOM (`position: fixed; inset: 0; z-index: 0`).
  Sections are normal DOM on top. Do not mount a Canvas per section.
- Scroll progress is the single source of truth: a small store (zustand) holds
  `progress` (0–1 for the page) and `activeSection`. 3D objects read from it in `useFrame`.
  Never read `window.scrollY` inside `useFrame`.
- Each section has a matching "scene state" (camera position/target, object poses, colors).
  Scene transitions are interpolated between states, not hard-cut.
- Lazy-load the Canvas (`dynamic(() => import(...), { ssr: false })`) and show a
  branded loader until assets are ready.
- All geometry is procedural or from `/public/models` (glTF + Draco/Meshopt). No random CDN assets.
- Keep components small: `components/three/*`, `components/sections/*`, `components/cursor/*`,
  `lib/scroll/*`, `content/*.ts` (all copy lives in content files, not in JSX).

## Design direction
- Palette (tokens in `app/globals.css`):
  - `--ink` deep navy-black `#0B0F1A` (background)
  - `--navy` `#14213D`
  - `--gold` `#C9A45C` (primary accent), `--gold-bright` `#E8C98A`
  - `--bronze` `#8C6A3F`
  - `--cream` `#F3EBDD` (text on dark)
  - `--crimson` `#7A1E2B` (rare accent only)
- Materials: brushed/liquid gold, dark glass, subtle film grain. Lighting is moody and
  cinematic — one warm key light, a cool rim, environment map for reflections.
- Typography: a high-contrast serif display face for headlines (e.g. "Cormorant Garamond" or
  "Playfair Display") + a clean grotesk for body/UI (e.g. "Inter" or "Manrope"). Load via
  `next/font`. Italic serif for the emphasised half of headlines (current site does this:
  "We build brands that *actually move people.*").
- The ✦ star glyph is a brand motif — reuse it for section markers and cursor states.
- Feel: premium, heraldic, cinematic. Not neon, not cyberpunk, not generic "AI gradient blob".

## Signature 3D ideas (the scene storyboard)
1. Hero — an abstract liquid-gold sculpture (a flowing, slowly morphing ribbon/knot form
   with noise displacement) floating in dark space, reacting to cursor position. Gold dust
   particles drift around it. It is NOT a logo, crest, emblem or monogram.
2. About — sculpture dissolves into particles that re-form as a field; camera drifts forward.
3. Services ("Six pillars of creative power") — six literal gold/obsidian pillars rise
   from the floor; camera tracks past them as you scroll; hovering a service card lights
   its pillar. Click opens the service detail overlay.
4. Engagement models — three stacked glass tiers (Starter / Growth / Brand Partner).
5. Founders — four portrait cards in DOM with subtle 3D tilt; 3D scene calms down here.
6. Ecosystem — four orbiting spheres (one per division: Kreatif Atelier, Golden Guardian
   Productions, Zenith Chapter, Asraya) around a central core; scroll rotates the orbit so
   each division comes to the front in turn. Label them with full names as plain text.
7. Process — a glowing gold path/ribbon the camera travels along, five waypoints = five steps.
8. Industries — a slow 3D ring/marquee of industry names.
9. Contact — scene resolves back to the gold sculpture, brighter; CTA is the focal point.

## Cursor
- Custom cursor: small dot + trailing ring (lerped). Hidden on touch devices.
- States: default, hover-link (ring grows), hover-3D (✦ star), dragging, text (thin bar).
- Magnetic pull on primary buttons.
- Click = gold ripple ring in DOM + a shockwave/impulse sent into the 3D scene
  (particles push away from the click point, raycast from cursor into the scene;
  the nearest object reacts — pillars ring, sculpture pulses, orbit spheres wobble).

## Non-negotiables
- `prefers-reduced-motion`: disable scroll-scrubbed camera moves and particle bursts,
  keep a static but still beautiful hero render. Lenis off.
- Mobile: DPR capped at 1.5, particle counts reduced ~70%, postprocessing simplified,
  custom cursor disabled. Must hold ~60fps on a mid-range Android.
- Use `drei`'s `PerformanceMonitor` / `AdaptiveDpr` to degrade gracefully.
- Lighthouse targets on the deployed build: Performance ≥ 80 mobile, Accessibility ≥ 95,
  SEO 100. All copy is real HTML text (never baked into the canvas).
- Every interactive element is keyboard-reachable with visible focus styles.
- No layout shift from fonts or the canvas.

## Content
- Source of truth for copy: the current live site https://kreatifatelier.com. Port all
  copy into `content/*.ts`. Do not invent services, clients, stats, or testimonials.
- Founder photos: `https://kreatifatelier.com/images/Gourish_Formal1.png`,
  `Rohan_Formal1.png`, `Anwesha_Formal.png`, `Aritra_Formal1.png` → save into
  `/public/images/founders/` and serve with `next/image` (unoptimized for static export).
- Contact: hello@kreatifatelier.com · @kreatifatelier (Instagram, LinkedIn).

## Open decisions (ask before changing)
- Engagement Models section shows prices (₹25–35K / ₹55–75K / ₹1–1.5L). Keep as-is for now;
  the team may replace with "Custom quote".
- Founding year is inconsistent (site says Est. 2024, footer © 2025). Footer year should be
  generated from the current date; leave "Est." line out until confirmed.

### Decided (2026-09-27)
- Build plan approved: `~/.claude/plans/pasted-content-id-dce5-read-claude-md-polished-crystal.md`
  (storyboard, scroll pipeline, impulse system, phases, content appendix).
- Why Us (between Ecosystem and Process) 3D transition: the orbits flatten into concentric
  gold rings and the outer ring unspools into the Process ribbon.
- Fonts: Cormorant Garamond (headings/display, italic for emphasis) + Manrope (body/UI).
  Playfair Display, Cinzel and Outfit from the live site are dropped.
- Social: show "@kreatifatelier" as plain text. `content/site.ts` holds `instagramUrl` and
  `linkedinUrl` as empty strings; when a URL is filled in, the matching handle/label renders
  as a link automatically. No `#` placeholder links.
- CTA "Schedule Your Free Brand Audit ✦" → `mailto:hello@kreatifatelier.com` with subject
  "Free Brand Audit Request".
- Pricing cards: prices exactly as on the live site. No "Enquire" button.
- Domain: `https://kreatifatelier.com` for metadataBase, canonical and sitemap. Hosting is
  decided later — do not set up deployment.
- Nav: keep the live items as-is (About, Services, Founders, Ecosystem, Process, Work With Us).
- Ported copy stays word for word. Do not rewrite or "improve" it.
- Monograms from the live site (nav "KA", division badges KA/GGP/ZC/AS) are removed; full
  names in type plus ✦ only.

## Direction update (2026-10-10) — supersedes the sections above where they conflict
- **Source of truth: `docs/website-blueprint.md`** (the owner's brief). Kreatif Atelier is the parent
  holding ecosystem ("Ideas. People. Impact."); **Aurelius** is the marketing, advertising and growth
  business and leads the site. Ventures: Aurelius, Asraya, Valora, Golden Guardian Productions, Rudra
  Yugen. Never present Kreatif Atelier as the agency. Do not invent clients, cases, metrics or services.
- Routes (static export, `trailingSlash: true`): `/`, `/aurelius`, `/aurelius/services` (searchable
  206-service index), `/aurelius/services/<practice>` ×11, `/work`, `/approach`, `/about/aurelius`,
  `/about/kreatif-atelier`, `/contact`, and the four other ventures at `/<slug>` (`app/[slug]`).
  Not built yet: `/work/[slug]`, `/insights`, `/privacy`, `/terms`, the six-stop palette control.
- Content lives in `content/`: `aurelius-services.ts` (generated from the blueprint — codes and names
  exact), `aurelius.ts` (practice pages), `home.ts`, `pages.ts`, `navigation.ts`, `verticals.ts`.
- Home page: starts directly on the Aurelius hero (`components/home/HomeHero.tsx`) — red mahogany
  #440000, crowned figure cut-out on the left, AURELIUS in bold sliding out from behind it until the whole
  word is clear, tagline and buttons on the right. A magnetic step pulls the scroll on to the light block
  (Positioning, Capabilities). At the light block's end the dark rises from below with a burning rim —
  the one thing the canvas still draws (`components/three/Veil.tsx`). Then Attention, Selected Work,
  Measurement, Our Ventures, parent context, contact CTA. Scroll logic: `lib/scroll/veil.ts`.
  Tried and scrapped: chrome form, night-sky picture, jet, eagle tear, orange glow above the light page.
- Palette tokens (`app/globals.css`): Obsidian #111210 (`--ink`), Porcelain #F3F0E9 (`--cream`),
  Champagne #CDB98A (`--gold`), Forest, Vermilion, Deep Teal; mahogany for the hero. One shared
  soft-raised button: `components/ui/Button.tsx` / `.btn`.
- Logos (2026-10-10): the owner supplied venture marks, which override the "no logo" rule below for those
  marks only. Valora's swan (`public/images/logos/valora-swan.webp`) is on its page and home tile. Two horse
  emblems (`horse-color.webp`, `horse-mono.webp`) are in the same folder but not yet assigned to a venture.
  Do not create any other logo, monogram or "KA" mark.
  2026-10-12: the owner also supplied the Kreatif Atelier crest (embroidered eagle with a KA shield,
  `public/images/logos/kreatif-atelier-crest.webp`). It is an easter egg, by the owner's choice: clicking the
  "KREATIF ATELIER" wordmark in the footer opens it full-screen, and scrolling shows all five verticals as stitched
  patches on the same cloth (`components/footer/CrestEgg.tsx`; the slugs are `parent.crest.verticals` in
  `content/home.ts`; `crest-cloth.webp` is bare cloth tiled from the artwork). The crest appears nowhere else:
  it was tried as a band on the home and About pages and removed. Nav, footer and favicon stay typographic.
- Visual assets: the owner supplies imagery and art direction per section. Use `<Placeholder />` until
  then; do not reuse earlier mood images (files remain in `public/images/mood/`, unlicensed, only the
  crowned figure is in use).
- Asraya (decided 2026-10-11): it is the **social division for NGOs**, as in the Asraya company profile —
  not the wellbeing venture the blueprint describes. It has four pages of its own (`/asraya`,
  `/asraya/what-we-build`, `/asraya/partnership`, `/asraya/tomorrow`; copy in `content/asraya.ts`,
  components in `components/asraya/`). They take the profile's character — paper, slate, oxblood, kraft
  and blue grounds, condensed Anton headlines, red emphasis — inside the site's system (same header,
  footer, serif, body face, labels, button, grid, reveals). Styles are scoped to `.asraya` in
  `app/globals.css`. The profile's photographs and collages are not reproduced; the pages are typographic.
  Exception (2026-10-12): the `/asraya` cover carries the owner's jigsaw collage of black-and-white portraits
  (`public/reference/asraya-collage.webp`), multiplied onto the paper ground beside the wordmark.
- Heroes (2026-10-12): the home page and `/aurelius` both use the owner's galloping-horse picture
  (`public/reference/aurelius-horse.webp`) as a full-bleed hero with AURELIUS along its foot; it drifts forward on
  scroll. The crowned figure and the bust are no longer used; the text-behind-subject slide only runs for `cutout` figures.
- "Our Services" (`components/aurelius/PillarsSection.tsx`): four pillars over the owner's numbered
  Colosseum artwork, one screen tall from `lg` up. It is on `/aurelius` and is the first screen of the
  home light block.
- Profile artwork (2026-10-12): the owner shared the two Canva profiles (Asraya Company Profile, 31 pages; Kreatif
  Atelier Profile, 29 pages). Pictures cropped from the Asraya one live in `public/images/profile/asraya/` and are set
  into the Asraya posters with `<Art />` (`components/asraya/kit.tsx`, list in `content/asraya.ts`). Rule: a picture
  only stays if its ground disappears into the poster (blend, cut-out or a fade) or it runs edge to edge as a band
  (`<Poster bleed>`); no framed rectangles. The statue is a true cut-out. Tried and removed: the clasped hands and the
  fountain pen (both run off their own frame), and whole profile pages pasted onto the Aurelius practice pages — the
  owner asked for those out, so the practice pages are back to `<Placeholder />`. From the Kreatif Atelier profile
  only the tower (`public/images/profile/aurelius/tower.webp`) is used, on the home page. No Valora deck has been
  supplied yet (the link given for it was the Kreatif Atelier one).
- Service pop-ups (2026-10-12): every one of the 206 services is a button that opens a short note
  (`components/aurelius/ServiceNotes.tsx`), on the practice pages and in the service index. The notes are in
  `content/aurelius-service-notes.ts`, keyed by service code. They are DRAFT copy written for the site (the
  blueprint lists names only) and await the owner's review; keep them plain and free of claims.
- History page (2026-10-12): `/aurelius/history` is a history of branding, marketing and advertising in five eras,
  built as an infographic (`components/aurelius/HistoryTimeline.tsx`, styles `.hist*` in `app/globals.css`): a strip
  of torn pictures down a paper page between two clock dials, story and key dates on either side, and a gallery
  dialog per era in which every picture has a note. Copy and picture list: `content/history.ts`. The five-era
  outline is the owner's; the longer text, dates and picture notes are DRAFT history written for the site and need
  the owner's read. Pictures are in `public/images/history/`: the owner's uploads plus eight illustrations made with
  Canva's image generator (`made: true`, labelled as illustrations on the page). Originals of all of them are in
  `~/Developer/Aurelius History Photos/`. Left off the page: the Alamy-watermarked Triumph spread (unlicensed stock).
  Third-party advertisements are shown as historical examples; rights are not cleared.
- Clean-up (2026-10-12): files nothing referenced (the old single-page sections and their content files, unused
  mood and reference pictures, the two Marlboro pictures) were moved out to `~/Developer/Kreatif-Atelier-removed-files/`.
  The two unassigned horse emblems were kept. No tobacco advertising on the history page.
- Hero wordmark (2026-10-12): on the home page and `/aurelius`, AURELIUS is set edge to edge along the foot of the
  hero in Abril Fatface (hero only), with the horse's head and chest laid again over the letters
  (`aurelius-horse-front.webp`, a darkness cut-out of the same picture) so the horse runs in front of the word. Small
  word lists sit in the top corners. Sizes are all in vw (`.hero-horse`, `.hero-word` in `app/globals.css`).
- Owner pictures (2026-10-12): each practice page shows the owner's 4:5 picture for it (`public/images/services/<slug>.webp`,
  `practiceImage` in `content/aurelius.ts`). The history page's Digital Era uses the owner's six illustrations
  (YouTube, iPhone, 4G, GDPR, short video, generative AI); the earlier generated digital pictures and the Patagonia poster
  were removed. Sources are the `Modern Advertising/` and `Services/` folders in the project root.
- White site (2026-10-13), by the owner's instruction — supersedes the dark palette above. Tokens are swapped by role in
  `app/globals.css`: `--ink` is now the white page surface and `--cream` the dark type, so "text-cream on bg-ink"
  components read dark on white. `.classic` (also applied to `footer`, `.hist`, `.asraya`, `.crest-egg`, the hero)
  restores the first palette where a section is still dark or was always light. Buttons are light by default;
  `.on-dark` is for dark surfaces. The header is always a white bar. The WebGL canvas and the dark dome on the home
  page are switched off (`ExperienceLoader` is no longer mounted).
- Headlines (2026-10-13): every `h1.display` / `h2.display` is set in Anton capitals, as in the Asraya profile; the italic
  half of a split headline stays Cormorant. Body and mid-size lines are unchanged.
- Graphics (2026-10-13): `public/images/graphics/` holds generated contour lines (`topo-*.svg`, used through the `.topo`
  mask) and `world-relief.svg` (also published as an artifact, not yet placed on the site). `.heat` is the grainy
  amber-on-black gradient. The staircase photo is gone; the practice-areas panel on `/aurelius` is heat + contours.
- About (2026-10-13): one About page, `/about/kreatif-atelier`, which now carries the history of advertising
  (the timeline) after the founders. `/about/aurelius` and `/aurelius/history` were removed.
- Valora chapter radar (2026-10-14): `/valora/chapters`, ported from the owner's standalone "Valora Chapter Radar.html"
  (map of India, five campuses, shared recruiters, placement figures with named sources). It runs inside the site's
  header and footer and stays dark by design. Files: `components/valora/` — `radar.css` (the page's own styles scoped
  under `.vradar`), `radar-markup.ts` (static markup, server-rendered), `radar-engine.js` (its script as
  `mountRadar(getLenis)`, loaded after paint, with a cleanup; it uses the site's Lenis, not its own). Valora now has its
  own route `app/valora/page.tsx` (the shared venture page plus a band linking to the radar); `[slug]` skips it.
  The placement figures and recruiter lists are the radar file's own, not checked against their sources here.
- Brand marks (2026-10-18), by the owner's instruction, supersede "No logo" below. From the visiting card: the KA
  monogram (ka-monogram.webp) centred in the header with links split either side; the gold script "Kreatif Atelier"
  (ka-wordmark.webp) in the footer, mobile menu and the card band (KaCard in components/ui/Brand.tsx, on the home parent
  section and under the About hero). Both are CSS masks cut from a render of the card. The red eagle crest
  (ka-eagle-crest.webp) sits by the footer wordmark. Horse emblems assigned to Aurelius (assumption; owner to confirm).
- Sunset (2026-10-18): components/home/SunsetEdge.tsx, a dark bowl with a burning rim under the hero on home and /aurelius,
  lifting on scroll (config.front.sunset). Client map: ClientsMap on home, pins for Canada, UAE, India, Singapore.
- Page designs must stay cohesive across the site: new pages reuse the shared header, footer, type
  system, labels, `.btn` and reveal motion. A venture may add its own colour and one signature face.
- Founder bios on `/about/kreatif-atelier` are still the old site's wording (they call it an agency).
- The contact form has no server: it opens the visitor's email app with the enquiry filled in.
- `pnpm` is not installed on this machine; use `npx next dev` / `npx next build --webpack`.

## No logo — hard rule
- The logo/crest does NOT appear anywhere on the site: not in the nav, hero, 3D scene,
  loader, footer or favicon. Do not create a placeholder logo, emblem, monogram, shield or
  "KA" mark of any kind.
- Brand presence comes from typography (the words "KREATIF ATELIER" set in the display
  serif) and the ✦ motif. The favicon is a gold ✦ on navy.

## Workflow rules for Claude
- Work in phases. At the end of each phase: run `pnpm build`, fix all type/lint errors,
  summarise what changed, and list anything that needs my eyes.
- Commit after each working phase with a clear message.
- Before a big change, propose the plan first; don't rewrite working systems unasked.
- When unsure about a visual choice, build it behind a constant in `lib/config.ts` so it's
  easy to tweak (speeds, colors, particle counts, camera keyframes).
- Check the result in a real browser (Playwright MCP if available) at 1440px and 390px wide
  and look for jank, overlap, and unreadable text before calling a phase done.

## Commands
- `pnpm dev` — local dev at http://localhost:3000
- `pnpm build` — static export to `/out` (runs `next build --webpack`; keep webpack for now)
- `pnpm lint` · `pnpm typecheck`
- `pnpm start` — serve `/out` locally with compression (use this, not a plain file server, for Lighthouse)
- `pnpm images <dir>` — rebuild founder portraits from PNGs in `<dir>` (or from the live site with no arg)
- Append `?debug` to any URL for the live scroll readout (progress, active section, pins, fps)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Home v2 artifacts (2026-10-19)
- Lab: `/lab/artifacts` (dev only), code in `features/home-v2/`. Cards show only Float and Mouse parallax.
- Colours: artifacts use their reference pictures' real colours and the platforms' official colours. The
  burgundy-and-gold-on-beige "Burgundy Print" scheme from the v2 brief is dropped (red itself is fine).
  Metal accents are chrome. A unit test (`npx playwright test --project=unit`) keeps the retired colours out.
- Content factory (`ContentFactory.tsx`, planned home hero): one blue hue in light/mid/dark tones on a navy
  platform, bright accents (red play button, pink, cyan, yellow), real-coloured social tiles on the belt.

## Neumorphic site (2026-10-20) — supersedes the white-site palette above
- Design system: `styles/design/tokens.css` (single source of truth) and `styles/design/materials.css`; primitives in
  `components/design/`. The old variables in `app/globals.css` (`--ink`, `--cream`, `--gold`…) now point at these tokens,
  so every page shares the neumorphic surface. `.classic` still restores the dark palette (footer stays as it was).
- Home (`app/page.tsx`, sections in `components/home-neu/`) and `/aurelius` use `HeroNeu`: AURELIUS with the refractive
  lens, then the content factory large and still, with the 11 practice artifacts floating around it
  (`features/home-v2/scene/`, mapping in `features/home-v2/data/heroArtifacts.tsx`). No photos on these pages.
- Practice pages show their live 3D service artifact instead of the owner's photo; the services overview and related
  cards use the rendered artifact pictures (`public/images/services/artifacts/`).
- Not converted: the Asraya pages and the Valora chapter radar keep their own characters (earlier owner decisions).

## Aurelius revamp (2026-10-20) — maroon and gold, supersedes the grey neumorphic palette on Aurelius pages
- Brief: phases 0–6 (home hero, services/domains/cart, contact/call/timezones, approach, QA); reference images in
  `docs/design-reference/`. Phases 0–2 done; stop for go-ahead after Phase 2 and Phase 4.
- Colours: `styles/design/aurelius-theme.css` (scales from brand values: maroon #440000 / #5E1A17, gold #A87830 from the
  horse emblem, champagne #CDB98A), mirrored in `lib/design/aurelius.ts` (test keeps them in sync + WCAG AA). Applied via
  `PageShell theme="aurelius"` on home, /aurelius, services, practice pages, /approach, /work, /contact. KA pages
  (about, ventures, Valora, Asraya) do not use it.
- 3D artifacts take every colour from `features/home-v2/three/materials/palette.ts` (AU scales + BRAND logo colours);
  `node scripts/palette-audit.mjs` fails on any other colour. Shared lighting rig: `StudioLighting`.
- Primitives in `components/design/` (NeuButton, Card, Field, Toggle, Tabs, Chip, Accordion, Badge, Tooltip on base-ui,
  DisplayHeading, FloatingArtifact). Floating artifacts move in 3D only while the pointer is over them; no page-wide parallax.
- Home hero: `components/aurelius-site/HeroAurelius.tsx` (centred only; the split variant was dropped), live factory on a podium +
  11 rendered object pictures (`public/images/hero/objects/`, from `tests/visual/render-hero-objects.spec.ts`).
  Aurelius logo beside the wordmark = the horse emblem (mono, filled gold) — still an assumption for the owner to confirm.
- Selected Work is unmounted from the home page (see the comment in `app/page.tsx`).
- Polish pass (2026-10-20, Roo): reds a step brighter, golds more golden (scales in aurelius-theme.css). Background on every
  Aurelius page: a Vanta fog (`components/aurelius-site/vantaFog.ts`, a custom effect on Vanta's shader base; the fog
  parts and warms around a moving pointer), mounted by PageShell, live only where the 3D is (fine pointer, ≥768px, no
  reduced motion), with a still gradient (`.au-bg`) otherwise. Tune in `config.background`. Lenis: `allowNestedScroll`,
  `data-lenis-prevent` on inner scroll lists. Mega menu and dialogs are glass (`.glass-panel`, themed `.ds-dialog`).
  Our Services pillars each float the artifact of their lead practice. FloatingArtifact hover: tilt, lift, scale, a
  light masked to the object's shape, and a shadow that slides against the tilt.
- Phase 3 (2026-10-20): services, domains, cart.
  - One services file: `content/services.ts` (id = blueprint code, name, domain, description from the DRAFT notes). No
    prices anywhere: none were supplied.
  - All Services (`/aurelius/services/#index`, `components/services-index/`): live count, search (name, code, note),
    domain chips (several at once), sort, 24 at a time with Show more. `?q=`, `?domain=`, `?pillar=` arrive filtered.
  - Domain = practice area. Each one's artifact (`features/home-v2/three/services`, poster
    `public/images/services/artifacts/<slug>.webp`) floats in its domain card (PracticeList) and its page header
    (PracticeArtifact). Service cards use the domain poster as a small still.
  - Cart: `lib/cart/store.ts` (zustand, localStorage key `aurelius-cart`, every storage call in try/catch), header
    bag button with badge, glass drawer on base-ui Drawer (`components/cart/`), Sonner toasts. Inside the drawer,
    notices and Undo live in its own status line (outside the modal is inert). Quote request opens the visitor's email
    app (`lib/cart/request.ts`). No payments. On Aurelius pages the cart replaces the old practice-level QuoteBar.
  - The pill nav shows its "Contact Us" button only from 1536px (it duplicates Start a Project) so the cart fits.

## Aurelius polish pass (2026-10-20, Roo's six-item brief; phases 1–3 done, stop for go-ahead before 4)
- Gold: true gold scale (gold-200 #f7e3a1 … gold-500 #d4a017 … gold-700 #8a6209) in aurelius-theme.css / lib/design/aurelius.ts.
  `--au-gold-ink` #7a5a0e is the only gold for text/links on cream (AA); `--au-gold-display` for large gold type;
  `--au-gold-metal` gradient for CTA fills, knobs, rims, badges. Bright golds never as text. Champagne/brass retired on
  Aurelius pages. 3D: any gold-scale colour renders as polished gold metal (`config.artifacts.goldMetal`), warm studio light.
- Headings: no glass anywhere. `components/design/DisplayHeading.tsx` (real maroon text; H2 keeps the maroon gradient).
  The lens, blob, refraction filter, LensSupport/RefractionDefs and lens tokens were deleted. Glass stays only on surfaces
  (cart drawer, mega menu, dialogs, scrolled nav, toasts).
- Buttons: one style, `components/design/NeuButton.tsx` + `styles/design/buttons.css` (raised pill, bold label, round knob with
  a gold-metal arrow; primary = gold-metal pill; sm compact; icon; dark tone; pressed/aria-pressed, loading, disabled).
  `.nb` rules are in Tailwind's components layer so utilities still apply. Chip and Toggle (labelled thumb) are built on it.
  `Knob` is the arrow disc alone, used at the foot of linked cards. Inside `.theme-aurelius` the legacy `.btn` gets the same
  look. The old `.neu-btn`, `.neu-chip-btn`, `.neu-toggle` styles are gone. No call button exists yet: no phone number.
- Clients (2026-10-20, owner): "We serve clients in three time zones": Vancouver (UTC−8/−7), Dubai (UTC+4), Hyderabad
  (UTC+5:30), as pulsing gold pins on world-relief.svg (`components/home-neu/ClientsNeu.tsx`, `styles/design/timezones.css`,
  data in `content/home.ts` → clients, with the map projection fit noted there). Singapore and Toronto are no longer shown.
- Footer (2026-10-20, owner's reference image, all pages): `components/footer/FooterSky.tsx` (sunset that fades out of the page,
  two dark hills with gold rims, drifting silk and a spark along each rim; shapes in `config.footerSky`) and
  `components/sections/Footer.tsx` restyled (`styles/design/footer.css`). PreFooterGlow was removed. Social icons appear
  only for networks with a URL in `content/site.ts` (instagramUrl, linkedinUrl, youtubeUrl, all empty; mail always shows).
  Privacy / Terms are not linked because those pages do not exist yet.
- Practice pages (2026-10-20): each floats four objects chosen for its services (`practiceArtifacts` in
  `features/home-v2/data/pageArtifacts.tsx`; posters in `public/images/artifacts/` from `render-page-artifacts.spec.ts`):
  two around the practice artifact in the header, two in the point-of-view card (`components/services/PracticeFloaters.tsx`).
  Amazon and Flipkart are app-icon tiles in the social-tile family (`SocialTile` ids "amazon", "flipkart"; colours in BRAND).
- Live 3D on hover (Phase 5): `components/design/LiveArtifactLayer.tsx` + `features/home-v2/scene/LiveArtifactScene.tsx`,
  state in `lib/artifacts/live.ts`. One click-through canvas follows the hovered poster and draws its real model with
  the poster's own camera; `posterFrames.json` (written by the render specs) aligns it to the pixel. Model turns toward
  the pointer (config.artifacts.live), a warm light follows the pointer, the DOM shadow slides opposite. CSS tilt is the
  fallback. `config.artifacts.pointerMode` = "hover" (default) | "proximity". Fine pointers only; reduced motion: static.
- Structure (2026-10-20, Roo): the home page is the front door (hero, a short Aurelius teaser ending in "Explore Aurelius",
  where we serve clients, ventures, Kreatif Atelier, contact). `/aurelius` carries the depth (film reel, positioning, pillars,
  capabilities, attention, measurement, clients map, about, contact); its hero CTA goes to the services index.
- Social tiles: every platform tile appears on the site (practice-page sets, the home teaser, the attention section;
  `sectionArtifacts` in pageArtifacts.tsx, `components/design/FloatCluster.tsx`).
- Pointer: `config.artifacts.pointerMode` is now "proximity": an artifact starts to turn within `proximityPad` (140px) of its
  edge, harder the closer the pointer; the nearest one goes live in 3D. Tilt up to 24°.
- /approach rebuilt on the Aurelius system (parts as cards, process track, AttentionNeu, MeasurementNeu, closing, ContactNeu).
- Clean-up: ServiceIndex, useServiceSearch, ServiceStaircase and QuoteToggle moved to ~/Developer/Kreatif-Atelier-removed-files/.
- Not done / open: call button (no phone number), Privacy and Terms pages, social URLs in content/site.ts, Lighthouse run
  (not installed locally), Selected Work still unmounted, git commits (Xcode licence).
- Hero wordmark (2026-10-20, owner): the gold AURELIUS artwork replaces the horse mark and the typeset word in the hero
  (`public/images/logos/aurelius-wordmark(-700).webp`, cut out from the owner's JPG; h1 keeps "Aurelius" as alt text).
  The horse mark stays only beside "Aurelius" in the nav.
- Clients heading: "We work across 3 timezones." (owner's wording).
- Live 3D glitch fix: one persistent canvas (only the model changes), instant handover with no crossfade, and a 40px
  switch margin so close neighbours do not keep swapping the live slot.
- Performance (Lighthouse 12, mobile, compressed static build via the serve-out config on :4174): Aurelius pages 84–91,
  accessibility/best practices/SEO 100. Keys: no three.js in first load (`artifactSets.ts` holds slugs; models load on
  hover), dialogs/framer-motion, cart drawer/base-ui/zod and Sonner load on first use, Abril and Anton not preloaded, phones
  hide the hero's floating objects and practice header pairs. /about/kreatif-atelier scores 71 (4MB of history pictures).
  Always measure with serve-out (compressed); scripts/serve-out.mjs does not compress and reads ~15 points low.
- Live-hover freeze fixed (2026-10-20): a live poster is made transparent, never visibility:hidden (hidden elements
  stop getting pointer events, which froze the model and then snapped it). Proximity also covers the area on the
  artifact; the pointer direction is capped at the edge. Regression test in live-artifacts.spec.ts.
- Home factory: slow half-turn and back (config.factory: ±90° around its resting angle, 40s cycle; still for reduced motion).
- /aurelius "What we believe" (BeliefsNeu): each practice's first point-of-view line from content/aurelius.ts, as linked cards.
- Hero stage posters (2026-10-20 fix): render-hero-poster.spec.ts exports the factory canvas itself (`?poster` keeps the
  drawing buffer), transparent, factory and podium only. The old element screenshot baked the floating objects, spheres and
  page background into an opaque picture, which showed as ghost duplicates and a pale box until the live factory loaded.
- Live-hover swap (2026-10-20, from Roo's recording): the live canvas is padded (config.artifacts.live.pad, camera fov widened
  to match) so tilted models are never clipped; live-capable posters get no CSS tilt/scale (rest-to-rest swap, no size jump);
  the model shows only after frames drawn at the canvas's current size (no flash at the previous artifact's size).
- Contact (2026-10-20, owner): contact@kreatifatelier.com and +91 94609 23782 (site.email / site.phone / phoneHref). Call us
  button on /contact and in the contact block; email and phone links plus a phone icon in the footer.
- Home factory: no square platform (machines on the round podium), black belts and camera, cream front arch, polished
  burgundy play disc with a white triangle; swing ±35° over 60s; camera framing fits the whole podium.
- Home hero objects (heroScene.ts): no spheres, phone or palette card; bulb beside the wordmark; platform tiles
  (YouTube, Facebook, Instagram, X, Flipkart) spread apart, plus film strip, web shop and meeting table.
- All Services artifact tiles read NEWS, MAIL, SEO (were Aa, %, @).
