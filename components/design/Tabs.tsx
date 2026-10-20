"use client";

import { useRef } from "react";

type Tab = { id: string; label: string };

/**
 * Tabs as a segmented control: an inset track, the selected tab raised. Arrow keys move between tabs
 * (roving focus); the panel is the caller's, labelled by `${id}-tab`.
 */
export function Tabs({ tabs, value, onChange, label }: { tabs: Tab[]; value: string; onChange: (id: string) => void; label: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (from: number, step: number) => {
    const next = (from + step + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} className="neu-tabs">
      {tabs.map((t, i) => (
        <button
          key={t.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          id={`${t.id}-tab`}
          type="button"
          role="tab"
          aria-selected={t.id === value}
          tabIndex={t.id === value ? 0 : -1}
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") move(i, 1);
            if (e.key === "ArrowLeft") move(i, -1);
          }}
          className="neu-tab"
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
