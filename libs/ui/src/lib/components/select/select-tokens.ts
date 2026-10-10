import type { Combobox } from '@angular/aria/combobox';
import { type ElementRef, InjectionToken } from '@angular/core';
import type { ScSelect } from './select';

export const SC_SELECT = new InjectionToken<ScSelect>('SC_SELECT');

export interface ScSelectTriggerContext {
  readonly combobox: Combobox;
  readonly elementRef: ElementRef<HTMLElement>;
}

export const SC_SELECT_TRIGGER = new InjectionToken<ScSelectTriggerContext>(
  'SC_SELECT_TRIGGER',
);
