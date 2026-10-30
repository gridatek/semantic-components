import type { Combobox } from '@angular/aria/combobox';
import { type ElementRef, InjectionToken } from '@angular/core';
import type { ScSelectNext } from './select-next';

export const SC_SELECT_NEXT = new InjectionToken<ScSelectNext>(
  'SC_SELECT_NEXT',
);

export interface ScSelectNextTriggerContext {
  readonly combobox: Combobox;
  readonly elementRef: ElementRef<HTMLElement>;
  /** The id the label points to, and that names the list. */
  readonly id: () => string;
}

export const SC_SELECT_NEXT_TRIGGER =
  new InjectionToken<ScSelectNextTriggerContext>('SC_SELECT_NEXT_TRIGGER');

/** A `{ value, label }` pair: the label shown for a value before the list has opened. */
export interface ScSelectNextItemData {
  value: string;
  label: string;
}

/** Where the popup opened: over the trigger (`none`), below or above it. */
export type ScSelectNextSide = 'none' | 'bottom' | 'top';
