import type { Signal } from '@angular/core';
import {
  type ScFormatDate,
  type ScFormatDateValue,
  type ScFormatDuration,
  type ScFormatNumber,
  injectDisplayLocale,
  injectFormatDate,
  injectFormatDuration,
  injectFormatNumber,
} from '@semantic-components/ui';

/**
 * Formatting shared by the pages: numbers, dates and durations through the
 * library's formatters (`injectFormatNumber()`, `injectFormatDate()`,
 * `injectFormatDuration()`) — the reader's locale, their numbering system,
 * their digits in order — so the dashboard shows what the library writes.
 */

/**
 * The locale in use: `loadLocale()` set it before the app's code loaded
 * (Angular's `LOCALE_ID` reads the same).
 */
export const LOCALE = $localize.locale ?? 'en';

let library: {
  locale: Signal<string>;
  number: ScFormatNumber;
  date: ScFormatDate;
  duration: ScFormatDuration;
} | null = null;

/**
 * The library's formatters, taken once as the app starts — they need
 * Angular's injection, these helpers are plain functions:
 * `provideAppInitializer(useLibraryFormatting)`.
 */
export function useLibraryFormatting(): void {
  library = {
    locale: injectDisplayLocale(),
    number: injectFormatNumber(),
    date: injectFormatDate(),
    duration: injectFormatDuration(),
  };
}

function formatters(): NonNullable<typeof library> {
  if (!library)
    throw new Error('format.ts: provideAppInitializer(useLibraryFormatting)');
  return library;
}

/**
 * The locale numbers and dates are shown in: `LOCALE`, in the user's
 * numbering system (the library's `injectDisplayLocale()`). Read in a
 * template or a computed, it follows a change.
 */
export function displayLocale(): string {
  return formatters().locale();
}

/** A number, as the library writes it: `Intl.NumberFormat`'s options. */
function number(value: number, options?: Intl.NumberFormatOptions): string {
  return formatters().number(value, options);
}

/** A date or a time, as the library writes it: `Intl.DateTimeFormat`'s options. */
export function date(
  value: ScFormatDateValue,
  options?: Intl.DateTimeFormatOptions,
): string {
  return formatters().date(value, options);
}

/** 2499 → $2,499.00 */
export function money(value: number): string {
  return number(value, { style: 'currency', currency: 'USD' });
}

/** 9125 → 9,125 */
export function count(value: number): string {
  return number(value);
}

/** 2026-06-14 → Jun 14, 2026 */
export function day(iso: string): string {
  return date(Temporal.PlainDate.from(iso.slice(0, 10)), {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** 2026-06-03T23:28 → Jun 3, 2026, 11:28 PM */
export function dayTime(iso: string): string {
  return date(Temporal.PlainDateTime.from(iso), {
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

const SHORT: Intl.NumberFormatOptions = {
  notation: 'compact',
  maximumFractionDigits: 1,
};

/** 12400 → 12.4K */
export function compact(value: number): string {
  return number(value, SHORT);
}

/** 0.128 → 12.8% */
export function percent(value: number): string {
  return number(value, { style: 'percent', maximumFractionDigits: 1 });
}

/** 0.22 → +22%, -0.05 → -5%: a change. */
export function change(value: number): string {
  return number(value, {
    style: 'percent',
    maximumFractionDigits: 1,
    signDisplay: 'exceptZero',
  });
}

/** { minutes: 3, seconds: 42 } → 3m 42s: a duration, narrow. */
export function duration(
  value: Partial<Record<Intl.DurationFormatUnit, number>>,
): string {
  return formatters().duration(value, { style: 'narrow' });
}

/** 2026-05-05T09:30 → Tue, May 5, 9:30 AM */
export function weekdayTime(iso: string): string {
  return date(Temporal.PlainDateTime.from(iso), {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** 2499 → $2.5K */
export function compactMoney(value: number): string {
  return number(value, { ...SHORT, style: 'currency', currency: 'USD' });
}

/** 15 → 3 PM (15 h): an hour of the day, as the locale writes it. */
export function hour(value: number): string {
  return date(Temporal.PlainTime.from({ hour: value }), { hour: 'numeric' });
}

/** 19 → $19 */
export function wholeMoney(value: number): string {
  return number(value, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

/** 74, 'gigabyte' → 74 GB */
export function unit(value: number, name: string): string {
  return number(value, { style: 'unit', unit: name });
}

/** 1200000 → 1.2 MB: a size in bytes, in its largest whole unit. */
export function bytes(value: number): string {
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte'];
  let index = 0;
  while (value >= 1000 && index < units.length - 1) {
    value /= 1000;
    index++;
  }
  return number(value, {
    style: 'unit',
    unit: units[index],
    maximumFractionDigits: 1,
  });
}

/** A time written in the data — 09:16, Mon, Apr 24 — in the reader's words. */
export function when(text: string): string {
  if (/^\d{1,2}:\d{2}$/.test(text)) {
    return date(Temporal.PlainTime.from(text), {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  const written = monthDay(text);
  return written === text ? axisLabel(text) : written;
}

/** A weekday's short name, Monday first: 0 → Mon (lun., الاثنين). */
export function weekday(index: number): string {
  // 2024-01-01 was a Monday.
  return date(Temporal.PlainDate.from('2024-01-01').add({ days: index }), {
    weekday: 'short',
  });
}

/** A month's name, January first: 0 → Jan (janv., يناير). */
export function month(
  index: number,
  width: 'short' | 'long' = 'short',
): string {
  return date(
    Temporal.PlainDate.from({ year: 2024, month: index + 1, day: 1 }),
    {
      month: width,
    },
  );
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
  if (week)
    return $localize`:@@shared.format.week:Week ${count(+week[1])}:number:`;
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
  return date(
    Temporal.PlainDate.from({ year: 2024, month: index + 1, day: +dayOfMonth }),
    { month: 'short', day: 'numeric' },
  );
}
