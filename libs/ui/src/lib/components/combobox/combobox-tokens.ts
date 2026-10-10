import type { Combobox } from '@angular/aria/combobox';
import { type ElementRef, InjectionToken } from '@angular/core';
import type { ScCombobox } from './combobox';

export const SC_COMBOBOX = new InjectionToken<ScCombobox>('SC_COMBOBOX');

export interface ScComboboxTriggerContext {
  readonly label: string | null;
  readonly combobox: Combobox;
  readonly elementRef: ElementRef<HTMLElement>;
}

export const SC_COMBOBOX_TRIGGER = new InjectionToken<ScComboboxTriggerContext>(
  'SC_COMBOBOX_TRIGGER',
);
