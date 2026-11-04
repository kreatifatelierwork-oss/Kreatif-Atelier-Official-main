/**
 * Asraya — the social division of Kreatif Atelier. All copy here comes from the Asraya company
 * profile (31 pages), in the profile's own order. `**double asterisks**` mark the words the profile
 * sets in bold. The Ad Grants amount is the profile's own; Asraya's own prices are left out by the owner's instruction.
 */

export const asraya = {
  name: "Asraya",
  wordmark: "Asraya",
  aegis: "under the Aegis of Kreatif Atelier",
  tagline: "Communicating impact. Amplifying change.",
  promise: "You do the work. We make sure people know about it.",
  nav: [
    { label: "Overview", href: "/asraya" },
    { label: "What we build", href: "/asraya/what-we-build" },
    { label: "Partnership", href: "/asraya/partnership" },
    { label: "Tomorrow", href: "/asraya/tomorrow" },
  ],
  navLabel: "Asraya",
  /** The owner's picture for the cover: a jigsaw of black-and-white portraits on paper. One prop, so it stays replaceable. */
  cover: {
    src: "/reference/asraya-collage.webp",
    alt: "A jigsaw of black-and-white photographs: children, women, elders, a doctor, a rescuer, a graduate, a sapling, a dog",
    width: 1420,
    height: 925,
  },
  next: "Next",
  cta: { lead: "Let's build something", emphasis: "that matters.", button: "Start a conversation", href: "/contact" },
  meta: {
    title: "Asraya | Communicating impact. Amplifying change. — Kreatif Atelier",
    description:
      "Asraya is the social division of Kreatif Atelier, built to give NGOs everything we know how to build: brand identity, website, content, SEO, advertising, PR, film and campaigns.",
  },
} as const;

/* ── /asraya ──────────────────────────────────────────────── */

export const visibility = {
  title: ["What", "visibility", "can do"],
  items: [
    { title: "Donations", body: "People give to what they can see. A donor who finds you, understands you in thirty seconds and trusts what they see will give — and give again. Right now they are giving to someone else." },
    { title: "Awareness", body: "The people you exist to serve need to know you exist. A shelter helps nobody who has never heard of it." },
    { title: "Credibility", body: "Being findable, consistent and clear is how a stranger decides you are real. It is the difference between being taken seriously and being politely ignored." },
    { title: "Volunteers", body: "The people who would give you their weekends are looking for you. They cannot find you." },
    { title: "Partnerships", body: "Corporates and foundations look you up before they ever meet you. What they find in those first two minutes decides whether the meeting happens at all." },
    { title: "And it lasts", body: "Founders move on. Teams change. A documented, visible organisation survives its own people. An invisible one starts from zero every time." },
  ],
  close: "None of this changes the work. It changes how far the work reaches.",
} as const;

/**
 * The /asraya page (2026-11-04, owner's direction): "we provide free services, we don't earn anything from you — all
 * the premium multinational-brand marketing, offered to NGOs for better funding and better reach". Written for the
 * site from that brief and from the profile's own lines; for the owner's read.
 */
export const home = {
  free: {
    label: "Free for NGOs",
    title: ["Premium marketing.", "Free for NGOs."],
    statement:
      "We don't earn anything from you. The brand, marketing and media work that multinational brands pay for — we give it to NGOs, so your work wins better funding and reaches more people.",
    points: ["No fees", "Better funding", "Better reach"],
  },
  services: {
    label: "What you get",
    title: ["Everything a brand needs", "to be seen."],
    lead: "We take everything a brand needs to be seen — and we build it for NGOs. Same team, same standard as our commercial clients.",
    items: [
      { icon: "identity", title: "Brand identity", body: "Positioning, a logo and identity system, and a profile document that argues your case." },
      { icon: "website", title: "Website", body: "Built properly — fast, clear, on any device, with a way to donate or volunteer." },
      { icon: "search", title: "Search visibility", body: "So the people looking for you, and for help, actually find you." },
      { icon: "ads", title: "Advertising", body: "Campaigns in front of donors and volunteers, including the Google Ad Grants account eligible NGOs can claim." },
      { icon: "press", title: "PR & media", body: "Your story taken to the journalists who cover your cause, so your work reaches beyond the room." },
      { icon: "film", title: "Film & photography", body: "Impact films, documentaries and beneficiary stories, shot by our production team." },
      { icon: "campaign", title: "Campaigns & events", body: "Launches, awareness drives and moments on the ground, planned and captured." },
      { icon: "network", title: "The Asraya network", body: "NGOs stop working alone and start finding each other: shared learning, partners and strength." },
    ],
    link: { label: "See everything we build", href: "/asraya/what-we-build" },
  },
  outcomes: {
    label: "Why it matters",
    funding: { title: "Better funding", items: ["Donations", "Credibility", "Partnerships"] },
    reach: { title: "Better reach", items: ["Awareness", "Volunteers", "And it lasts"] },
    close: "None of this changes the work. It changes how far the work reaches.",
  },
  network: {
    label: "The gap we close",
    line: "The work is real. The record of it does not exist.",
    close: "A network changes that. Shared learning, shared partners, shared strength.",
  },
  steps: {
    label: "How it works",
    title: "Three steps. No invoice.",
    items: [
      { icon: "people", title: "Tell us your story", body: "Your history, your work, your people — and whatever you already have: photos, reports, posts." },
      { icon: "website", title: "We build everything", body: "The full weight of our team behind you. No shortcuts, no lesser version because it is for a cause." },
      { icon: "campaign", title: "You focus on changing lives", body: "We'll focus on making sure the right people know." },
    ],
  },
  explore: {
    label: "More about Asraya",
    items: [
      { href: "/asraya/what-we-build", title: "What we build", body: "Branding, digital, reach, PR, film and campaigns, service by service.", art: "toolkit" },
      { href: "/asraya/partnership", title: "Partnership", body: "Personalised, not packaged — and what we need from you.", art: "together" },
      { href: "/asraya/tomorrow", title: "Tomorrow", body: "Six initiatives we are building towards.", art: "sunrise" },
    ],
  },
} as const;

/* ── /asraya/what-we-build ────────────────────────────────── */

export const build = {
  eyebrow: "What we build",
  title: ["NGO branding", "& profiling"],
  lead: "Before anyone reads about your work, they look at you.",
  brand: [
    { title: "Positioning", body: "We work out what you actually stand for, then write it in one line a donor understands and remembers. It goes at the top of your website, your profile, your emails, your funding applications." },
    { title: "Identity", body: "A logo, colours and typography built into one system — then applied everywhere it lives. Letterhead, reports, ID cards, signboards, social pages, banners, certificates. Not a logo file sent to you. The whole thing, in use." },
    { title: "The Profile Document", body: "The single most useful thing an NGO can own. A designed document carrying your story, your work and your numbers — one file you send to a donor, a CSR head or a government office, that argues for you when you are not in the room." },
  ],
  digital: {
    title: ["Enter the", "digital realm"],
    lead: "This is where people find you. And where they decide about you.",
    search: "your ngo..",
    items: [
      { title: "A website!", body: "Built properly – fast, works on any device, clear. Your work, your people, your numbers, and a way to donate or volunteer without hunting for it. The thing every donor, partner and journalist checks before they contact you." },
      { title: "A social media, a plan, a calendar.", sub: "And the design system to run it", body: "Posts that show real work instead of quotes on gradients — and a page that looks alive when someone lands on it." },
      { title: "The proof that you are working", body: "Field stories, updates, impact numbers, annual reporting. The proof that you are working, published where people can see it." },
      { title: "Your team, trained", body: "We build it, then teach your people to run it. It stays yours." },
    ],
  },
  reach: {
    title: ["Brand up", "stand out"],
    lead: "Being findable is one thing. Being put in front of the right people is another.",
    items: [
      { title: "Google Ad Grants.", body: "Eligible NGOs can receive $10,000 a month in free Google Ads — close to ₹1 crore worth of advertising a year, every year. Most never claim it, because the application & the ongoing account rules are a full-time job. We handle the application, build the campaigns, and manage the account so it keeps running." },
      { title: "Reaching the people you serve.", body: "Someone searching for a shelter, a helpline, a scheme or a service at 2am should find you. That is what search advertising actually does for an NGO." },
    ],
    campaign: {
      title: ["A campaign,", "a conversation,", "a community"],
      sub: "that makes people stop, and then makes them care",
      body: "Campaigns aimed at the people who fund this work, and at corporates looking for causes in your area.",
      close: "Your work, placed in front of the exact people who were already looking for it.",
    },
  },
  story: {
    title: ["Your work", "is a story"],
    lead: "Somebody should be telling it.",
    body: "We build the press list for your cause and your region, and take your story to the journalists who cover it. Coverage does more than reach readers — it is the proof that convinces a donor you are real.",
    press: {
      title: "Press material",
      list: ["Releases", "Statements", "Media kits", "Background notes"],
      body: "Written properly and ready when something happens, so you are never scrambling to explain yourself.",
    },
    recognition: {
      title: "Recognition",
      body: "The people who built this organisation should be known for it. Interviews, articles, speaking, a public voice in the sector.",
      wrongTitle: "When things go wrong",
      wrong: "Sooner or later something is misreported, or a question comes that you have to answer publicly. We are there before it becomes a problem, not after.",
      room: "The room stops being small & your work starts being talked about by people who have never met you...",
      grants: "There are grants, awards and lists your work already qualifies for. Someone has to actually find them and file the applications.",
      weDo: "We do.",
    },
  },
  seen: {
    lead: "Some things cannot be explained in a report. They have to be",
    word: "seen",
    list: "Documentaries, Impact Films, Reels, Beneficiary Stories",
    items: [
      { title: "Documentary", body: "Documentary work. Longer films for the causes that need depth — the ones that take time to understand and time to tell." },
      { title: "Impact films", body: "A proper film about your organisation — what you do, who you do it for, what changes because you exist. The one thing you send when words are not enough." },
      { title: "Beneficiary stories", body: "The people your work has changed, telling it themselves. Filmed with care and with their consent. Nothing convinces a donor faster than a person who has lived it." },
    ],
    alive: {
      title: ["Keep your", "page alive"],
      body: "The steady flow of content that reaches people who will never open a PDF.",
      photoTitle: "Photography",
      photo: "Your field work, your team, your people, documented properly. So the next time you need an image, you have one.",
      crew: "Shot by the same production team behind our commercial films. Real crew, real equipment, real craft.",
      close: "Your work, finally seen the way it actually looks.",
    },
  },
  moments: {
    title: ["Some work needs", "a moment around it"],
    tags: ["Campaign", "Launches", "Awareness"],
    body: "A cause, a message and a plan to put it in front of people — online and on the ground. Built around what you want to change, not around what is easy to post.",
    reason: { lead: "Campaign with a", words: ["reason", "deadline", "& story"], tail: "behind it" },
    give: "Designed so people give, and so you can tell them afterwards what their money did.",
    planned: {
      title: "Planned properly",
      sub: "so the moment reaches beyond the people in the room",
      occasions: ["A new programme", "A new centre", "An annual day", "A report release"],
      network: "Every organisation with us joins the wider Asraya network — shared campaigns, joint moments, and gatherings where NGOs meet the people and the peers who can help them. A campaign is not noise. It is a reason for people to pay attention on the day you need them to.",
      ground: "Street, campus, community. Materials, design, coordination",
      capture: "and the content team to capture it while it happens...",
    },
  },
  anything: {
    title: "Not everything an organisation needs fits into a category",
    whatever: "Whatever comes up... A **merchandise** run, an **exhibition** panel, a **signboard**, a last-minute **deck**.",
    ask: ["If it is design, digital or communication,", "ask us."],
    studio: ["We built the whole studio for this.", "Use what you need."],
    nameIt: ["You name it", "we'll make it"],
    items: [
      { title: "Print and collateral.", body: "Brochures, posters, banners, certificates, ID cards, signage. The everyday material that carries your name into the world." },
      { title: "Annual reports.", body: "Your year, designed properly. The document your funders actually read." },
      { title: "Presentations & pitch decks.", body: "For donors, CSR meetings, government offices & grant panels. Built to argue." },
      { title: "Grant & proposal support.", body: "The writing & design behind an application, so a good case is not lost in a bad document." },
      { title: "Internal material.", body: "Training decks, volunteer handbooks, field manuals — the things that keep an organisation working the same in every location." },
    ],
  },
} as const;

/* ── /asraya/partnership ──────────────────────────────────── */

export const partnership = {
  eyebrow: "Partnership",
  /** By the owner's instruction (2026-11-04) the Asraya pages carry no prices: the costs, the fee and the give-back are
   *  replaced by this. Owner-approved wording. */
  personalised: {
    title: ["Personalised,", "not packaged."],
    body: "Every partnership is shaped around your organisation — your cause, your stage, what you already have and what you need next. We scope the work together, so you get the services that move your work forward.",
  },
  changes: {
    presence: [
      "**We will build your organisation a complete digital presence.** Not a website. A full profile — how you look, how you're found, how you're read, how your work is documented and how your impact is measured.",
      "When a donor, a journalist or a CSR committee searches for you, they will find an organisation that looks the size of the work it does. **The things that are normally out of reach are included.**",
      "Brand identity, design, film and photography, PR, search visibility, advertising, analytics, CRM. These are the services that get cut first from a nonprofit budget, because they cost what a year of programming costs.",
    ],
    owe: "What you owe us is the work itself — done well, and made visible.",
  },
  needs: {
    title: "What we need from you?",
    items: [
      { title: "Your story", body: "Help us understand why **you exist**. Your **history**, **mission**, **vision**, **values**, **challenges** & **ambitions**." },
      { title: "Your impact", body: "Show us what **your work** is actually **changing**. The more we understand your impact, the better we can communicate it.", list: ["Beneficiaries", "Projects", "Outcomes", "Statistics", "Success stories", "Testimonials"], note: "We don't create impact. We make existing impact visible." },
      { title: "Access to your work", body: "Let us **experience** the work **firsthand**. Where appropriate, give us access to:", list: ["Field work", "Facilities", "Events", "Campaigns", "Communities", "Animals", "Beneficiaries"], note: "Because the strongest stories aren't manufactured. They're witnessed." },
      { title: "Your people", body: "Every organization has **people** behind its **purpose**.", list: ["Founders", "Leadership", "Team", "Volunteers", "Beneficiaries", "Partners"], note: "Their experiences, voices & perspectives help people understand the human reality behind the organization." },
      { title: "What you already have", body: "You don't need to have everything **figured out** before you **come to us**. Give us whatever already exists.", list: ["Photographs", "Videos", "Documents", "Presentations", "Reports", "Social media", "Press coverage", "Brand assets etc."], note: "We'll organize what you have, identify what's missing & build from there." },
      { title: "Your trust & approval", body: "You remain the **authority** on your **organization**. We need you to help us ensure:", list: ["Facts are accurate", "Stories have appropriate consent", "Statistics are verified", "Sensitive information is protected", "The final communication represents you honestly"], note: "Our job is to make your story compelling. Your job is to make sure it remains true." },
      { title: "A point of contact", body: "Good **work** needs good **communication**. We ask that you nominate one **primary point of contact** who can help coordinate:", list: ["Information", "Feedback", "Approvals", "Decisions"], note: "This keeps the process simple, accountable & moving." },
    ],
    thatsIt: "That's it!",
    close: ["You focus on changing lives.", "We'll focus on making sure the right people know."],
  },
  model: {
    title: ["The", "partnership", "model"],
    body: [
      "We aim to work alongside NGOs as a long-term communications partner, helping them build their identity, tell their stories, document their work, connect with the right audiences and bring greater visibility to the impact they create.",
      "As their work grows and their needs change, our role grows with them, supporting new initiatives, campaigns and opportunities while they remain focused on what they do best: creating meaningful change.",
    ],
    statement: "Asraya is built to be more than a service provider or a one-time agency.",
  },
  measures: {
    title: "What changed because we were here?",
    intro: [
      "At the beginning of every partnership, we establish a clear picture of where the organization stands.",
      "As we work together, we track how its presence, communication and reach develop over time — creating a simple record of the progress made through the partnership.",
    ],
    items: [
      { piece: "♟", title: "Presence", question: "How professionally and consistently is the organization represented?", list: ["Brand identity", "Digital presence", "Content quality", "Communication consistency", "Public information"] },
      { piece: "♞", title: "Reach", question: "Is the organization's work reaching beyond the people who already know it?", list: ["New audiences", "Geographic reach", "Digital reach", "Media exposure", "Community awareness"] },
      { piece: "♝", title: "Trust", question: "Is the organization becoming easier to understand & trust?", list: ["Public perception", "Storytelling", "Transparency", "Credibility", "Media & institutional recognition"] },
      { piece: "♜", title: "Participation", question: "Are people moving from simply seeing the work to becoming involved?", list: ["Volunteers", "Donors", "Enquiries", "Event participation", "Campaign participation", "Community engagement"] },
      { piece: "♛", title: "Opportunity", question: "Is better communication opening doors for you?", list: ["Partnership enquiries", "Corporate interest", "Media opportunities", "Collaborations", "Funding opportunities", "Institutional relationships"] },
      { piece: "♚", title: "Documentation", question: "How much of the organization's work are we preserving and communicating?", list: ["Stories", "Photographs", "Films", "Campaigns", "Impact reports", "Archives"] },
    ],
  },
} as const;

/* ── /asraya/tomorrow ─────────────────────────────────────── */

export const tomorrow = {
  eyebrow: "Tomorrow",
  today: ["Today,", "helps NGOs communicate."],
  tomorrow: ["Tomorrow,", "we want Asraya to help create the conditions for more people to participate in meaningful work."],
  more: ["More awareness.", "More participation.", "More resources.", "More collaboration.", "More impact."],
  title: "What we are building towards",
  areasLabel: "Potential areas include:",
  initiatives: [
    {
      icon: "safety",
      title: "Women's Safety Initiative",
      body: "A long-term initiative focused on improving awareness, access to resources and everyday safety for women.",
      areas: ["Safety awareness campaigns", "Self-defence education", "Emergency-resource awareness", "Safety technology", "Community programs", "Educational initiatives"],
      note: "The objective is not simply to talk about women's safety, but to develop practical systems that can help women feel safer and better equipped.",
    },
    {
      icon: "animal",
      title: "Animal Welfare & Protection",
      body: "Extending our work beyond human-focused causes.",
      areas: ["Animal rescue", "Adoption awareness", "Stray animal welfare", "Responsible pet ownership", "Veterinary support", "Animal-rights awareness"],
      note: "Because compassion should not have boundaries.",
    },
    {
      icon: "elder",
      title: "Elder Care & Dignity",
      body: "Supporting initiatives focused on elderly people who are vulnerable, isolated or without adequate support.",
      areas: ["Companionship", "Basic necessities", "Community engagement", "Awareness", "Support networks", "Dignity-focused programs"],
    },
    {
      icon: "education",
      title: "Child & Education Initiatives",
      body: "Supporting organizations and initiatives working to give children better access to education, opportunity and protection.",
      areas: ["Education access", "Learning resources", "Mentorship", "Digital literacy", "Awareness programs", "Child welfare"],
    },
    {
      icon: "community",
      title: "Community Support",
      body: "Building initiatives that respond to practical needs within underserved communities.",
      areas: ["Food & essentials", "Education", "Employment awareness", "Skill development", "Community campaigns", "Access to resources"],
    },
    {
      icon: "environment",
      title: "Environment & Sustainability",
      body: "Supporting causes that protect the environments in which communities, animals and future generations depend.",
      areas: ["Environmental awareness", "Clean-up initiatives", "Tree plantation", "Waste reduction", "Sustainable practices", "Community participation"],
    },
  ],
  every: ["Every organization has a story.", "Every cause has a need.", "Every community has people willing to help."],
  found: "Sometimes, they simply haven't found each other yet. That's where we want to begin.",
  starts: "But it starts with you.",
} as const;

/* ── Photographs ──────────────────────────────────────────── */

/**
 * The owner's field photographs, by the ids in docs/asraya-photo-brief.md. Until a `src` is filled in, an essential
 * photo shows a marked slot and an optional one is left out. Fill in `src` (a file in /public/images/asraya/), its
 * `width`, `height` and `alt`, and the page picks it up. All of them are toned to warm black and white on the page.
 */
type Photo = { label: string; essential: boolean; src?: string; width?: number; height?: number; alt?: string };

export const photos = {
  A1: { label: "NGO team at work in the field", essential: true },
  A2: { label: "The unseen work: a shelter, a night class", essential: true },
  A3: { label: "A city NGO worker", essential: true },
  A4: { label: "A village NGO worker", essential: true },
  A5: { label: "Our crew filming at an NGO", essential: false },
  B1: { label: "NGO material in use: signboard, ID cards, profile", essential: true },
  B2: { label: "Staff updating their page", essential: false },
  B3: { label: "An awareness campaign on the street", essential: true },
  B4: { label: "A beneficiary interview being filmed", essential: true },
  B5: { label: "An NGO event or launch", essential: false },
  C1: { label: "An NGO founder and our team, planning", essential: true },
  C2: { label: "Walking into a community with NGO staff", essential: false },
  C3: { label: "Volunteers signing up", essential: false },
  D1: { label: "Women's safety session", essential: true },
  D2: { label: "Animal rescue", essential: true },
  D3: { label: "An elder with a companion", essential: true },
  D4: { label: "Children learning", essential: true },
  D5: { label: "Essentials being handed out", essential: false },
  D6: { label: "Tree planting or a clean-up", essential: false },
} satisfies Record<string, Photo> as Record<string, Photo>;
export type PhotoId = keyof typeof photos;

/** Shared words on the pages. */
export const ui = {
  more: "Read more",
  less: "Show less",
  photoPending: "Photograph to be supplied",
  /** The hint under a drawing that can be played (components/asraya/Play.tsx). */
  play: "Tap to play",
  reset: "Tap to reset",
  /** What pressing each drawing does, for screen readers. */
  art: {
    gift: "Open the gift",
    spotlight: "Light every house",
    amplify: "Turn up the sound",
    together: "Bring the two together",
    sunrise: "Let the sun rise",
    toolkit: "Build the website",
    stamp: "Stamp the brand",
    search: "Search",
    press: "Spread the papers",
    clapper: "Call action",
    bunting: "Celebrate",
    paperwork: "Lay out the paperwork",
    puzzle: "Fit the pieces together",
    checklist: "Tick the list",
    growth: "Let it grow",
    ripple: "Drop a stone in the water",
  },
} as const;
