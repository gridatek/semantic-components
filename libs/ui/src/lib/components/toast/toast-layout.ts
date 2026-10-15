import { InjectionToken, type Signal } from '@angular/core';

/** Where a toast sits in its stack — given by the stack, read by `scToast`. */
export interface ScToastLayout {
  /** 0 for the newest (in front), then 1, 2… behind it. */
  readonly index: Signal<number>;
  /** Spread out (hovered or focused), or stacked behind the front one. */
  readonly expanded: Signal<boolean>;
  /** From the stack's edge, when spread out: the heights of those in front, and the gaps. */
  readonly offset: Signal<number>;
  /** How many show, stacked. */
  readonly visible: number;
  /** The front toast's height, which those behind it take while stacked. */
  readonly frontHeight: Signal<number>;
  /** Whether the stack grows up from the bottom of the screen. */
  readonly fromBottom: boolean;
  /** Its own height, as it would be spread out. */
  measure(height: number): void;
}

export const SC_TOAST_LAYOUT = new InjectionToken<ScToastLayout>(
  'SC_TOAST_LAYOUT',
);

/** How far each toast behind the front one shows, stacked. */
export const SC_TOAST_PEEK = 14;
/** Between toasts, spread out. */
export const SC_TOAST_GAP = 8;
