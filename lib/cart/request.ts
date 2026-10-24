import { z } from "zod";
import { cart } from "@/content/cart";
import { serviceById } from "@/content/services";
import { site } from "@/content/site";
import { sendEnquiry } from "@/lib/enquiry/send";

const { errors } = cart.form;

/** The cart's quote request: the selected services plus who is asking. Phone and message are optional. */
export const cartRequestSchema = z.object({
  services: z.array(z.string()).min(1, errors.empty),
  name: z.string().trim().min(2, errors.name),
  email: z.string().trim().email(errors.email),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{7,20}$/, errors.phone)
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type CartRequest = z.infer<typeof cartRequestSchema>;

/** The request as labelled rows, in order: the email FormSubmit sends, and the fallback email body. */
function requestFields(input: CartRequest): Record<string, string> {
  return {
    Services: input.services
      .map((id) => {
        const s = serviceById(id);
        return s ? `${s.name} (${s.id}, ${s.domainName})` : id;
      })
      .join("\n"),
    Name: input.name,
    Email: input.email,
    Phone: input.phone || "—",
    Message: input.message || "—",
  };
}

const subjectFor = (input: CartRequest) => `${cart.form.subject}: ${input.name}`;

/** Emails the request to the team's inbox, like the contact form (lib/enquiry/send.ts). Rejects if it was not accepted. */
export function sendCartRequest(input: CartRequest) {
  return sendEnquiry(subjectFor(input), requestFields(input), input.email);
}

/** The same request as a mailto: link, offered when sending fails. */
export function cartRequestMailto(input: CartRequest) {
  const body = Object.entries(requestFields(input))
    .map(([k, v]) => `${k}:${k === "Services" ? "\n" : " "}${v}`)
    .join("\n\n");
  return `mailto:${site.enquiries.inbox}?subject=${encodeURIComponent(subjectFor(input))}&body=${encodeURIComponent(body)}`;
}
