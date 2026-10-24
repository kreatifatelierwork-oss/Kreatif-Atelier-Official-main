import { site } from "@/content/site";

/**
 * Emails an enquiry to the owner's inbox through FormSubmit (formsubmit.co), since the static export has no server.
 * `fields` become the rows of the email, in order. Resolves once FormSubmit accepts it; rejects otherwise (network
 * error, or the form not yet activated: the first submission sends an activation link to the inbox).
 */
export async function sendEnquiry(subject: string, fields: Record<string, string>, replyTo: string) {
  const response = await fetch(site.enquiries.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...fields, _subject: subject, _replyto: replyTo, _template: "table", _captcha: "false" }),
  });
  const result = (await response.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
  if (!response.ok || String(result?.success) !== "true") throw new Error(result?.message || `Enquiry endpoint responded ${response.status}`);
}
