import type { ButtonHTMLAttributes, ReactNode } from "react";
import { NeuButton } from "./NeuButton";

/** A filter chip: the compact NeuButton as a toggle, raised when off, pressed in when on (aria-pressed). */
export function Chip({ pressed, children, ...rest }: { pressed: boolean; children: ReactNode } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">) {
  return (
    <NeuButton size="sm" aria-pressed={pressed} {...rest}>
      {children}
    </NeuButton>
  );
}
