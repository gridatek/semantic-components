import { LOCALE_ID, type Signal, computed, inject } from '@angular/core';
import {
  definePreference,
  injectPreference,
} from '../../components/preferences/preference';
import { ɵHOUR_CYCLE } from '../hour-cycle/hour-cycle';
import { type ScFormatDateValue, formatDate } from './format-date';
import { type ScFormatDurationValue, formatDuration } from './format-duration';
import { ɵkeepDigitOrder } from './keep-digit-order';

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
  storageKeyName: 'numberingSystem',
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
 * The locale to show with: `LOCALE_ID`, in the user's numbering system and
 * on their clock once they chose them (`en-u-hc-h23-nu-arab`) — what the
 * parts format with. Give it to
 * `Intl` or `toLocaleString` for your own dates and times
 * (`date.toLocaleString(locale(), { dateStyle: 'long' })`), so they read as
 * the parts' do. For what is shown only: values and parsing stay `latn`.
 */
export function injectDisplayLocale(): Signal<string> {
  const locale = inject(LOCALE_ID);
  const chosen = injectPreference(ɵNUMBERING_SYSTEM).value;
  const clock = injectPreference(ɵHOUR_CYCLE).value;
  return computed(() => {
    const numberingSystem = chosen();
    const hourCycle = clock();
    return numberingSystem || hourCycle
      ? new Intl.Locale(locale, {
          ...(numberingSystem ? { numberingSystem } : {}),
          ...(hourCycle ? { hourCycle } : {}),
        }).toString()
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
    // Arabic-Indic digits in left-to-right text: kept in order.
    return ɵkeepDigitOrder(locale(), format.format(value));
  };
}

export type { ScFormatDateValue } from './format-date';
export type { ScFormatDurationValue } from './format-duration';

/** Writes a date or a time as shown: `Intl.DateTimeFormat`'s options. */
export type ScFormatDate = (
  value: ScFormatDateValue,
  options?: Intl.DateTimeFormatOptions,
) => string;

/**
 * A date or a time as written — in the user's numbering system, live: a
 * picker's value for your trigger (`{{ formatDate(date()) || 'Pick a date' }}`),
 * or any Temporal date, date-time, time or zoned moment. A day
 * `dateStyle: 'medium'` unless `options` say (a date-time: with the short
 * time; a time: `timeStyle: 'short'`), days as a list in order, a range as
 * one span ("Oct 12 – 18, 2026") — nothing, `''`. Your own format: your
 * options, or your own function instead.
 */
export function injectFormatDate(): ScFormatDate {
  const locale = injectDisplayLocale();
  return (value, options) => formatDate(locale(), value, options);
}

/** Writes a duration as shown: `Intl.DurationFormat`'s options. */
export type ScFormatDuration = (
  value: ScFormatDurationValue,
  options?: Intl.DurationFormatOptions,
) => string;

/**
 * A duration as written — in the user's numbering system, live:
 * `{{ formatDuration({ minutes: 3, seconds: 42 }, { style: 'narrow' }) }}`
 * ("3m 42s"), or a Temporal duration. `Intl.DurationFormat`'s options;
 * "1 hr, 30 min" by default.
 */
export function injectFormatDuration(): ScFormatDuration {
  const locale = injectDisplayLocale();
  return (value, options) => formatDuration(locale(), value, options);
}
