import { LOCALE_ID, type Signal, computed, inject } from '@angular/core';
import {
  definePreference,
  injectPreference,
} from '../../components/preferences/preference';

/**
 * A week's first day, as Unicode names it — `Intl.Locale`'s
 * `firstDayOfWeek`, the locale tag's `fw` key (`ar-u-fw-sun`): `'mon'` …
 * `'sun'`. A name, not a number: `1` was Monday here and Sunday elsewhere.
 */
export type ScFirstDayOfWeek =
  'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

/** The days, Monday first, as Temporal counts them (`dayOfWeek` 1 – 7). */
export const SC_DAYS_OF_WEEK: readonly ScFirstDayOfWeek[] = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
];

/**
 * The week's first day as Temporal counts it, 1 (Monday) – 7 (Sunday): the
 * one given, else the locale's (`Intl.Locale` week info), else Sunday where
 * the browser has none (Firefox) — as `en-US`, Angular's default locale.
 */
export function ɵweekStart(
  locale: string,
  given: ScFirstDayOfWeek | undefined,
): number {
  if (given) return SC_DAYS_OF_WEEK.indexOf(given) + 1;
  const info = new Intl.Locale(locale) as Intl.Locale & {
    getWeekInfo?: () => { firstDay: number };
    weekInfo?: { firstDay: number };
  };
  return info.getWeekInfo?.().firstDay ?? info.weekInfo?.firstDay ?? 7;
}

/**
 * @internal The day the user chose, kept (`sc-first-day-of-week`, a cookie
 * the server reads); nothing kept until they choose, so the locale's day
 * follows the language meanwhile. Apps use `injectFirstDayOfWeek()`.
 */
export const ɵFIRST_DAY_OF_WEEK = definePreference({
  attribute: 'data-first-day-of-week',
  values: SC_DAYS_OF_WEEK,
  storageKey: 'sc-first-day-of-week',
  global: true,
});

/** @internal The user's day, or undefined: not chosen yet. */
export function ɵchosenFirstDayOfWeek(): Signal<ScFirstDayOfWeek | undefined> {
  return injectPreference(ɵFIRST_DAY_OF_WEEK).value;
}

/** The user's first day of the week: always a day. */
export interface ScFirstDayOfWeekPreference {
  /** The day the user chose, else the locale's. */
  readonly value: Signal<ScFirstDayOfWeek>;
  /** Chosen: kept, and every calendar, picker and scheduler follows it. */
  set(day: ScFirstDayOfWeek): void;
}

/**
 * The user's first day of the week, for your settings: `value()` is always a
 * day — the one they chose, else the locale's — and `set()` keeps their
 * choice. The parts take, in order: the user's choice, then their own
 * `firstDayOfWeek`, then the locale's (with the app's, set on its i18n
 * locale), then Sunday.
 */
export function injectFirstDayOfWeek(): ScFirstDayOfWeekPreference {
  const preference = injectPreference(ɵFIRST_DAY_OF_WEEK);
  const locale = inject(LOCALE_ID);
  return {
    value: computed(
      () =>
        preference.value() ??
        SC_DAYS_OF_WEEK[ɵweekStart(locale, undefined) - 1],
    ),
    set: (day) => preference.set(day),
  };
}
