/**
 * A week's first day, as Unicode names it — `Intl.Locale`'s
 * `firstDayOfWeek`, the locale tag's `fw` key (`ar-u-fw-sun`): `'mon'` …
 * `'sun'`. A name, not a number: `1` was Monday here and Sunday elsewhere.
 */
export type ScFirstDayOfWeek =
  'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

/** Monday first, as Temporal counts (`dayOfWeek`: 1 Monday – 7 Sunday). */
const DAYS: readonly ScFirstDayOfWeek[] = [
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
 * one given, else the locale's (`Intl.Locale` week info), else `fallback`
 * where the browser has none.
 */
export function ɵweekStart(
  locale: string,
  given: ScFirstDayOfWeek | undefined,
  fallback: number,
): number {
  if (given) return DAYS.indexOf(given) + 1;
  const info = new Intl.Locale(locale) as Intl.Locale & {
    getWeekInfo?: () => { firstDay: number };
    weekInfo?: { firstDay: number };
  };
  return info.getWeekInfo?.().firstDay ?? info.weekInfo?.firstDay ?? fallback;
}
