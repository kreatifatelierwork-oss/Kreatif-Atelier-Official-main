/**
 * Copy for the inner pages (docs/website-blueprint.md §3, §11). Lines come from the profile and
 * the blueprint; `placeholder` entries must be replaced with approved content before launch.
 */

export const workPage = {
  eyebrow: ["Aurelius", "Work"],
  title: "Selected work",
  lead: "Some things cannot be explained in a document. They just have to be seen.",
  /** Placeholder: no approved case studies have been supplied. Never fill this with invented work. */
  placeholder: "Placeholder — approved case studies will appear here.",
  meta: { title: "Work — Aurelius | Kreatif Atelier", description: "Selected work from Aurelius, the marketing, advertising and growth company within Kreatif Atelier." },
} as const;

export const approachPage = {
  eyebrow: ["Aurelius", "Approach"],
  title: "We write it. Shoot it. Buy it. Measure it.",
  lead: "Most agencies pick a side. We were built to hold both ends.",
  processLabel: "How Aurelius works",
  processHeadline: { lead: "From discovery", emphasis: "to measurement." },
  closing: {
    lead: "The best outcome is a client who needs us less.",
    body: "We would rather build capability inside your team than sell you a dependency.",
  },
  meta: { title: "Approach — Aurelius | Kreatif Atelier", description: "How Aurelius works: strategy, creative, media and technology held together, and measurement that redirects spend." },
} as const;

export const aboutAureliusPage = {
  eyebrow: ["About", "Aurelius"],
  aboutLabel: "About Aurelius",
  pillarsLabel: "What we hold together",
  meta: { title: "About Aurelius — Kreatif Atelier", description: "Aurelius is the marketing and advertising company within Kreatif Atelier, bringing together strategy, creative, media and technology." },
} as const;

export const aboutKaPage = {
  eyebrow: ["About", "Kreatif Atelier"],
  title: "Ideas. People. Impact.",
  ventures: "Our ventures",
  contact: "Contact us",
  meta: { title: "About Kreatif Atelier", description: "Kreatif Atelier is a creative holding ecosystem connecting people, ideas and complementary disciplines to create meaningful opportunities and lasting impact." },
} as const;

export const contactPage = {
  eyebrow: ["Contact"],
  title: "Start a project",
  lead: "Tell us your goal, what you have tried and what you need help solving.",
  form: {
    name: "Name",
    email: "Work email",
    company: "Company / website",
    optional: "optional",
    help: "What do you need help with?",
    outcome: "What outcome are you trying to achieve?",
    budget: "Approximate budget and timing",
    consent: "I agree to be contacted about this enquiry.",
    submit: "Start a Project",
    /** The enquiry is emailed to the team (lib/enquiry/send.ts); if that fails, the visitor can send it from their own email app. */
    note: "Your enquiry comes straight to our inbox. We reply by email.",
    sending: "Sending…",
    sent: (email: string) => `Thank you. Your enquiry has reached us, and we will reply to ${email}.`,
    failed: "Your enquiry did not go through. Please try again, or send it from your email app.",
    fallback: "Send it by email instead",
    another: "Send another enquiry",
    subject: "Project enquiry",
  },
  detailsLabel: "Or reach us directly",
  meta: { title: "Contact — Kreatif Atelier", description: "Start a project with Aurelius, or get in touch with Kreatif Atelier." },
} as const;

export const servicesPage = {
  eyebrow: ["Aurelius", "Services"],
  title: "206 services. 11 practice areas.",
  lead: "Each one can stand on its own. They are built to work together.",
  meta: { title: "Services — Aurelius | Kreatif Atelier", description: "The full Aurelius catalogue: 206 marketing, advertising and growth services across 11 practice areas." },
} as const;
