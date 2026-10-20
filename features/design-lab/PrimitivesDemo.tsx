"use client";

import { useState } from "react";
import { Accordion } from "@/components/design/Accordion";
import { Badge } from "@/components/design/Badge";
import { Card } from "@/components/design/Card";
import { Chip } from "@/components/design/Chip";
import { Field, TextArea } from "@/components/design/Field";
import { DisplayHeading } from "@/components/design/DisplayHeading";
import { NeuButton } from "@/components/design/NeuButton";
import { Tabs } from "@/components/design/Tabs";
import { Toggle } from "@/components/design/Toggle";
import { Tooltip } from "@/components/design/Tooltip";

const row = "flex flex-wrap items-center gap-[var(--ds-space-5)]";

/** Every Phase 1 primitive in each of its states, for review. */
export function PrimitivesDemo() {
  const [on, setOn] = useState(true);
  const [tab, setTab] = useState("strategy");
  const [chips, setChips] = useState<string[]>(["seo"]);
  const flip = (id: string) => setChips((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  return (
    <div className="flex flex-col gap-[var(--ds-space-8)]">
      <div className="flex flex-col gap-[var(--ds-space-5)]">
        <DisplayHeading level={1} className="ds-display" as="p">
          Aurelius
        </DisplayHeading>
        <DisplayHeading level={2} className="ds-heading" as="p">
          Section heading <span className="ds-emphasis">in a maroon gradient</span>
        </DisplayHeading>
        <DisplayHeading level={3} className="font-ds-display text-[length:var(--ds-text-xl)] uppercase" as="p">
          Card title, solid maroon
        </DisplayHeading>
      </div>
      <div className={row}>
        <NeuButton href="#" variant="primary">
          Primary
        </NeuButton>
        <NeuButton href="#">Secondary</NeuButton>
        <NeuButton href="#" disabled>
          Disabled
        </NeuButton>
        <NeuButton variant="icon" aria-label="Add">
          +
        </NeuButton>
        <NeuButton size="sm">Compact</NeuButton>
        <NeuButton loading>Sending</NeuButton>
        <span className="rounded-[var(--ds-radius-lg)] bg-[var(--au-maroon-900)] p-[var(--ds-space-4)]">
          <NeuButton tone="dark">On dark</NeuButton>
        </span>
        <Tooltip content="A glass tooltip">
          <NeuButton>Hover or focus me</NeuButton>
        </Tooltip>
      </div>
      <div className={row}>
        <Toggle checked={on} onChange={setOn} label="Chart" />
        <Toggle checked={false} onChange={() => {}} label="Disabled" disabled />
        <span className="rounded-[var(--ds-radius-lg)] bg-[var(--au-maroon-900)] p-[var(--ds-space-4)]">
          <Toggle checked={on} onChange={setOn} label="Dark" tone="dark" />
        </span>
        <Tabs
          label="Pillars"
          value={tab}
          onChange={setTab}
          tabs={[
            { id: "strategy", label: "Strategy" },
            { id: "creative", label: "Creative" },
            { id: "media", label: "Media" },
            { id: "technology", label: "Technology" },
          ]}
        />
      </div>
      <div className={row}>
        {["seo", "advertising", "pr", "film"].map((id) => (
          <Chip key={id} pressed={chips.includes(id)} onClick={() => flip(id)}>
            {id.toUpperCase()}
          </Chip>
        ))}
        <Badge>3</Badge>
        <Badge tone="gold">New</Badge>
      </div>
      <div className="grid gap-[var(--ds-space-6)] md:grid-cols-2">
        <Card className="p-[var(--ds-space-6)]">
          <p className="ds-label">Raised card</p>
          <p className="ds-body mt-[var(--ds-space-2)]">Structure is neumorphic.</p>
        </Card>
        <Card variant="inset" className="p-[var(--ds-space-6)]">
          <p className="ds-label">Inset card</p>
          <p className="ds-body mt-[var(--ds-space-2)]">A pressed well.</p>
        </Card>
        <Field label="Name" placeholder="Your name" />
        <Field label="Email (disabled)" placeholder="—" disabled />
        <TextArea label="Message" placeholder="Tell us your goal" className="md:col-span-2" />
      </div>
      <div className="flex flex-col gap-[var(--ds-space-3)]">
        <Accordion title="What does a first engagement look like?" defaultOpen>
          Placeholder answer for the accordion demo.
        </Accordion>
        <Accordion title="How do you report results?">Placeholder answer for the accordion demo.</Accordion>
      </div>
    </div>
  );
}
