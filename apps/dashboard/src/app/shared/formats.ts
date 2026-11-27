import {
  type ScFormatDateValue,
  injectDisplayLocale,
  injectFormatDate,
  injectFormatDuration,
  injectFormatNumber,
} from '@semantic-components/ui';

/**
 * The locale in use: `loadLocale()` set it before the app's code loaded
 * (Angular's `LOCALE_ID` reads the same).
 */
export const LOCALE = $localize.locale ?? 'en';

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
 * The dashboard's figures, as the library writes them: its formatters
 * (`injectFormatNumber()`, `injectFormatDate()`, `injectFormatDuration()`)
 * with the dashboard's choices — money in dollars, compact figures, a date
 * from the data's ISO text. The user's locale and digits, live, in order.
 * In a component: `private readonly f = injectFormats();`, then
 * `{{ f.money(total) }}`; data written outside a component takes `f`.
 */
export function injectFormats() {
  const formatNumber = injectFormatNumber();
  const formatDate = injectFormatDate();
  const formatDuration = injectFormatDuration();
  /** The locale shown in: `LOCALE`, in the user's numbering system. */
  const locale = injectDisplayLocale();

  /** A number: `Intl.NumberFormat`'s options. */
  function number(value: number, options?: Intl.NumberFormatOptions): string {
    return formatNumber(value, options);
  }

  /** A date or a time: `Intl.DateTimeFormat`'s options. */
  function date(
    value: ScFormatDateValue,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    return formatDate(value, options);
  }

  /** 2499 → $2,499.00 */
  function money(value: number): string {
    return number(value, { style: 'currency', currency: 'USD' });
  }

  /** 9125 → 9,125 */
  function count(value: number): string {
    return number(value);
  }

  /** 2026-06-14 → Jun 14, 2026 */
  function day(iso: string): string {
    return date(Temporal.PlainDate.from(iso.slice(0, 10)), {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  /** 2026-06-03T23:28 → Jun 3, 2026, 11:28 PM */
  function dayTime(iso: string): string {
    return date(Temporal.PlainDateTime.from(iso), {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  /** 12400 → 12.4K */
  function compact(value: number): string {
    return number(value, SHORT);
  }

  /** 0.128 → 12.8% */
  function percent(value: number): string {
    return number(value, { style: 'percent', maximumFractionDigits: 1 });
  }

  /** 0.22 → +22%, -0.05 → -5%: a change. */
  function change(value: number): string {
    return number(value, {
      style: 'percent',
      maximumFractionDigits: 1,
      signDisplay: 'exceptZero',
    });
  }

  /** { minutes: 3, seconds: 42 } → 3m 42s: a duration, narrow. */
  function duration(
    value: Partial<Record<Intl.DurationFormatUnit, number>>,
  ): string {
    return formatDuration(value, { style: 'narrow' });
  }

  /** 2026-05-05T09:30 → Tue, May 5, 9:30 AM */
  function weekdayTime(iso: string): string {
    return date(Temporal.PlainDateTime.from(iso), {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  /** 2499 → $2.5K */
  function compactMoney(value: number): string {
    return number(value, { ...SHORT, style: 'currency', currency: 'USD' });
  }

  /** 15 → 3 PM (15 h): an hour of the day, as the locale writes it. */
  function hour(value: number): string {
    return date(Temporal.PlainTime.from({ hour: value }), { hour: 'numeric' });
  }

  /** 19 → $19 */
  function wholeMoney(value: number): string {
    return number(value, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  }

  /** 74, 'gigabyte' → 74 GB */
  function unit(value: number, name: string): string {
    return number(value, { style: 'unit', unit: name });
  }

  /** 1200000 → 1.2 MB: a size in bytes, in its largest whole unit. */
  function bytes(value: number): string {
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
  function when(text: string): string {
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
  function weekday(index: number): string {
    // 2024-01-01 was a Monday.
    return date(Temporal.PlainDate.from('2024-01-01').add({ days: index }), {
      weekday: 'short',
    });
  }

  /** A month's name, January first: 0 → Jan (janv., يناير). */
  function month(index: number, width: 'short' | 'long' = 'short'): string {
    return date(
      Temporal.PlainDate.from({ year: 2024, month: index + 1, day: 1 }),
      {
        month: width,
      },
    );
  }

  /**
   * A chart's category written in English in the data — Mon, Jan, January,
   * Week 2 — in the reader's words (months short).
   */
  function axisLabel(text: string): string {
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
  function monthDay(text: string): string {
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
      Temporal.PlainDate.from({
        year: 2024,
        month: index + 1,
        day: +dayOfMonth,
      }),
      { month: 'short', day: 'numeric' },
    );
  }

  return {
    locale,
    date,
    money,
    count,
    day,
    dayTime,
    compact,
    percent,
    change,
    duration,
    weekdayTime,
    compactMoney,
    hour,
    wholeMoney,
    unit,
    bytes,
    when,
    weekday,
    month,
    axisLabel,
    monthDay,
  };
}

/** What `injectFormats()` gives. */
export type AppFormats = ReturnType<typeof injectFormats>;
