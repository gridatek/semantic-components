import { InjectionToken } from '@angular/core';

export interface ScCheckboxContext {
  // Auto-generated id, overridable by consumer
  id: () => string;
  // Computed state from native input
  checked: () => boolean;
  disabled: () => boolean;
  indeterminate: () => boolean;
  dataState: () => 'checked' | 'unchecked' | 'indeterminate';
}

export const SC_CHECKBOX_FIELD = new InjectionToken<ScCheckboxContext>(
  'SC_CHECKBOX_FIELD',
);
