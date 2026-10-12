/**
 * Asraya — the social division of Kreatif Atelier. All copy here comes from the Asraya company
 * profile (31 pages), in the profile's own order. `**double asterisks**` mark the words the profile
 * sets in bold. Figures (fees, costs, the Ad Grants amount) are the profile's own.
 */

export const asraya = {
  name: "Asraya",
  wordmark: "asraya",
  aegis: "under the Aegis of Kreatif Atelier",
  tagline: "Communicating impact. Amplifying change.",
  promise: "You do the work. We make sure people know about it.",
  nav: [
    { label: "The why", href: "/asraya" },
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

/** Artwork from the Asraya company profile (the owner's Canva file), cropped from its pages. The statue is a true cut-out. */
export const art = {
  statue: { src: "/images/profile/asraya/statue.webp", width: 1200, height: 1266, alt: "A marble statue of a seated thinker, working on a laptop" },
  speaker: { src: "/images/profile/asraya/speaker.webp", width: 1000, height: 1134, alt: "A speaker at a lectern in front of a crowd, in silhouette" },
  houses: { src: "/images/profile/asraya/houses.webp", width: 1358, height: 1399, alt: "A desk lamp lighting one small house among many unlit ones" },
  door: { src: "/images/profile/asraya/door.webp", width: 1400, height: 1370, alt: "A small figure standing before a keyboard key that opens like a door onto social media" },
  lion: { src: "/images/profile/asraya/lion.webp", width: 1130, height: 1159, alt: "A cat walking through a door and coming out the other side as a lion" },
  camera: { src: "/images/profile/asraya/camera.webp", width: 1600, height: 634, alt: "A film camera throwing a red beam across volunteers serving food" },
  offering: { src: "/images/profile/asraya/offering.webp", width: 1500, height: 668, alt: "A golden hand holding two children" },
  handAsraya: { src: "/images/profile/asraya/hand-asraya.webp", width: 1600, height: 746, alt: "A hand made of words — the things Asraya builds — reaching out" },
  handYou: { src: "/images/profile/asraya/hand-you.webp", width: 1600, height: 746, alt: "A hand made of words — invisibility, neglect, silence — reaching back" },
  teacher: { src: "/images/profile/asraya/teacher.webp", width: 1800, height: 1527, alt: "A young woman sitting in a circle of children, smiling" },
} as const;
export type ArtName = keyof typeof art;

/* ── /asraya ──────────────────────────────────────────────── */

export const why = {
  title: "The why",
  question: "Why is a digital marketing company starting a social initiative?",
  body: [
    "We build brands for a living. Websites, identity systems, campaigns, films. Work that helps businesses grow. We are good at it. But at some point we started asking whether any of it matters outside a balance sheet. **Asraya is our answer.**",
    "Along the way we kept meeting organisations doing real work on the ground. Women's safety. Education. Healthcare. Environment. Serious people solving serious problems, with almost nothing behind them. And almost none of them could afford the one thing that would let more people find them — a proper website, a brand that looks like the work behind it, a film that tells their story the way it deserves. Not because their work is small. Because every rupee they have goes where it should.",
    "So a proposal reaches a board, the board says no, and the organisation stays invisible for another year. Meanwhile the funding goes to whoever looked more professional. That is the problem we can actually fix. It happens to be the only thing we know how to do well.",
    "Asraya is the social division of Kreatif Atelier, built to give NGOs everything we know how to build. Brand identity, website, content, SEO, advertising, PR, film, campaigns. The full weight of our team behind organisations who have never had it. No shortcuts, no lesser version because it is for a cause.",
    "And not one organisation at a time. Everyone we work with joins a network, so NGOs stop working in isolation and start finding each other. Shared learning, shared partners, shared strength.",
    "We are starting with women's safety, education, healthcare, environment, livelihood and skill development, child welfare, disability and inclusion, and animal welfare.",
    "**If we can help a hundred organisations be seen, heard and connected to each other, that is a better thing to have built than a hundred campaigns.**",
  ],
} as const;

export const gap = {
  kicker: "The distance between the work being done and the people who never hear about it.",
  title: ["The", "visibility", "gap"],
  left: [
    "Somewhere right now, an organisation is running a shelter, teaching a classroom, getting a woman to safety.",
    "Ten people know about it. Maybe fifty. Not because the work is small. Because nobody outside that room has any way of finding out it happened. Almost no digital presence. Nothing to search for, nothing to share, nothing that holds together.",
    "If you went looking for them tonight, you would find a phone number & a few scattered posts from 3 years ago.",
  ],
  right: [
    "**The work is real. The record of it does not exist. That is the gap.** On one side, years of genuine impact. On the other, a donor, a volunteer, a corporate partner, a journalist — people who would care if they knew, and who never will.",
    "Two organisations can do identical work and live entirely different lives. One is known. One is not. Nothing about the work itself explains the difference. It is not a gap in effort, or in quality, or in commitment. It is a gap in who knows.",
    "And it is the reason so much good work in this country stays exactly where it started.",
  ],
} as const;

export const problem = {
  title: ["The", "communication", "problem"],
  subtitle: "Why NGOs struggle to communicate their impact",
  beats: [
    "An organisation in Hyderabad solves a problem that an organisation in Warangal is still struggling with. Neither knows the other exists.",
    "One has a donor relationship that would fit another's cause perfectly. One has a volunteer network sitting idle. One has already fought a battle the other is about to walk into blindly.",
    "None of it gets shared. Not because anyone is unwilling — because there is no room where these conversations happen.",
    "So every organisation starts from zero. Every lesson gets learned twice. Every door gets knocked on separately.",
    "The sector is full of people solving the same problems in isolation, a few hundred kilometres apart.",
    "**That is the 2nd gap.** Not just being unseen by the outside world — being unseen by each other.",
  ],
  close: "A network changes that. Shared learning, shared partners, shared strength. One organisation's contact becomes another's opportunity. One organisation's mistake becomes everyone's warning.",
} as const;

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

export const closes = {
  title: "exists to close the gap",
  lead: "We take everything a brand needs to be seen — and we build it for NGOs.",
  items: [
    "**Identity**, **positioning**, a **profile document** that argues your case instead of listing your activities. What a stranger sees before they meet you.",
    "A **website** built properly, content that keeps working, **search visibility** so people looking for help actually find you.",
    "**Advertising** and **campaigns** that put you in front of donors, volunteers and the people you serve.",
    "**PR and Media**, so your work reaches beyond the room it happens in.",
    "**Your story, told well.** Films, photography, beneficiary stories. Impact that people can feel, not just read about.",
    "Every **organisation** we work with **joins** the others. NGOs stop working in isolation & start finding each other — shared **learning**, shared **partners**, shared **strength**.",
  ],
  standard: "**Same team** that builds for our **commercial clients**. Same standard. No lesser version as it's **for a cause**.",
  given: "All of it, given to someone who needs it and has never had access to it.",
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
  costs: {
    title: ["What it", "normally", "costs"],
    rows: [
      { figure: "₹1.3 crore", label: "Other market", body: "What a comparable agency charges an NGO for the same eleven practices. Midpoint per practice; the full stack lands near ₹1.3 crore." },
      { figure: "₹44.6 lakh", label: "Kreatif Atelier", body: "Our own Master Price List v2.0 — the same rates a paying commercial client is quoted. Roughly a third of market, and still ₹44.6 lakh for the Asraya build." },
    ],
    close: "This is the number an NGO cannot raise. It is also the number Asraya absorbs in full.",
  },
  changes: {
    title: ["What", "Asraya", "changes"],
    lead: "One fee. Everything included.",
    fee: "₹25,000",
    feeLine: "Three practices or eleven — same ₹25,000. No tiers, no line items to cut. Brand, website, content, SEO, analytics, CRM, PR, film and Ad Grants ship as one stack or not at all.",
    points: [
      { title: "The build costs nothing.", body: "Kreatif Atelier absorbs the full ₹44.6 lakh. The fee only keeps it alive — hosting, security, updates, and monthly management of the Ad Grants account so it's never suspended." },
      { title: "And in the eleventh month, it comes back.", body: "A portion of what the NGO has paid is returned as a donation to its own work. The fee funds the infrastructure for a year; the year ends with money going back into the field." },
    ],
    market: "The market asks what an NGO can afford. Asraya asks nothing upfront — and gives back at the end.",
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
      title: "Women's Safety Initiative",
      body: "A long-term initiative focused on improving awareness, access to resources and everyday safety for women.",
      areas: ["Safety awareness campaigns", "Self-defence education", "Emergency-resource awareness", "Safety technology", "Community programs", "Educational initiatives"],
      note: "The objective is not simply to talk about women's safety, but to develop practical systems that can help women feel safer and better equipped.",
    },
    {
      title: "Animal Welfare & Protection",
      body: "Extending our work beyond human-focused causes.",
      areas: ["Animal rescue", "Adoption awareness", "Stray animal welfare", "Responsible pet ownership", "Veterinary support", "Animal-rights awareness"],
      note: "Because compassion should not have boundaries.",
    },
    {
      title: "Elder Care & Dignity",
      body: "Supporting initiatives focused on elderly people who are vulnerable, isolated or without adequate support.",
      areas: ["Companionship", "Basic necessities", "Community engagement", "Awareness", "Support networks", "Dignity-focused programs"],
    },
    {
      title: "Child & Education Initiatives",
      body: "Supporting organizations and initiatives working to give children better access to education, opportunity and protection.",
      areas: ["Education access", "Learning resources", "Mentorship", "Digital literacy", "Awareness programs", "Child welfare"],
    },
    {
      title: "Community Support",
      body: "Building initiatives that respond to practical needs within underserved communities.",
      areas: ["Food & essentials", "Education", "Employment awareness", "Skill development", "Community campaigns", "Access to resources"],
    },
    {
      title: "Environment & Sustainability",
      body: "Supporting causes that protect the environments in which communities, animals and future generations depend.",
      areas: ["Environmental awareness", "Clean-up initiatives", "Tree plantation", "Waste reduction", "Sustainable practices", "Community participation"],
    },
  ],
  every: ["Every organization has a story.", "Every cause has a need.", "Every community has people willing to help."],
  found: "Sometimes, they simply haven't found each other yet. That's where we want to begin.",
  starts: "But it starts with you.",
} as const;
