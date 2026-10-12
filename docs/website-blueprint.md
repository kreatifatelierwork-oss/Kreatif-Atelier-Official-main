# Kreatif Atelier Website Blueprint

**Purpose:** A detailed creative, content, brand-architecture, and website-structure brief for implementation in Claude Code.

**Primary direction:** Kreatif Atelier (KA) is the parent holding ecosystem. The main homepage is strongly Aurelius-led: most of its content explains Aurelius, its approach, services, work and outcomes. Near the end, include one clear **Our Ventures** section with five clickable venture tiles. Aurelius is the primary/featured tile, Asraya receives the next level of visual prominence, and Valora, Golden Guardian Productions and Rudra Yugen remain more understated. Every tile must link to the corresponding venture page. The user will provide the visual assets and art direction for individual sections during implementation; do not pre-select or prescribe imagery based on earlier references.

**Source hierarchy:** Use the uploaded *Kreatif Atelier Profile* for the original positioning and messaging, the uploaded *Aurelius 206-Service Catalogue* for the complete service architecture, and the latest user clarification for the current brand naming. The service catalogue records 206 marketable services across 11 practice areas. Preserve service names; do not invent service offerings or company claims.

**Visual-asset policy:** Do not refer to, rely on, or pre-select any visual references previously shared in chat. The user will supply images and the art direction for individual sections while building the site. Use clearly marked neutral placeholders until direction/assets are provided. Keep layout and components flexible enough to accept those later decisions.

---

## 1. Current brand architecture — source of truth

### Kreatif Atelier (KA)
**Role:** Holding company / creative ecosystem / umbrella brand.

**Purpose:** Connect complementary disciplines and ventures under one broader vision of ideas, people and impact. KA is not the primary name under which marketing and advertising services should now be sold.

**Suggested concise description:**
> Kreatif Atelier is a creative holding ecosystem connecting people, ideas and complementary disciplines to create meaningful opportunities and lasting impact.

**Brand line:** `IDEAS. PEOPLE. IMPACT.`

**Mission/vision wording adapted from the supplied company-structure reference:** Build an interdisciplinary ecosystem that creates meaningful opportunities, cultural value and long-term impact through creativity, education, production and innovation.

### Aurelius
**Role:** Main operating brand and flagship service business for marketing, advertising and growth. This is the primary business visitors should encounter on the website.

**Positioning from the profile:** “We make the work. And we make sure it lands.” Aurelius brings together strategy, creative, media and technology, so the brand, the work, the distribution and the measurement are not treated as disconnected activities.

**Core promise:** Connect brand strategy and creative execution with media distribution, digital systems, lead generation and measurement—then use evidence to improve outcomes.

**Short descriptor:** `BRANDS. STRATEGY. GROWTH.`

**Recommended first mention on the website:**
> **AURELIUS — A Kreatif Atelier Company**
> **We make the work. And we make sure it lands.**
> Strategy, creative, media and technology—connected to move brands forward.

Use the first line to establish the relationship to KA, the second as the main tagline, and the third as the plain-language explanation. After this first mention, use **Aurelius** consistently; do not continue calling KA the marketing agency.

### Valora
**Role:** People, skills and opportunity vertical.

**Core territory:** Student capability ecosystem, industry connection, mentorship and placement, and global opportunities.

**Short descriptor:** `PEOPLE. SKILLS. OPPORTUNITIES.`

### Golden Guardian Productions
**Role:** Film, video and creative production vertical.

**Core territory:** Film and video production, branded content, live events and creative IP development.

**Short descriptor:** `STORIES. VISUALS. IMPACT.`

### Rudra Yugen
**Role:** Innovation, culture and futures vertical.

**Core territory:** Emerging technology and AI, cultural projects, R&D and innovation labs, and strategic ventures.

**Short descriptor:** `INNOVATION. CULTURE. FUTURES.`

### Asraya
**Role:** Wellbeing, balance and meaningful-living vertical.

**Core territory:** Wellness experiences, retreats and programs, mindfulness and lifestyle tools, and community spaces.

**Short descriptor:** `PEOPLE. BALANCE. WELLBEING.`

### Crucial naming correction
Any legacy copy or screen that describes Kreatif Atelier as the marketing-and-advertising agency must be updated. **Aurelius is now the marketing and advertising business. Kreatif Atelier remains the parent/holding ecosystem.** Do not use a KA-as-agency service menu or show a giant company hierarchy chart as the website's main visual.

---

## 2. Homepage priority and visibility hierarchy

The homepage should feel like a premium Aurelius-led experience inside the Kreatif Atelier ecosystem—not a directory of five equally weighted companies.

Recommended content hierarchy:
- **Aurelius:** roughly 75–85% of the homepage's meaningful service, credibility and conversion content.
- **Our Ventures section:** place near the end of the homepage, after Aurelius capabilities, work and approach. Include five clickable tiles for Aurelius, Asraya, Valora, Golden Guardian Productions and Rudra Yugen. Aurelius is the primary/featured tile; Asraya is the secondary tile; the remaining three should be compact and understated but still clearly clickable.
- **Kreatif Atelier parent story:** a restrained line near the hero/footer and a dedicated About KA page. Avoid a large organizational diagram.
- Do not showcase the other ventures as prominent standalone panels earlier in the homepage. They can remain accessible through the navigation’s small “Our Ventures” dropdown and the footer.

The homepage should be able to answer these questions within the first screen or two:
1. What is the primary service business? **Aurelius.**
2. What does Aurelius do? **Brand strategy, creative, media, advertising, marketing technology and measurable growth.**
3. What is different about it? **It connects what a brand says, what it creates, how it reaches people, and how outcomes are measured.**
4. What should a prospective client do next? **Explore capabilities, view genuine work, or start a project conversation.**

---

## 3. Information architecture / recommended pages

### Top-level navigation
Keep the header quiet and short:
- **Logo:** Kreatif Atelier monogram/wordmark.
- **Aurelius** (the primary/highlighted nav item)
- **Services** (dropdown linking to 11 practice areas)
- **Work**
- **Approach**
- **About** (dropdown: Aurelius / Kreatif Atelier)
- **Our Ventures** (small dropdown linking to Aurelius, Asraya, Valora, Golden Guardian Productions and Rudra Yugen)
- **Contact** / raised CTA button: `Start a Project`

On small screens, use a clean full-screen or drawer menu with service-area links. Do not put all 206 service names in the global navigation. The Our Ventures menu and near-footer venture tiles must link to the correct dedicated route for each vertical.

### Main routes
- `/` — Kreatif Atelier homepage led by Aurelius; the primary conversion path is Aurelius services/work/contact, with the five clickable venture tiles grouped near the end.
- `/aurelius` — dedicated Aurelius brand page, linked from the featured Aurelius tile in Our Ventures; explain the business and route visitors to the service architecture.
- `/aurelius/services` — all 11 practice areas and the full searchable/filterable 206-service index.
- `/aurelius/services/digital-marketing`
- `/aurelius/services/public-relations`
- `/aurelius/services/promotions`
- `/aurelius/services/seo`
- `/aurelius/services/branding-creative-design`
- `/aurelius/services/advertising`
- `/aurelius/services/analytics-performance`
- `/aurelius/services/lead-generation-growth`
- `/aurelius/services/film-video-photography`
- `/aurelius/services/technology-product`
- `/aurelius/services/advisory-transformation`
- `/work` — selected genuine projects.
- `/work/[project-slug]` — individual case studies using a reusable template.
- `/approach` — process, measurement and ways of working.
- `/about/aurelius` — Aurelius positioning, beliefs and team information.
- `/about/kreatif-atelier` — parent ecosystem story and vision.
- `/asraya` — dedicated Asraya page.
- `/valora` — dedicated Valora page.
- `/golden-guardian-productions` — dedicated production page.
- `/rudra-yugen` — dedicated innovation page.
- `/contact` — qualified inquiry form and contact details.
- `/insights` and `/insights/[slug]` — optional thought-leadership and SEO content.
- `/privacy`, `/terms`, and any required consent pages.

### A practical publishing rule
Launch with the 11 complete practice-area pages and every one of the 206 services visible in the master service index. Do not automatically produce 206 nearly identical, thin SEO pages. Add individual service detail pages when a service has its own useful search intent, clear buyer problem, credible process, relevant examples and genuinely distinct content.

---

## 4. Homepage: section-by-section plan

### Section 01 — Poster-like hero, seamlessly blended into the page
**Purpose:** Set the mood and immediately identify Aurelius as the service business.

**Composition:** Full-bleed cinematic visual or art-directed poster composition, with large editorial typography, a lot of negative space, and a dark-to-transparent gradient at the edge so the next section feels integrated rather than like a separate card. Do not use the old organizational diagram here.

**Suggested content:**
- Small eyebrow: `AURELIUS / A KREATIF ATELIER COMPANY`
- Headline: `WE MAKE THE WORK. AND WE MAKE SURE IT LANDS.`
- Supporting copy: `Strategy, creative, media and technology—connected to move brands forward.`
- Primary CTA: `Explore Aurelius`
- Secondary CTA: `View Selected Work`

**Media and art direction:** Leave the hero's visual asset as a replaceable placeholder during the initial layout pass. The user will supply the image/video and page-specific art direction while the website is being built. Do not choose, generate, or describe a specific visual subject in advance. Once the user approves an asset, make the hero and following section transition feel continuous through layout, color, gradient, or overlap rather than a harsh rectangular cut.

**Motion:** Slight text reveal, low-speed background motion, subtle scroll cue. The visual must work with video disabled.

### Section 02 — The positioning / tension
**Use the profile's core idea:** Some agencies make beautiful things that cannot be tied to revenue; others buy media against creative they cannot fix. Aurelius is positioned to hold both ends.

**Headline option:** `CREATIVE SHOULD MOVE THE BUSINESS.`

**Content layout:** Large left-aligned headline; short paragraph; four compact labels in a row or sequence:
- **Strategy** — What the brand stands for and who it is for.
- **Creative** — The identity, film, words and design.
- **Media** — Getting the work in front of the right person at the right cost.
- **Technology** — The site, funnel, automation and proof.

This is a central differentiator from the supplied profile. Keep the four labels as an editorial composition, not as a corporate hierarchy chart.

### Section 03 — Capabilities at a glance
Show only the six most commercially intuitive entry points initially, with a `View all 11 practice areas` link:
- Brand & Creative
- Digital Marketing
- Advertising & Media
- SEO & Organic Discovery
- Lead Generation & Growth
- Analytics & Performance

Technology & Product, Public Relations, Promotions, Film/Video/Photography and Advisory & Transformation remain fully discoverable on the `/aurelius/services` page.

Use asymmetrical cards or a typography-led index, not 11 identical huge cards. Each links to its practice-area page.

### Section 04 — Attention: own, buy, keep
Use the profile's three-part model:
- **OWN** — Audiences you build.
- **BUY** — Demand you can capture.
- **KEEP** — Customers and long-term value you already have.

Explain that a buyer may scroll, search, open email, ask a colleague and compare marketplaces. Show how social/community, creators, owned channels, lifecycle and performance/commercial media can work together.

Visual: Three overlapping bands or one evolving horizontal editorial graphic. This is a storytelling device, not a rigid business structure diagram.

### Section 05 — Selected work / proof
Lead with only real approved work. Use case studies and assets the company has permission to display. Never use stock images as if they prove Aurelius completed that work.

Each case-study tile should include:
- Client/project name (only if permitted)
- Type of work
- Business problem
- Aurelius' contribution
- Outcome and measurement (only when verifiable)
- `Read the case study` button

If there are not yet enough approved cases, use a smaller “Selected experiments and capabilities” area rather than inventing clients, statistics or testimonials.

### Section 06 — The measurement promise
Use the profile's point of view: reporting should redirect spend, not merely justify it.

**Suggested line:** `MEASURE → UNDERSTAND → REDIRECT.`

Show a clear measurement loop: analytics → learning → creative/media change → re-measurement. Use actual figures only if approved and substantiated.

### Section 07 — Our Ventures (near the end of the homepage)
Place this section after Aurelius's main service story, selected work, and approach/measurement content, and before the final contact CTA.

**Purpose:** Make the broader Kreatif Atelier ecosystem discoverable without interrupting the Aurelius-led story.

**Layout:** A clean set of five interactive venture tiles. Every tile must be a real link to its own dedicated page—not a static decorative card.
- **Aurelius:** primary/featured tile, with the clearest introduction and strongest visual weight.
- **Asraya:** secondary tile with the next-highest prominence.
- **Valora, Golden Guardian Productions, Rudra Yugen:** smaller, quieter tiles that remain legible and obviously interactive.

Use a short descriptor for each venture and a consistent arrow/link affordance. Keep all artwork and section-specific art direction user-supplied; use neutral placeholders until the user provides the relevant direction. Do not use the venture section as a company hierarchy diagram.

Suggested section heading: `OUR VENTURES`.

### Section 08 — Kreatif Atelier parent context (brief)
A short statement explaining that Kreatif Atelier brings together complementary ventures under a shared commitment to ideas, people and impact. This should support the brand architecture without competing with Aurelius's service narrative. Link to `/about/kreatif-atelier` for the fuller story.

### Section 09 — Contact CTA
Headline: `HAVE A BUSINESS CHALLENGE? LET'S MAKE THE WORK LAND.`
Short copy: Invite visitors to describe their goal, what they have tried and what they need help solving.
CTA: `Start a Project`.
Use the same raised button language as the rest of the site.

### Footer
Include the Kreatif Atelier parent identity, a concise Aurelius link group, the 11 service-area page links in a compact expandable section, Work, About, Contact, relevant social links, privacy and terms. Keep the other vertical links unobtrusive.

---

## 5. Aurelius service architecture

The catalogue lists **206 independently marketable services across 11 practice areas**. Keep the source's service names and categories intact. The full index belongs on `/aurelius/services`; each practice area has a dedicated page built from the template below.

### Reusable practice-area page template
1. **Eyebrow and title:** practice area name and short source-consistent descriptor.
2. **Buyer problem:** plain-language description of what the practice area solves.
3. **Outcome first:** what the client should be able to improve, not an unsupported guarantee.
4. **Service list:** every service in that practice area, with search/filter if useful.
5. **How Aurelius works:** discovery, strategy, execution, delivery/integration, measurement/iteration.
6. **Related practices:** 2–4 adjacent service areas, based on genuine overlap.
7. **Relevant work:** published cases only; otherwise show process examples clearly labelled as examples.
8. **FAQ:** answer real pre-sales questions without making claims not supported by the business.
9. **CTA:** `Discuss this service` or `Request a scope`.

### 5.1 Digital Marketing — 29 services
*Source descriptor:* Owning attention across every channel a buyer touches.
- DM-01 Organic Social Growth
- DM-02 Paid Social Campaigns
- DM-03 Instagram Growth Strategy
- DM-04 LinkedIn B2B Marketing
- DM-05 YouTube Channel Growth
- DM-06 Short-Form Video Growth
- DM-07 Email Marketing
- DM-08 Marketing Automation
- DM-09 CRM Marketing & Segmentation
- DM-10 WhatsApp Marketing
- DM-11 Community Building
- DM-12 Influencer Marketing
- DM-13 Creator & Nano Programs
- DM-14 Product Launch Campaigns
- DM-15 Retention & Lifecycle Marketing
- DM-16 Performance Marketing
- DM-17 Affiliate & Partnership Marketing
- DM-18 Conversion Rate Optimization
- DM-19 Mobile App Marketing
- DM-20 Marketplace Marketing
- DM-21 Geo-Targeted Marketing
- DM-22 AI Marketing Automation
- DM-23 Account-Based Marketing
- DM-24 Content Marketing & Editorial
- DM-25 Podcast Marketing
- DM-26 Loyalty & Referral Programs
- DM-27 Fractional CMO Retainer
- DM-28 Newsletter Growth
- DM-29 SMS Marketing

### 5.2 Public Relations — 17 services
*Source descriptor:* Earning trust, credibility and share of conversation.
- PR-01 Media Relations & Press Outreach
- PR-02 Press Release Writing & Distribution
- PR-03 Crisis Communications
- PR-04 Executive Thought Leadership
- PR-05 Founder Personal Branding
- PR-06 Corporate Communications
- PR-07 Investor & Financial PR
- PR-08 Product Launch PR
- PR-09 Digital PR for SEO
- PR-10 Award & Recognition Management
- PR-11 Event PR & Press Conferences
- PR-12 Internal Communications
- PR-13 ESG & Sustainability Comms
- PR-14 Online Reputation Management
- PR-15 Media Training
- PR-16 Newsjacking & Reactive PR
- PR-17 Analyst Relations

### 5.3 Promotions — 14 services
*Source descriptor:* Turning attention into action through incentives and live moments.
- PRO-01 Sales Promotion Campaigns
- PRO-02 Contest & Giveaway Management
- PRO-03 Sampling & Trial Programs
- PRO-04 Retail & In-Store Activation
- PRO-05 Experiential & Brand Activation
- PRO-06 Pop-Up Experiences
- PRO-07 Trade Show & Exhibition Management
- PRO-08 Sponsorship Activation
- PRO-09 Festive & Seasonal Campaigns
- PRO-10 Roadshows & Mall Activations
- PRO-11 Gamified Promotions
- PRO-12 Cashback & Rewards Campaigns
- PRO-13 Channel & Dealer Incentives
- PRO-14 Loyalty Program Design

### 5.4 Search Engine Optimization — 20 services
*Source descriptor:* Compounding organic visibility across search and AI engines.
- SEO-01 SEO Audit & Strategy
- SEO-02 On-Page SEO
- SEO-03 Technical SEO
- SEO-04 Local SEO & Google Business Profile
- SEO-05 E-commerce SEO
- SEO-06 Content SEO & Topic Clusters
- SEO-07 Link Building & Off-Page SEO
- SEO-08 International & Multilingual SEO
- SEO-09 Enterprise SEO
- SEO-10 SaaS SEO
- SEO-11 Programmatic SEO
- SEO-12 Answer Engine Optimization
- SEO-13 Schema & Structured Data
- SEO-14 Core Web Vitals & Speed
- SEO-15 SEO Migration Management
- SEO-16 Video & YouTube SEO
- SEO-17 Penalty Recovery & Disavow
- SEO-18 Marketplace SEO
- SEO-19 B2B & Manufacturing SEO
- SEO-20 SEO Content Production

### 5.5 Branding & Creative Design — 25 services
*Source descriptor:* Building the identity, system and story a brand is recognised by.
- BR-01 Brand Strategy
- BR-02 Brand Identity System
- BR-03 Logo Design
- BR-04 Brand Positioning & Architecture
- BR-05 Naming & Verbal Identity
- BR-06 Brand Guidelines
- BR-07 Rebranding & Brand Refresh
- BR-08 Packaging Design
- BR-09 Design System
- BR-10 Brand Messaging & Tone
- BR-11 Brand Story & Narrative
- BR-12 Pitch & Investor Deck Design
- BR-13 Presentation Template Systems
- BR-14 Print & Collateral Design
- BR-15 Signage & Environmental Graphics
- BR-16 Merchandise & Swag Design
- BR-17 Social Media Design Systems
- BR-18 Illustration & Iconography
- BR-19 Motion Brand Identity
- BR-20 Sonic Branding
- BR-21 Employer Brand Identity
- BR-22 Sub-Brand & Product Branding
- BR-23 Editorial & Publication Design
- BR-24 Brand Sprint & Workshops
- BR-25 Personal Brand Identity

### 5.6 Advertising — 24 services
*Source descriptor:* Paid media and creative designed to create measurable demand.
- AD-01 Google Search Ads
- AD-02 Performance Max & Display
- AD-03 Meta Ads
- AD-04 YouTube & Video Ads
- AD-05 LinkedIn Ads
- AD-06 TikTok Ads
- AD-07 Programmatic & DSP
- AD-08 Native Advertising
- AD-09 OTT & Connected TV Ads
- AD-10 Out-of-Home (OOH)
- AD-11 Digital OOH (DOOH)
- AD-12 Audio & Spotify Ads
- AD-13 Retail Media & Amazon Ads
- AD-14 App Install / UA Campaigns
- AD-15 Creative Strategy & Concepting
- AD-16 Performance Creative Production
- AD-17 Media Planning & Buying
- AD-18 Geofencing & Location Ads
- AD-19 Remarketing & Retargeting
- AD-20 B2B Demand-Gen Advertising
- AD-21 Microsoft & Bing Ads
- AD-22 Niche Platform Ads
- AD-23 AI Ad Creative & Iteration
- AD-24 Influencer Whitelisting

### 5.7 Analytics & Performance — 15 services
*Source descriptor:* Turning marketing activity into measurable decisions and performance.
- AN-01 GA4 Analytics Setup
- AN-02 Conversion Tracking & GTM
- AN-03 Marketing Dashboards
- AN-04 Attribution Modeling
- AN-05 Server-Side Tracking
- AN-06 Marketing Mix Modeling
- AN-07 Customer Data Platform Setup
- AN-08 A/B Testing Programs
- AN-09 Funnel & Cohort Analysis
- AN-10 Data Visualization
- AN-11 Rank & SEO Tracking
- AN-12 UX Analytics & Heatmaps
- AN-13 Predictive Analytics & LTV
- AN-14 Consent & Privacy Compliance
- AN-15 RevOps Analytics

### 5.8 Lead Generation & Growth — 19 services
*Source descriptor:* Building repeatable systems that turn attention into qualified pipeline.
- LG-01 B2B Lead Generation
- LG-02 Inbound Lead Generation
- LG-03 Cold Email Outbound
- LG-04 LinkedIn Outbound & Social Selling
- LG-05 Sales Funnel Design & Build
- LG-06 Lead-Gen Landing Page CRO
- LG-07 Webinar & Event Funnels
- LG-08 Lead Magnet Production
- LG-09 SDR-as-a-Service
- LG-10 CRM Setup & Pipeline
- LG-11 Lead Scoring & Qualification
- LG-12 Channel & Reseller Programs
- LG-13 High-Ticket Lead Gen
- LG-14 Local Service Lead Gen
- LG-15 AI Chatbot Lead Capture
- LG-16 Lead Nurturing Sequences
- LG-17 Demand Generation Strategy
- LG-18 Growth & GTM Audit
- LG-19 Marketplace & Directory Lead Gen

### 5.9 Film, Video & Photography — 24 services
*Source descriptor:* Production capabilities spanning brand, commercial, documentary, digital and visual content.
- FM-01 Brand Film & Commercials
- FM-02 Corporate Video Production
- FM-03 Product Videography
- FM-04 Short-Form Video Production
- FM-05 Product Photography
- FM-06 Lifestyle & Editorial Photography
- FM-07 Fashion & Apparel Photography
- FM-08 Food & Beverage Photography
- FM-09 Architectural Photography
- FM-10 Industrial & Factory Photography
- FM-11 Corporate Headshots
- FM-12 Event Coverage
- FM-13 Drone & Aerial Cinematography
- FM-14 Documentary & Story Films
- FM-15 Testimonial & Case-Study Video
- FM-16 Explainer & Motion Graphics
- FM-17 2D & 3D Animation
- FM-18 Post-Production & Color
- FM-19 Photo Retouching & CGI
- FM-20 360 & Virtual Tours
- FM-21 Livestream Production
- FM-22 Podcast Video Production
- FM-23 UGC-Style Content Production
- FM-24 Reels & Shorts Retainer

### 5.10 Technology & Product — 12 services
*Source descriptor:* The digital product, automation and experience layer that extends the agency beyond communications.
- TP-01 UI/UX Design
- TP-02 Web Development
- TP-03 Mobile App Development
- TP-04 Immersive Interactive Websites
- TP-05 AI Automation & Agents
- TP-06 AI Chatbots & Assistants
- TP-07 CRM & MarTech Integration
- TP-08 Sales Funnel Engineering
- TP-09 AR & VR Experiences
- TP-10 3D Product Visualization
- TP-11 Retail & Experience Design
- TP-12 AI Content Systems

### 5.11 Advisory & Transformation — 7 services
*Source descriptor:* Strategic advisory connecting marketing, customer experience, transformation and growth.
- AV-01 Digital Transformation Consulting
- AV-02 Customer Experience Design
- AV-03 Marketing Technology Consulting
- AV-04 Corporate Training & Workshops
- AV-05 Employer Branding & EVP
- AV-06 Fractional CMO & Growth Advisory
- AV-07 Innovation & GTM Sprints

**Catalogue note:** The supplied service catalogue labels Technology & Product and Advisory & Transformation as expansion practices while retaining all 206 services in the total architecture. Preserve that distinction if relevant to launch prioritization.

---

## 6. Recommended dedicated page for each practice area

Each practice-area page should have a specific message rather than changing only its title. Suggested starting headlines, inspired by the source profile:

- **Digital Marketing:** `OWN THE RELATIONSHIP, NOT JUST THE REACH.` Explain always-on channel strategy, audiences, content, lifecycle and retention.
- **Public Relations:** `ADVERTISING IS WHAT A BRAND SAYS. PR IS WHAT OTHERS SAY.` Explain credibility, relationships, reputation and earned conversation.
- **Promotions:** `TURN ATTENTION INTO ACTION.` Explain trial, offer mechanics, events, incentives and loyalty without suggesting discounts alone are strategy.
- **SEO:** `BUILD VISIBILITY THAT COMPOUNDS.` Explain technical, on-page, content, authority, local and AI/search discovery work.
- **Branding & Creative Design:** `A BRAND IS WHAT PEOPLE SAY WHEN YOU LEAVE THE ROOM.` Explain strategy, identity systems, messaging, design systems and commercial creative.
- **Advertising:** `BUY THE RIGHT ATTENTION.` Explain audience, creative, channel choice, buying, iteration and measurement.
- **Analytics & Performance:** `MEASURE. UNDERSTAND. REDIRECT.` Explain instrumentation, attribution, dashboards, experimentation and decision-making.
- **Lead Generation & Growth:** `MARKETING SHOULD CREATE QUALIFIED CONVERSATIONS.` Explain demand generation, outbound/inbound, funnels, CRM, qualification and nurturing.
- **Film, Video & Photography:** `THE WORK, THE WAY IT ACTUALLY LOOKS.` Explain production from pre-production through shooting, finishing and distribution-ready assets.
- **Technology & Product:** `THE STRATEGY IS REAL WHEN SOMETHING IS BUILT.` Explain websites, UX, funnels, integrations, automation and digital experiences.
- **Advisory & Transformation:** `SOMETIMES THE MOST VALUABLE ADVICE IS WHAT NOT TO SPEND.` Explain independent counsel, transformation, capability-building and GTM advisory.

Use these as concept copy; edit for brand voice and accuracy before publication.

---

## 7. Page structure for the wider ecosystem

These pages are secondary to Aurelius. Each needs its own landing page and CTA, but should use the shared site framework.

### `/asraya`
- **Visual art direction/assets:** To be supplied by the user during implementation. Use a neutral placeholder until then.
- Positioning: People. Balance. Wellbeing.
- Themes: wellness experiences; retreats and programs; mindfulness and lifestyle tools; community spaces.
- Page goal: explain Asraya's offerings and collect relevant inquiries.

### `/valora`
- **Visual art direction/assets:** To be supplied by the user during implementation. Use a neutral placeholder until then.
- Positioning: People. Skills. Opportunities.
- Themes: student capability; industry connections; mentorship and placement; global opportunities.
- Page goal: explain the capability/opportunity ecosystem and collect enquiries.

### `/golden-guardian-productions`
- **Visual art direction/assets:** To be supplied by the user during implementation. Use a neutral placeholder until then.
- Positioning: Stories. Visuals. Impact.
- Themes: film/video; branded content; live events; creative IP development.
- Page goal: show real production work and make production enquiries simple.

### `/rudra-yugen`
- **Visual art direction/assets:** To be supplied by the user during implementation. Use a neutral placeholder until then.
- Positioning: Innovation. Culture. Futures.
- Themes: emerging technology and AI; cultural projects; R&D and innovation labs; strategic ventures.
- Page goal: explain the work clearly without unsupported futuristic promises.

### `/about/kreatif-atelier`
- Explain KA as the parent ecosystem.
- Include the vision of meaningful opportunities, cultural value and long-term impact through creativity, education, production and innovation.
- Include brief links to the five verticals, not a giant corporate hierarchy chart.

---

## 8. Visual design system

### Six core colors (proposed web tokens, not extracted as official brand standards)
Use one restrained common palette. A color can be the accent of a particular section or vertical, but do not use all six at equal strength in every viewport.

1. **Obsidian** — `#111210` — dark sections, navigation and footer.
2. **Porcelain** — `#F3F0E9` — light sections and negative space.
3. **Champagne** — `#CDB98A` — fine rules, key micro-accents and selected outlines.
4. **Forest** — `#24483A` — natural / ecosystem sections.
5. **Vermilion** — `#C9513D` — sparing emphasis inspired by the profile's editorial red.
6. **Deep Teal** — `#28565B` — technology / systems accent.

Do not force a fixed background colour onto every page. Alternate deep, calm dark sections with generous light sections where the content benefits from editorial clarity. Gold should be a detail—not a gold frame around everything. Vermilion should be used sparingly for emphasis, not as a full-site flood colour.

### Six-color selector / slider
The request for a six-color slider should be implemented as a **minimal six-stop palette control**, not as a large dashboard widget:
- A thin horizontal rail with six small color stops, one per design token.
- A single small raised circular or rounded-square thumb that moves between stops.
- Selected stop gains a fine contrasting outline; the active color name may appear as a tiny label/tooltip on hover or keyboard focus.
- Neutral background, low-contrast rail, no persistent oversized labels, no attention-grabbing animation.
- Support keyboard left/right navigation, a clear focus ring and accessible labels.
- Keep it in a design-preview/playground area or under a tiny palette icon; do not place a conspicuous colour slider in the site's main hero. The public website should not let casual visitors accidentally recolor the whole brand. If the purpose is only for design iteration, gate it to the preview/build environment.

### Type
- Display: expressive high-contrast editorial serif for selected large headlines.
- Utility/body: highly legible sans-serif for paragraphs, navigation, forms, service lists and buttons.
- Use display typography selectively for poster-like headings when appropriate to the art direction supplied by the user.
- Keep headings readable, use responsive type scaling and avoid long all-caps paragraphs.

### Layout and negative space
- Use a clear grid and generous whitespace.
- Alternate light and dark sections only when it improves narrative flow.
- Avoid boxed-card overload. Use image-led split layouts, typography-led sections and open grids.
- Avoid the org chart as a design motif on the website.
- The hero poster must transition into the next section using overlapping imagery, a matched background tone or gradient—not a harsh rectangular cut.

### Buttons: consistent soft 3D / raised treatment
Every `Know more`, `Explore`, `Read case study`, `Start a project` and similar action should come from one shared button component.
- Shape: modest rounded rectangle or restrained pill; one radius system.
- Surface: subtly raised / soft-UI finish inspired by the supplied component reference.
- Shadow: gentle lower shadow plus a faint top/edge highlight. Use enough contrast to make the button's surface perceptible, never a large floating shadow.
- Hover: raise by a pixel or two, slightly increase shadow and shift the arrow/icon a few pixels. Fast but smooth (about 160–240 ms).
- Pressed: reduce the raised shadow and use a shallow inset/pressed appearance.
- Focus: clearly visible keyboard focus ring; the visual style must not compromise accessibility.
- Disabled: reduce contrast and remove the raised shadow.
- On light surfaces, use layered cool-gray shadows; on dark surfaces, use a slightly lighter edge and soft dark shadow. Do not blindly apply the same shadow values on black and white.
- Avoid a different shape/effect for every CTA. Only the primary button can have a more visible fill; secondary actions should be quiet text/outline or the same raised form at lower emphasis.

### Cards and controls
Use the same subtle surface rules for service cards, forms, dropdowns, sliders and toggles. Prefer minimal borders, soft depth and restrained transitions. Do not make every panel pill-shaped.

---

## 9. Motion and interaction rules

- Hero video: gentle movement, muted, looped, with a poster fallback; add a dark gradient behind text.
- Text: reveal by line/phrase with small movement; no kinetic typography on every paragraph.
- Section transitions: fade/translate subtly as sections enter view.
- Service cards: slight hover lift; no dramatic flip animation.
- Navigation: calm underline / color transition; active state should be clear.
- Service index: search, practice-area filter and compact accordions; do not animate all 206 rows at once.
- Ecosystem dropdown: understated and easy to access; no huge full-screen holding-company diagram.
- Keep scroll natural. Use pinned scroll storytelling at most once or twice, only where it adds meaning.
- Honour reduced-motion preferences; stop or simplify nonessential movement.
- Always test the first and last frames of a video loop—AI prompts cannot guarantee pixel-perfect loop joins.

---

## 10. Content rules from the supplied profile

Preserve the profile's point of view and use the lines below as a copy bank. Use selectively; don't place every slogan on the same page.

- `WE MAKE THE WORK. AND WE MAKE SURE IT LANDS.` — best hero / Aurelius positioning.
- `We were built to hold both ends.` — strategy + creative + media + technology explanation.
- `ATTENTION IS BOUGHT, EARNED AND KEPT IN DIFFERENT WAYS.` — attention / channel strategy section.
- `WE RUN ALL THREE.` — own, buy, keep explainer.
- `SHOW UP WHERE THE BUYER IS.` — channel planning section.
- `ADVERTISING IS WHAT A BRAND SAYS ABOUT ITSELF. PR IS WHAT EVERYONE ELSE SAYS.` — PR practice area.
- `CREDIBILITY HAS TO BE EARNED.` — reputation / PR.
- `THE MOMENT ATTENTION BECOMES ACTION.` — promotions.
- `THE ONLY CHANNEL THAT KEEPS PAYING AFTER YOU STOP.` and `Ads end the day the budget does. Search does not.` — SEO, used carefully as a point of view rather than a universal guarantee.
- `A BRAND IS WHAT PEOPLE SAY ABOUT YOU WHEN YOU LEAVE THE ROOM.` — branding.
- `MAKE IT ONCE. USE IT EVERYWHERE.` — design systems / brand systems.
- `BUYING ATTENTION IS EASY. BUYING THE RIGHT ATTENTION IS THE JOB.` — advertising / media.
- `MEDIA CANNOT SAVE A BAD IDEA.` and `WE WRITE IT. SHOOT IT. BUY IT. MEASURE IT.` — connected creative and media delivery.
- `MEASURE → UNDERSTAND → REDIRECT.` — analytics.
- `OPINIONS ARE FREE. EVIDENCE COSTS MONEY AND SAVES MORE.` — measurement / experimentation.
- `MARKETING THAT DOES NOT PRODUCE PIPELINE IS JUST PUBLISHING.` — lead-generation and growth.
- `A FUNNEL IS PLUMBING. MOST OF THEM LEAK.` — funnels / conversion.
- `SOME THINGS CANNOT BE EXPLAINED IN A DOCUMENT. THEY JUST HAVE TO BE SEEN.` — production portfolio.
- `YOUR WORK, THE WAY IT ACTUALLY LOOKS.` — photography/production.
- `THE STRATEGY IS ONLY REAL ONCE SOMETHING IS BUILT.` — technology/product.
- `SOMETIMES YOU DO NOT NEED AN AGENCY. YOU NEED SOMEONE TO TELL YOU THE TRUTH.` — advisory.
- `AI IS NOT A CAMPAIGN. IT IS INFRASTRUCTURE.` — AI/automation.
- `THE BEST OUTCOME IS A CLIENT WHO NEEDS US LESS.` — capability transfer and ethical delivery.

Do not publish unsupported performance metrics, client names, testimonials, guarantees, employee counts or project counts. The mockup stage may use placeholders, but clearly label them and replace them before launch.

---

## 11. Contact / lead form architecture

Keep the form short initially and ask only for information useful to route the enquiry:
- Name
- Work email
- Company / website (optional)
- What do you need help with? (practice-area dropdown, multi-select if possible)
- What outcome are you trying to achieve? (short free-text)
- Approximate budget and timing (optional / configurable)
- Consent and privacy note

After submit: confirm receipt, set expectations for follow-up and record the selected service area. Use spam protection and accessible error states. Never display a fake success state before the server confirms submission.

---

## 12. Build and implementation sequence in Claude Code

### Phase 1 — Read before changing
1. Inspect the existing repository and current stack.
2. Find existing routes, components, styles, media assets and build scripts.
3. Do not replace working infrastructure without a reason.
4. Save this document as the source-of-truth brief.

### Phase 2 — Design tokens and core components
1. Define colors, typography, spacing, radius, border, shadows, animation timing and reduced-motion behavior.
2. Build shared header/footer, Button, LinkButton, service-card, form control, modal/drawer and palette-selector components.
3. Implement light and dark surface treatments from the same tokens.

### Phase 3 — Responsive static homepage
Build the homepage sections in order with neutral placeholder media. Do not source or generate final imagery yet; wait for the user to provide the image and art direction for each section. First judge spacing and readability without animation.

### Phase 4 — Aurelius services
Build the 11 practice-area pages from reusable templates. Add the complete 206-service index with search/filter. Preserve each service code and name.

### Phase 5 — Work and conversion
Add approved case studies, a project-inquiry form and basic analytics/SEO. Do not fabricate case data.

### Phase 6 — Ecosystem subpages
Build the dedicated pages for all five ventures. Keep the homepage’s Our Ventures section near the end; make every tile clickable and link to the corresponding page. Keep Aurelius first/featured and Asraya second in prominence; the other three venture pages are available through compact tiles, the navigation dropdown and footer.

### Phase 7 — Motion and media
Add background video, scroll reveals and card interactions one at a time. Keep a static fallback. Optimize every media asset before production.

### Phase 8 — QA / launch readiness
Check desktop, tablet and mobile; keyboard and screen-reader access; contrast; reduced motion; focus visibility; form success/error states; image/video loading; SEO metadata; internal links; and production build. Check there are no dummy metrics, placeholder copy, or legacy statements incorrectly presenting KA as the marketing agency.

---

## 13. Master instruction to Claude Code

Use this brief as the source of truth for the Kreatif Atelier website. First inspect the codebase and report the current architecture before modifying files. Implement the design system and reusable components before building every page. The main homepage must feature Aurelius as the flagship marketing, advertising and growth practice, while Kreatif Atelier remains the parent ecosystem. Do not feature the other ventures as separate prominent sections throughout the main homepage. Put one **Our Ventures** section near the end with five clickable tiles: Aurelius featured first, Asraya second in prominence, followed by quieter tiles for Valora, Golden Guardian Productions and Rudra Yugen. Each tile must navigate to its own page.

Create one page for each of Aurelius' 11 practice areas and include all 206 services from this document in the searchable/filterable service index. Preserve the service codes and names. Use the profile's point of view and copy bank selectively. Do not invent clients, testimonials, case studies, outcomes, metrics or guarantees.

Design must be clean, editorial, spacious, visually confident and responsive. Use restrained dark/light section alternation, the six proposed color tokens, the poster-like hero blending into the body, user-supplied media/art direction for each page, subtle scroll animations and one shared soft-3D button system. Do not assume any art direction or select imagery before the user supplies it during implementation. The six-color control should be a small six-stop rail with a subtle raised thumb, located in a design-preview/playground or behind a minimal palette control—not a large conspicuous hero element. Avoid the old company-hierarchy diagram as a visual motif.

Implement incrementally. First build the static responsive version, then integrate optimized media and animation. Respect reduced-motion settings, accessible focus, semantic HTML and performance. After each phase, report changed files, unfinished items and the next phase. Do not rewrite unrelated application areas or add large dependencies without explaining why.
