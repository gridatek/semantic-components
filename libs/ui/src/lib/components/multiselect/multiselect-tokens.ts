import type { Combobox } from '@angular/aria/combobox';
import { type ElementRef, InjectionToken } from '@angular/core';
import type { ScMultiselect } from './multiselect';

export const SC_MULTISELECT = new InjectionToken<ScMultiselect>(
  'SC_MULTISELECT',
);

export interface ScMultiselectTriggerContext {
  readonly combobox: Combobox;
  readonly elementRef: ElementRef<HTMLElement>;
}

export const SC_MULTISELECT_TRIGGER =
  new InjectionToken<ScMultiselectTriggerContext>('SC_MULTISELECT_TRIGGER');
