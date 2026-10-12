import { practices } from "@/content/aurelius";
import { site } from "@/content/site";
import type { QuoteInput } from "./schema";

/**
 * Sends a validated quote request.
 *
 * - If `NEXT_PUBLIC_QUOTE_ENDPOINT` is set, the request is POSTed there as JSON. Resolves "endpoint"
 *   once the server says it accepted it; rejects otherwise.
 * - If not, the visitor's own email app opens with the request filled in. Resolves "mailto". Nothing
 *   is sent until they press send, so the UI must not claim it was delivered.
 *
 * The static export has no server of its own, so storing or emailing from here needs a provider:
 * see the adapter note in `sendByEndpoint` below.
 */
export async function submitQuote(input: QuoteInput): Promise<"endpoint" | "mailto"> {
  const endpoint = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT;
  if (endpoint) {
    await sendByEndpoint(endpoint, input);
    return "endpoint";
  }
  openMailto(input);
  return "mailto";
}

/**
 * Adapter for delivery. Replace the body with a provider call (Resend, SMTP or a form service) once
 * one is chosen; keep the signature. The endpoint receives the same JSON shape as `QuoteInput`.
 */
async function sendByEndpoint(url: string, input: QuoteInput) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Quote endpoint responded ${response.status}`);
}

function openMailto(input: QuoteInput) {
  const names = Object.fromEntries(practices.map((p) => [p.slug, p.name]));
  const lines = [
    `Services: ${input.services.map((s) => names[s]).join(", ")}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "—"}`,
    `Phone: ${input.phone || "—"}`,
    `Budget: ${input.budget}`,
    `Timeline: ${input.timeline}`,
    "",
    "Project notes:",
    input.notes || "—",
  ];
  const subject = "Quote request — Aurelius";
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
