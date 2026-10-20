# Artifact references — notes

The reference pictures for the home-v2 artifacts, with what each 3D build matches. The colours were sampled from
the pictures and are stored in `features/home-v2/three/materials/palette.ts`. Check them in the lab at
`/lab/artifacts` (dev only). `npx playwright test` rebuilds `tests/visual/out/contact-sheet.png`.

| Ref | Silhouette / proportions | Material | Key colours |
| --- | --- | --- | --- |
| ref-socials-cluster.jpg | Five square tiles in a loose cluster, Instagram in front, tiles tipped toward camera | Glossy clearcoat plastic, raised white marks; TikTok tile near-matte black | FB #1556d4, Twitter #1fb0ec, YT #e3171a, TikTok #151517 (+ #25dceb / #fe2c55), IG radial #f9c45b→#7c3ad0 |
| ref-growth-runner.png | Figure mid-leap over a long low block, tall arrow to the right | Soft clay, faint sheen | figure #f3aa38 (rendered #ffb02a), block #7370b5, arrow #3f9fe8 |
| ref-meeting-table.png | Three seated figures at an ochre table, chart board and profile badge floating behind | Matte clay | table #d99f4f, chairs #615ea2, shirts blue / yellow / green |
| ref-clapperboard.jpg | Charcoal slate, open stick hinged at the left, four broad white slants per stick, red play mark | Soft-gloss clay | body #3a3a3d, play #f4594d, ground #97bdfe |
| ref-camcorder.png | Pro camcorder lens toward the viewer, square hood, short tripod with pan handle | Dark matte plastic, glass lens | three buttons: orange + two blue |
| ref-web-shop.png | Browser window, sneaker card, thumbs-up, bag, magnifier | Clay | sneaker #f7871e with white sole |
| ref-analytics-board.png | Tilted white board with bars and line chart, large blue magnifier | Clay board, glossy lens | blue #2f5fc0 family |
| ref-film-strip.jpg | Film strip spiralling up, frames facing out | Translucent amber film | base #4a2810, warm frames |
| ref-google-cluster.png | Four-colour G on a pedestal, ring, bulb, gears, arrow, cards | Glossy plastic | Google #ea4335 #fbbc05 #34a853 #4285f4 |

Known differences still open: the film frames are abstract (no photographs); the Google cluster is simpler than the
reference; meeting faces have no features (faceless, as the brief asks).

## Burgundy Print recolour (brief v2)

The reference colours above are sampled values, kept for reference only. Every artifact is now drawn in the brand
palette (`brand` in `features/home-v2/three/materials/palette.ts`): red #B3261E, burgundy #6E1423, black #160E0E,
cream #F2E6D3, antique gold #B88A3E (metallic, accents only). `useBrandColors = true` puts the social tiles back in
the platforms' own colours. The palette test (`npx playwright test --project=unit`) checks gold stays antique gold
and every artifact colour sits within ΔE 5 of a token.

| Artifact | Brand colours |
| --- | --- |
| Social tiles | red / burgundy / black tiles, cream marks, gold inlay line; X mark by default (old bird behind `useLegacyTwitterBird`) |
| Growth runner | cream figure, burgundy block, red shaft, gold arrow head |
| Meeting table | cream people with black hair caps, black table, burgundy chairs, cream board with a gold trend line |
| Clapperboard | black slate, cream slants, red play mark, gold hinge |
| Camcorder | black body, burgundy glass, red / cream / gold buttons |
| Web shop | cream window, red sneaker, burgundy bag, gold handle and magnifier |
| Analytics board | cream board, red bars, gold line, black magnifier |
| Film strip | black film, red, burgundy and gold frames |
| Google cluster | G in red, gold, burgundy and black on a burgundy pedestal |

Poster (`ref-style-poster.png`): mood only — speckled red paper, long solid black extrusion down-right, warm
gold-on-red. Its lettering is not traced. The speckle on clay (±3.5%) and lacquer (±1.5%) follows its ink grain.
