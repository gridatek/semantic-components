import type { ScCalendarValue } from '../../components/calendar/calendar';
import { ɵkeepDigitOrder } from './keep-digit-order';

/**
 * What `formatDate` writes: a calendar's value (a day, days, a range of
 * days), a date with its time, a time, or a moment in a time zone.
 */
export type ScFormatDateValue =
  | ScCalendarValue
  | Temporal.PlainDateTime
  | Temporal.PlainTime
  | Temporal.ZonedDateTime;

/**
 * A date or a time as written, with `Intl` — `options` say how, else: a day
 * `dateStyle: 'medium'`, a date with its time (or a zoned moment) the medium
 * date and the short time, a time `timeStyle: 'short'`; days as a list in
 * order, a range as one span (`formatRange`: "Oct 12 – 18, 2026"; a start
 * alone, a day) — nothing, `''`.
 * Arabic-Indic digits in left-to-right text kept in order (`ɵkeepDigitOrder`).
 * `injectFormatDate()` gives it the user's locale and digits.
 */
export function formatDate(
  locale: string,
  value: ScFormatDateValue,
  options?: Intl.DateTimeFormatOptions,
): string {
  return ɵkeepDigitOrder(locale, written(locale, value, options));
}

function written(
  locale: string,
  value: ScFormatDateValue,
  given: Intl.DateTimeFormatOptions | undefined,
): string {
  if (!value) return '';
  if (
    value instanceof Temporal.PlainDateTime ||
    value instanceof Temporal.ZonedDateTime
  )
    return value.toLocaleString(
      locale,
      given ?? { dateStyle: 'medium', timeStyle: 'short' },
    );
  if (value instanceof Temporal.PlainTime)
    return value.toLocaleString(locale, given ?? { timeStyle: 'short' });
  const options = given ?? { dateStyle: 'medium' };
  const format = new Intl.DateTimeFormat(locale, options);
  if (value instanceof Temporal.PlainDate) return format.format(value);
  if (Array.isArray(value)) {
    const days = [...(value as readonly Temporal.PlainDate[])].sort(
      Temporal.PlainDate.compare,
    );
    return new Intl.ListFormat(locale, { type: 'conjunction' }).format(
      days.map((day) => format.format(day)),
    );
  }
  const { from, to } = value as Exclude<
    ScCalendarValue,
    Temporal.PlainDate | readonly Temporal.PlainDate[] | null
  >;
  if (!from) return '';
  if (!to) return format.format(from);
  // Typed ends can be out of order (marked by the field): the earlier first.
  return Temporal.PlainDate.compare(from, to) <= 0
    ? format.formatRange(from, to)
    : format.formatRange(to, from);
}
