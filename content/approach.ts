/**
 * The approach steps and the measurement loop, with their short lines and details.
 * DRAFT COPY (2026-10-21): written for the site, plain and free of claims, for the owner's review.
 * Step titles are the profile's own (content/aurelius.ts → process, content/home.ts → measurement.loop).
 */
export type StepCopy = { title: string; line: string; detail?: { outcome: string; deliverables: string[] } };

export const processSteps: StepCopy[] = [
  {
    title: "Discovery",
    line: "Understand the business, the buyer and what has been tried.",
    detail: { outcome: "A shared, written picture of where the brand stands and what needs to change.", deliverables: ["Kick-off workshop", "Audit of current channels and work", "Audience and competitor notes"] },
  },
  {
    title: "Strategy",
    line: "Decide the position, the audience and where to show up.",
    detail: { outcome: "One plan the whole team can act on, with clear priorities.", deliverables: ["Positioning and messaging", "Channel and media plan", "Measures of success"] },
  },
  {
    title: "Execution",
    line: "Make the work: identity, content, campaigns, the site.",
    detail: { outcome: "The creative, media and digital pieces the plan calls for.", deliverables: ["Creative and content", "Campaign builds", "Site and funnel changes"] },
  },
  {
    title: "Delivery & integration",
    line: "Put it live and connect it to your tools and team.",
    detail: { outcome: "Work that runs in the real world and is wired into how you operate.", deliverables: ["Launch and trafficking", "Tracking and tool set-up", "Hand-over to your team"] },
  },
  {
    title: "Measurement & iteration",
    line: "Read what happened and redirect the spend.",
    detail: { outcome: "Evidence about what worked, and the next round of changes.", deliverables: ["Reporting", "Learnings in plain language", "The next set of changes"] },
  },
];

export const loopSteps: StepCopy[] = [
  { title: "Analytics", line: "Track what each channel and piece of work actually does." },
  { title: "Learning", line: "Turn the numbers into a plain reading of what worked and why." },
  { title: "Creative / media change", line: "Move budget and change the work based on that reading." },
  { title: "Re-measurement", line: "Measure again, so the next decision rests on evidence." },
];

export const stepWireLabels = {
  outcome: "Outcome",
  deliverables: "What you get",
  open: (title: string) => `Show details for ${title}`,
  loopNote: "And round again.",
} as const;
