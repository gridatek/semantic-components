import type { Combobox } from '@angular/aria/combobox';
import { type ElementRef, InjectionToken } from '@angular/core';
import type { ScSelect } from './select';

export const SC_SELECT = new InjectionToken<ScSelect>('SC_SELECT');

export interface ScSelectTriggerContext {
  readonly combobox: Combobox;
  readonly elementRef: ElementRef<HTMLElement>;
  /** The id the label points to, and that names the list. */
  readonly id: () => string;
}

export const SC_SELECT_TRIGGER = new InjectionToken<ScSelectTriggerContext>(
  'SC_SELECT_TRIGGER',
);

/** A `{ value, label }` pair: the label shown for a value before the list has opened. */
export interface ScSelectItemData {
  value: string;
  label: string;
}

/** Where the popup opened: over the trigger (`none`), below or above it. */
export type ScSelectSide = 'none' | 'bottom' | 'top';
