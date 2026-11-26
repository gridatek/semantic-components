import { LOCALE_ID, type Signal, computed, inject } from '@angular/core';
import {
  definePreference,
  injectPreference,
} from '../../components/preferences/preference';

/**
 * How digits are written, as Unicode names it — `Intl`'s `numberingSystem`,
 * the locale tag's `nu` key (`ar-u-nu-latn`): `'latn'` 0123, `'arab'` ٠١٢٣,
 * `'arabext'` ۰۱۲۳. The library's values, and what it reads, are always
 * `latn`; only what it shows follows.
 */
export type ScNumberingSystem = 'latn' | 'arab' | 'arabext';

/** The numbering systems offered. */
export const SC_NUMBERING_SYSTEMS: readonly ScNumberingSystem[] = [
  'latn',
  'arab',
  'arabext',
];

/**
 * @internal The numbering system the user chose, kept
 * (`sc-numbering-system`, a cookie the server reads; other tabs follow);
 * nothing kept until they choose. Apps use `injectNumberingSystem()`.
 */
export const ɵNUMBERING_SYSTEM = definePreference({
  attribute: 'data-numbering-system',
  values: SC_NUMBERING_SYSTEMS,
  storageKey: 'sc-numbering-system',
  global: true,
});

/** The locale's own (its `nu`, else its digits by default), else `latn`. */
function localeNumberingSystem(locale: string): ScNumberingSystem {
  const own = new Intl.NumberFormat(locale).resolvedOptions().numberingSystem;
  return (SC_NUMBERING_SYSTEMS as readonly string[]).includes(own)
    ? (own as ScNumberingSystem)
    : 'latn';
}

/** The user's numbering system: always one. */
export interface ScNumberingSystemPreference {
  /** The one the user chose, else the locale's. */
  readonly value: Signal<ScNumberingSystem>;
  /** Chosen: kept, and what the parts show follows it. */
  set(system: ScNumberingSystem): void;
}

/**
 * The user's numbering system, for your settings: `value()` is always one —
 * the one they chose, else the locale's (with the app's, set on its i18n
 * locale), else `latn` — and `set()` keeps their choice. What the parts show
 * follows at once, and in the user's other tabs. An app that formats with
 * Angular's pipes, which read `LOCALE_ID` once, reloads the page instead.
 */
export function injectNumberingSystem(): ScNumberingSystemPreference {
  const preference = injectPreference(ɵNUMBERING_SYSTEM);
  const locale = inject(LOCALE_ID);
  return {
    value: computed(() => preference.value() ?? localeNumberingSystem(locale)),
    set: (system) => preference.set(system),
  };
}

/**
 * The locale to show with: `LOCALE_ID`, in the user's numbering system once
 * they chose one (`en-u-nu-arab`) — what the parts format with. Give it to
 * `Intl` or `toLocaleString` for your own dates and times
 * (`date.toLocaleString(locale(), { dateStyle: 'long' })`), so they read as
 * the parts' do. For what is shown only: values and parsing stay `latn`.
 */
export function injectDisplayLocale(): Signal<string> {
  const locale = inject(LOCALE_ID);
  const chosen = injectPreference(ɵNUMBERING_SYSTEM).value;
  return computed(() => {
    const numberingSystem = chosen();
    return numberingSystem
      ? new Intl.Locale(locale, { numberingSystem }).toString()
      : locale;
  });
}

/** Writes a number as shown: `Intl.NumberFormat`'s options. */
export type ScFormatNumber = (
  value: number,
  options?: Intl.NumberFormatOptions,
) => string;

/**
 * A number as the parts show theirs, in the user's numbering system: `42`,
 * `٤٢` or `۴۲`. Call it in a template — `{{ formatNumber(total) }}` — and
 * it follows a change of the user's choice at once; `options` are
 * `Intl.NumberFormat`'s (`{ useGrouping: false }` for a year).
 */
export function injectFormatNumber(): ScFormatNumber {
  const locale = injectDisplayLocale();
  // One formatter per locale and options: a template calls it often.
  const formats = new Map<string, Intl.NumberFormat>();
  return (value, options) => {
    const key = locale() + JSON.stringify(options ?? {});
    let format = formats.get(key);
    if (!format) {
      format = new Intl.NumberFormat(locale(), options);
      formats.set(key, format);
    }
    return format.format(value);
  };
}
