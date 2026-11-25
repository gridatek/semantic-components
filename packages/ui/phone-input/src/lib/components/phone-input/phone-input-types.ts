import type { CountryCode } from 'libphonenumber-js';

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
