import { z } from "zod";
import { cart } from "@/content/cart";
import { serviceById } from "@/content/services";
import { site } from "@/content/site";

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

/**
 * Sends the request the way the rest of the site does (the contact form and quote drawer): the
 * visitor's email app opens with everything filled in. Nothing is sent until they press send, so the
 * UI says exactly that and never claims delivery.
 */
export function openCartRequest(input: CartRequest) {
  const lines = [
    "Services:",
    ...input.services.map((id) => {
      const s = serviceById(id);
      return s ? `- ${s.name} (${s.id}, ${s.domainName})` : `- ${id}`;
    }),
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "—"}`,
    "",
    "Message:",
    input.message || "—",
  ];
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(cart.form.subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
