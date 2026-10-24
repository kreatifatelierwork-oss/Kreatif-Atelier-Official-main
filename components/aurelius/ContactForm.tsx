"use client";

import { useState } from "react";
import { Chip } from "@/components/design/Chip";
import { NeuButton } from "@/components/design/NeuButton";
import { practices } from "@/content/aurelius";
import { contactPage } from "@/content/pages";
import { site } from "@/content/site";
import { sendEnquiry } from "@/lib/enquiry/send";

const field =
  "neu-pressed-sm mt-[var(--ds-space-2)] block min-h-[var(--ds-tap)] w-full rounded-[var(--ds-radius-md)] px-[var(--ds-space-4)] py-[var(--ds-space-3)] text-[length:var(--ds-text-base)] text-ds-text placeholder:text-ds-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-focus)]";
const label = "ds-label";

type Status = { state: "idle" | "sending" } | { state: "sent"; email: string } | { state: "failed"; mailto: string };

/**
 * Project enquiry form ("Start a Project"). Submitting emails the enquiry to the team's inbox
 * (`site.enquiries`, via lib/enquiry/send.ts). If that fails, the visitor is offered the same
 * enquiry as an email from their own mail app. `_honey` is a hidden trap field for bots.
 */
export function ContactForm() {
  const { form } = contactPage;
  const [areas, setAreas] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const toggle = (name: string) => setAreas((list) => (list.includes(name) ? list.filter((n) => n !== name) : [...list, name]));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "sending") return;
    const el = event.currentTarget;
    const data = new FormData(el);
    // A bot filled the hidden field: pretend it worked.
    if (data.get("_honey")) return setStatus({ state: "sent", email: String(data.get("email")) });
    const value = (key: string) => String(data.get(key) ?? "").trim() || "—";
    const fields = {
      [form.name]: value("name"),
      [form.email]: value("email"),
      [form.company]: value("company"),
      [form.help]: areas.join(", ") || "—",
      [form.outcome]: value("outcome"),
      [form.budget]: value("budget"),
    };
    const subject = `${form.subject}: ${value("name")}`;
    setStatus({ state: "sending" });
    try {
      await sendEnquiry(subject, fields, value("email"));
      el.reset();
      setAreas([]);
      setStatus({ state: "sent", email: value("email") });
    } catch {
      const body = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n");
      setStatus({ state: "failed", mailto: `mailto:${site.enquiries.inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` });
    }
  };

  if (status.state === "sent")
    return (
      <div className="grid gap-6">
        <p role="status" className="max-w-xl text-[length:var(--ds-text-lg)] text-ds-text">{form.sent(status.email)}</p>
        <div>
          <NeuButton onClick={() => setStatus({ state: "idle" })}>{form.another}</NeuButton>
        </div>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className={label}>
          {form.name}
        </label>
        <input id="cf-name" name="name" type="text" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>
          {form.email}
        </label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-company" className={label}>
          {form.company} <span className="text-cream-faint">({form.optional})</span>
        </label>
        <input id="cf-company" name="company" type="text" autoComplete="organization" className={field} />
      </div>
      <fieldset className="md:col-span-2">
        <legend className={label}>{form.help}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {practices.map((p) => (
            <Chip key={p.slug} pressed={areas.includes(p.name)} onClick={() => toggle(p.name)}>
              {p.name}
            </Chip>
          ))}
        </div>
      </fieldset>
      <div className="md:col-span-2">
        <label htmlFor="cf-outcome" className={label}>
          {form.outcome}
        </label>
        <textarea id="cf-outcome" name="outcome" required rows={5} className={field} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-budget" className={label}>
          {form.budget} <span className="text-cream-faint">({form.optional})</span>
        </label>
        <input id="cf-budget" name="budget" type="text" className={field} />
      </div>
      <label className="flex items-start gap-3 text-[0.95rem] text-cream-muted md:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--gold)]" />
        {form.consent}
      </label>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="md:col-span-2">
        <NeuButton type="submit" variant="primary" loading={status.state === "sending"}>
          {status.state === "sending" ? form.sending : form.submit}
        </NeuButton>
        <p role="status" className="mt-4 max-w-xl text-[0.86rem] text-cream-faint">
          {status.state === "failed" ? (
            <>
              {form.failed}{" "}
              <a href={status.mailto} className="underline underline-offset-4">
                {form.fallback}
              </a>
            </>
          ) : (
            form.note
          )}
        </p>
      </div>
    </form>
  );
}
