import { ɵkeepDigitOrder } from './keep-digit-order';

/** What `formatDuration` writes: a Temporal duration, or its parts. */
export type ScFormatDurationValue =
  Temporal.Duration | Partial<Record<Intl.DurationFormatUnit, number>>;

/**
 * A duration as written, with `Intl.DurationFormat` — "1 hr, 30 min", or as
 * `options` say (`style: 'narrow'`: "3m 42s"; `'digital'`: "1:05:09").
 * Arabic-Indic digits in left-to-right text kept in order (`ɵkeepDigitOrder`).
 * `injectFormatDuration()` gives it the user's locale and digits.
 */
export function formatDuration(
  locale: string,
  value: ScFormatDurationValue,
  options?: Intl.DurationFormatOptions,
): string {
  const parts =
    value instanceof Temporal.Duration
      ? {
          years: value.years,
          months: value.months,
          weeks: value.weeks,
          days: value.days,
          hours: value.hours,
          minutes: value.minutes,
          seconds: value.seconds,
          milliseconds: value.milliseconds,
          microseconds: value.microseconds,
          nanoseconds: value.nanoseconds,
        }
      : value;
  return ɵkeepDigitOrder(
    locale,
    new Intl.DurationFormat(locale, options).format(parts),
  );
}
