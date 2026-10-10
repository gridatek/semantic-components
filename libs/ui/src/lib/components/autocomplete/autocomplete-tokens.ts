import type { Combobox } from '@angular/aria/combobox';
import { type ElementRef, InjectionToken } from '@angular/core';
import type { ScAutocomplete } from './autocomplete';

export const SC_AUTOCOMPLETE = new InjectionToken<ScAutocomplete>(
  'SC_AUTOCOMPLETE',
);

export interface ScAutocompleteInputContext {
  readonly combobox: Combobox;
  readonly elementRef: ElementRef<HTMLInputElement>;
}

export const SC_AUTOCOMPLETE_INPUT =
  new InjectionToken<ScAutocompleteInputContext>('SC_AUTOCOMPLETE_INPUT');
