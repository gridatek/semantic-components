/** Formatting shared by the pages: dates (Temporal) and money (Intl), in the reader's locale. */

/**
 * The locale in use: `loadLocale()` set it before the app's code loaded
 * (Angular's `LOCALE_ID` reads the same).
 */
export const LOCALE = $localize.locale ?? 'en';

const usd = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: 'USD',
});

const whole = new Intl.NumberFormat(LOCALE);

/** 2499 → $2,499.00 */
export function money(value: number): string {
  return usd.format(value);
}

/** 9125 → 9,125 */
export function count(value: number): string {
  return whole.format(value);
}

/** 2026-06-14 → Jun 14, 2026 */
export function day(iso: string): string {
  return Temporal.PlainDate.from(iso.slice(0, 10)).toLocaleString(LOCALE, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** 2026-06-03T23:28 → Jun 3, 2026, 11:28 PM */
export function dayTime(iso: string): string {
  return Temporal.PlainDateTime.from(iso).toLocaleString(LOCALE, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Today, as an ISO date. */
export function today(): string {
  return Temporal.Now.plainDateISO().toString();
}

/** Now, as an ISO date and time (minutes). */
export function now(): string {
  return Temporal.Now.plainDateTimeISO().toString().slice(0, 16);
}

/** A person's initials: Emily Carter → EC. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const short = new Intl.NumberFormat(LOCALE, {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const pct = new Intl.NumberFormat(LOCALE, {
  style: 'percent',
  maximumFractionDigits: 1,
});

/** 12400 → 12.4K */
export function compact(value: number): string {
  return short.format(value);
}

/** 0.128 → 12.8% */
export function percent(value: number): string {
  return pct.format(value);
}

/** 2499 → $2.5K */
export function compactMoney(value: number): string {
  return '$' + short.format(value);
}

/** A weekday's short name, Monday first: 0 → Mon (lun., الاثنين). */
export function weekday(index: number): string {
  // 2024-01-01 was a Monday.
  return Temporal.PlainDate.from('2024-01-01')
    .add({ days: index })
    .toLocaleString(LOCALE, { weekday: 'short' });
}

/** A month's name, January first: 0 → Jan (janv., يناير). */
export function month(
  index: number,
  width: 'short' | 'long' = 'short',
): string {
  return Temporal.PlainDate.from({
    year: 2024,
    month: index + 1,
    day: 1,
  }).toLocaleString(LOCALE, { month: width });
}

const SHORT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const LONG_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * A chart's category written in English in the data — Mon, Jan, January,
 * Week 2 — in the reader's words (months short).
 */
export function axisLabel(text: string): string {
  const day = SHORT_DAYS.indexOf(text);
  if (day >= 0) return weekday(day);
  const shortMonth = SHORT_MONTHS.indexOf(text);
  if (shortMonth >= 0) return month(shortMonth);
  const longMonth = LONG_MONTHS.indexOf(text);
  if (longMonth >= 0) return month(longMonth);
  const week = /^Week (\d+)$/.exec(text);
  if (week) return $localize`:@@shared.format.week:Week ${week[1]}:number:`;
  return text;
}

/** A day and month written 'Apr 14' in the data, in the reader's words. */
export function monthDay(text: string): string {
  const [name, dayOfMonth] = text.split(' ');
  const index = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ].indexOf(name);
  if (index < 0 || !dayOfMonth) return text;
  return Temporal.PlainDate.from({
    year: 2024,
    month: index + 1,
    day: +dayOfMonth,
  }).toLocaleString(LOCALE, { month: 'short', day: 'numeric' });
}
