"use client";

import { useState } from "react";
import { Chip } from "@/components/design/Chip";
import { NeuButton } from "@/components/design/NeuButton";
import { practices } from "@/content/aurelius";
import { contactPage } from "@/content/pages";
import { site } from "@/content/site";

const field =
  "neu-pressed-sm mt-[var(--ds-space-2)] block min-h-[var(--ds-tap)] w-full rounded-[var(--ds-radius-md)] px-[var(--ds-space-4)] py-[var(--ds-space-3)] text-[length:var(--ds-text-base)] text-ds-text placeholder:text-ds-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-focus)]";
const label = "ds-label";

/**
 * Project enquiry form. The site is static, so there is no server to post to: submitting builds
 * an email in the visitor's own mail app. Swap `onSubmit` for a real endpoint when one exists.
 */
export function ContactForm() {
  const { form } = contactPage;
  const [areas, setAreas] = useState<string[]>([]);

  const toggle = (name: string) => setAreas((list) => (list.includes(name) ? list.filter((n) => n !== name) : [...list, name]));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const line = (title: string, value: FormDataEntryValue | string | null) => `${title}: ${value || "—"}`;
    const body = [
      line(form.name, data.get("name")),
      line(form.email, data.get("email")),
      line(form.company, data.get("company")),
      line(form.help, areas.join(", ")),
      line(form.budget, data.get("budget")),
      "",
      form.outcome,
      String(data.get("outcome") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

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
      <div className="md:col-span-2">
        <NeuButton type="submit" variant="primary">
          {form.submit}
        </NeuButton>
        <p className="mt-4 max-w-xl text-[0.86rem] text-cream-faint">{form.note}</p>
      </div>
    </form>
  );
}
