import { InjectionToken, type Signal } from '@angular/core';

/**
 * What a tooltip's parts (`scTooltip`, `scTooltipArrow`) read: given by their
 * `scTooltipProvider`, or by a component that shows a tooltip of its own (the
 * sidebar's collapsed menu buttons) — so it uses these parts, not copies.
 */
export interface ScTooltipContext {
  /** The tooltip's id: its trigger's `aria-describedby`. */
  readonly id: string;
  /** The side of the trigger it is placed on. */
  readonly placedSide: Signal<string>;
  /** The pointer is on the tooltip: it stays open. */
  keepOpen(): void;
  /** The pointer left it: closed after its grace. */
  hideSoon(): void;
}

export const SC_TOOLTIP_CONTEXT = new InjectionToken<ScTooltipContext>(
  'SC_TOOLTIP_CONTEXT',
);
