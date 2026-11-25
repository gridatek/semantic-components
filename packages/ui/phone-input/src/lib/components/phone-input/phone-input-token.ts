import { InjectionToken } from '@angular/core';
import type { ScPhoneInput } from './phone-input';

/** The phone input, for its parts (a token: the root queries its number part). */
export const SC_PHONE_INPUT = new InjectionToken<ScPhoneInput>(
  'SC_PHONE_INPUT',
);
