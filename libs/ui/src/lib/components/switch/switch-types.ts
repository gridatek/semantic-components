import { InjectionToken } from '@angular/core';

export interface ScSwitchContext {
  id: () => string;
  checked: () => boolean;
  disabled: () => boolean;
  dataState: () => 'checked' | 'unchecked';
}

export const SC_SWITCH_FIELD = new InjectionToken<ScSwitchContext>(
  'SC_SWITCH_FIELD',
);
