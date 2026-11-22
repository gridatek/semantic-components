import { InjectionToken } from '@angular/core';
import type { ScPhoneInputNext } from './phone-input-next';

/** The phone input, for its parts (a token: the root queries its number part). */
export const SC_PHONE_INPUT_NEXT = new InjectionToken<ScPhoneInputNext>(
  'SC_PHONE_INPUT_NEXT',
);
