import { InjectionToken } from '@angular/core';
import type { CountryCode } from 'libphonenumber-js';
import type { ScPhoneInput } from './phone-input';

/** An ISO 3166-1 alpha-2 country code that has a numbering plan (`'FR'`). */
export type ScPhoneCountryCode = CountryCode;

/** A country for the country list. */
export interface ScPhoneCountry {
  code: ScPhoneCountryCode;
  /** Localised name (`Intl.DisplayNames`). */
  name: string;
  /** Without the `+` (`'33'`). */
  callingCode: string;
}

export const SC_PHONE_INPUT = new InjectionToken<ScPhoneInput>(
  'SC_PHONE_INPUT',
);
