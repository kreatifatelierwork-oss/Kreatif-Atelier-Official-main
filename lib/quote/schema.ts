import { z } from "zod";
import { practices } from "@/content/aurelius";
import type { PracticeSlug } from "@/content/aurelius-services";

/**
 * Validation for a quote request. The same schema runs in the browser before anything is sent;
 * an endpoint, when one is configured, must validate it again on its side.
 */

// Placeholder ranges: confirm the bands and timelines with the team before launch.
export const budgetOptions = ["Under ₹1 lakh", "₹1–5 lakh", "₹5–15 lakh", "₹15 lakh and above", "Not sure yet"] as const;
export const timelineOptions = ["Within 1 month", "1–3 months", "3–6 months", "Not sure yet"] as const;

const slugs = practices.map((p) => p.slug) as [PracticeSlug, ...PracticeSlug[]];
const optional = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const quoteSchema = z.object({
  services: z.array(z.enum(slugs)).min(1, "Select at least one service."),
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  company: optional(120),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{7,20}$/, "Enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  budget: z.enum(budgetOptions, { message: "Choose a budget range." }),
  timeline: z.enum(timelineOptions, { message: "Choose a timeline." }),
  notes: optional(2000),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
