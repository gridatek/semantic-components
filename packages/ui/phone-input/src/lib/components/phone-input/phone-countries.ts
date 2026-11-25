import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import type { ScPhoneCountry } from './phone-input-types';

/**
 * Every country with a numbering plan, named in `locale` (default: the
 * browser's) and sorted by name — the data for a country list.
 */
export function phoneCountries(locale?: string): ScPhoneCountry[] {
  const names = new Intl.DisplayNames(locale ? [locale] : undefined, {
    type: 'region',
  });
  return getCountries()
    .map((code) => ({
      code,
      name: names.of(code) ?? code,
      callingCode: getCountryCallingCode(code),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}
