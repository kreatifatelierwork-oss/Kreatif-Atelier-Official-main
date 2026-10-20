"use client";

import { AddToCart } from "@/components/cart/AddToCart";
import { useState } from "react";
import { NeuButton } from "@/components/design/NeuButton";
import { Dialog } from "@/components/ui/Dialog";
import { aurelius, practiceHref } from "@/content/aurelius";
import { serviceNotes } from "@/content/aurelius-service-notes";
import type { PracticeSlug, Service } from "@/content/aurelius-services";

type PracticeRef = { slug: PracticeSlug; name: string };
type Selected = { service: Service; practice: PracticeRef };

/** Holds which service's note is open. The last one stays in place while the dialog closes. */
export function useServiceNote() {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [open, setOpen] = useState(false);
  return {
    selected,
    open,
    show: (service: Service, practice: PracticeRef) => {
      setSelected({ service, practice });
      setOpen(true);
    },
    close: () => setOpen(false),
  };
}

type RowProps = {
  service: Service;
  onOpen: () => void;
  /** `index` is the quieter row used inside the service index; `practice` is the practice page's. */
  variant?: "index" | "practice";
};

/**
 * One service as a button that opens its note. On a practice page it is a raised tile: the code in a
 * small chip, the name bold, and a round "+" that turns on hover. In the service index it is a quieter row.
 */
export function ServiceRow({ service, onOpen, variant = "practice" }: RowProps) {
  if (variant === "practice") {
    return (
      <button type="button" onClick={onOpen} aria-haspopup="dialog" className="neu-tile group h-full">
        <span className="neu-chip shrink-0 !text-[length:var(--ds-text-xs)] !font-bold tracking-[0.06em] !text-ds-blue">{service.code}</span>
        <span className="min-w-0 flex-1 text-[length:var(--ds-text-lg)] leading-snug font-bold [overflow-wrap:anywhere] text-ds-text">{service.name}</span>
        <span
          aria-hidden="true"
          className="neu-raised-sm grid size-9 shrink-0 place-items-center rounded-full text-[length:var(--ds-text-lg)] font-bold text-ds-blue transition-transform duration-[var(--ds-dur-base)] ease-[var(--ds-ease-out)] [@media(hover:hover)]:group-hover:rotate-90"
        >
          +
        </span>
      </button>
    );
  }
  return (
    <button type="button" onClick={onOpen} aria-haspopup="dialog" className="group flex w-full items-baseline gap-4 py-3 text-left transition-colors">
      <span className="eyebrow w-[4.2rem] shrink-0 text-[0.58rem] text-gold">{service.code}</span>
      <span className="min-w-0 flex-1 text-[0.95rem] font-semibold [overflow-wrap:anywhere] text-cream-muted transition-colors group-hover:text-gold-bright">{service.name}</span>
      <span aria-hidden="true" className="shrink-0 text-[0.95rem] text-gold/60 transition-[color,transform] duration-300 group-hover:rotate-90 group-hover:text-gold-bright">
        +
      </span>
    </button>
  );
}

type DialogProps = {
  selected: Selected | null;
  open: boolean;
  onClose: () => void;
  /** Off on a practice page, where the visitor is already looking at that practice. */
  linkToPractice?: boolean;
};

/** The pop-up: what the service is, in a sentence or two, and where to go next. */
export function ServiceNoteDialog({ selected, open, onClose, linkToPractice = true }: DialogProps) {
  const { labels } = aurelius;
  return (
    <Dialog open={open} onClose={onClose} labelledBy="service-note-title" size="narrow">
      {selected && (
        <div className="border border-line p-7 pt-9 md:p-10">
          <p className="eyebrow pr-14 text-[0.6rem] text-gold">
            {selected.service.code} <span className="text-cream-faint">·</span> {selected.practice.name}
          </p>
          <h2 id="service-note-title" className="display mt-4 pr-10 text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.05] text-cream">
            {selected.service.name}
          </h2>
          <p className="mt-6 text-[1.05rem] leading-[1.75] text-cream-muted">{serviceNotes[selected.service.code] ?? labels.noNote}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <AddToCart id={selected.service.code} />
            <NeuButton href="/contact" variant="primary">
              {labels.discuss}
            </NeuButton>
            {linkToPractice && <NeuButton href={practiceHref(selected.practice.slug)}>{selected.practice.name}</NeuButton>}
          </div>
        </div>
      )}
    </Dialog>
  );
}

/** The practice page's list: every service in the practice, each opening its note. */
export function PracticeServiceList({ services, practice }: { services: readonly Service[]; practice: PracticeRef }) {
  const note = useServiceNote();
  return (
    <>
      <ul className="mt-[var(--ds-space-6)] grid gap-[var(--ds-space-4)] sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.code} data-reveal className="flex">
            <ServiceRow service={service} onOpen={() => note.show(service, practice)} />
          </li>
        ))}
      </ul>
      <ServiceNoteDialog selected={note.selected} open={note.open} onClose={note.close} linkToPractice={false} />
    </>
  );
}
