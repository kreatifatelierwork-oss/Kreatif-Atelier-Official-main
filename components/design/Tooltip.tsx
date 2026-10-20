"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement } from "react";

/**
 * A small glass tooltip on hover and keyboard focus. Built on base-ui (pick-ui-library: accessible,
 * unstyled primitives rather than a hand-rolled popover), styled by `.ds-tooltip`.
 */
export function Tooltip({ content, children }: { content: string; children: ReactElement }) {
  return (
    <BaseTooltip.Provider delay={250}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner sideOffset={8}>
            <BaseTooltip.Popup className="ds-tooltip">{content}</BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
