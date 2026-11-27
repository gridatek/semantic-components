import { expect, test } from '@playwright/test';
// The library's formatter itself, as a unit (`injectFormatDate()` gives it
// the user's locale and digits).
// eslint-disable-next-line @nx/enforce-module-boundaries
import { formatDate } from '../../../../packages/ui/src/lib/utils/numbering-system/format-date';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { formatDuration } from '../../../../packages/ui/src/lib/utils/numbering-system/format-duration';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ɵkeepDigitOrder } from '../../../../packages/ui/src/lib/utils/numbering-system/keep-digit-order';

/**
 * What a picker's value reads as, for the consumer's trigger:
 * `{{ formatDate(date()) || 'Pick a date' }}`. Plain logic: no page.
 */
const day = (iso: string) => Temporal.PlainDate.from(iso);

test('formatDate: nothing, a day, days, a range — in the locale and its digits', () => {
  expect(formatDate('en-US', null)).toBe('');
  expect(formatDate('en-US', [])).toBe('');
  expect(formatDate('en-US', { from: undefined, to: undefined })).toBe('');
  // A day: medium by default, or the options given.
  expect(formatDate('en-US', day('2026-10-12'))).toBe('Oct 12, 2026');
  expect(
    formatDate('en-US', day('2026-10-12'), {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
  ).toBe('Monday, October 12');
  // Days: in order, as a list.
  expect(
    formatDate('en-US', [
      day('2026-10-18'),
      day('2026-10-12'),
      day('2026-10-14'),
    ]),
  ).toBe('Oct 12, 2026, Oct 14, 2026, and Oct 18, 2026');
  // A range: one span (Intl's thin spaces round the dash); a start alone,
  // a day; typed ends out of order, the earlier first.
  expect(
    formatDate('en-US', { from: day('2026-10-12'), to: day('2026-10-18') }),
  ).toBe('Oct 12\u2009–\u200918, 2026');
  expect(formatDate('en-US', { from: day('2026-10-12'), to: undefined })).toBe(
    'Oct 12, 2026',
  );
  expect(
    formatDate('en-US', { from: day('2026-10-18'), to: day('2026-10-12') }),
  ).toBe('Oct 12\u2009–\u200918, 2026');
  // The user's digits, carried by the locale — kept in order in left-to-right
  // text (a mark after each run of Arabic-Indic digits).
  expect(formatDate('en-US-u-nu-arab', day('2026-10-12'))).toBe(
    'Oct ١٢\u200E, ٢٠٢٦\u200E',
  );
});

/**
 * Arabic-Indic digits (٠–٩) are "Arabic numbers" to the bidi algorithm: in
 * left-to-right text, what stands between two runs of them (", ", " – ",
 * " / ") is laid out right to left — "Nov ٢٧, ٢٠٢٦" drawn "Nov ٢٠٢٦ ,٢٧". A
 * left-to-right mark after each run keeps the order. Right-to-left text
 * needs none (Unicode's own patterns carry theirs), nor Persian digits
 * (European numbers to the algorithm), nor Latin.
 */
test('ɵkeepDigitOrder: a mark after each Arabic-Indic run, in left-to-right text only', () => {
  expect(ɵkeepDigitOrder('en-u-nu-arab', 'Nov ٢٧, ٢٠٢٦')).toBe(
    'Nov ٢٧\u200E, ٢٠٢٦\u200E',
  );
  expect(ɵkeepDigitOrder('en-u-nu-arab', '١:٢٣ / ٤:٥٦')).toBe(
    '١:٢٣\u200E / ٤:٥٦\u200E',
  );
  // Grouping and decimal separators are part of the run.
  expect(ɵkeepDigitOrder('fr-u-nu-arab', '١٬٢٣٤٫٥')).toBe('١٬٢٣٤٫٥\u200E');
  // Right to left, Persian digits, Latin digits: as they are.
  expect(ɵkeepDigitOrder('ar', '٢٧\u200F/١١\u200F/٢٠٢٦')).toBe(
    '٢٧\u200F/١١\u200F/٢٠٢٦',
  );
  expect(ɵkeepDigitOrder('fa', '۲۷ نوامبر ۲۰۲۶')).toBe('۲۷ نوامبر ۲۰۲۶');
  expect(ɵkeepDigitOrder('en-u-nu-arabext', 'Nov ۲۷, ۲۰۲۶')).toBe(
    'Nov ۲۷, ۲۰۲۶',
  );
  expect(ɵkeepDigitOrder('en', 'Nov 27, 2026')).toBe('Nov 27, 2026');
});

/** The marks out: what Intl wrote. */
const unmarked = (text: string) => text.replace(/\u200E/g, '');
const marks = (text: string) => (text.match(/\u200E/g) ?? []).length;

test('formatDate: a date with its time, a time, a zoned moment — Intl’s words, digits in order', () => {
  const at = Temporal.PlainDateTime.from('2026-06-03T23:28');
  const time = Temporal.PlainTime.from('09:30');
  const zoned = Temporal.ZonedDateTime.from('2026-06-03T23:28[Europe/Paris]');
  // Defaults: medium date and short time — or the options given.
  expect(formatDate('en-US', at)).toBe(
    at.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
  );
  expect(formatDate('en-US', time)).toBe(
    time.toLocaleString('en-US', { timeStyle: 'short' }),
  );
  expect(formatDate('en-US', zoned)).toBe(
    zoned.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
  );
  expect(formatDate('en-US', at, { weekday: 'short' })).toBe('Wed');
  // Arabic-Indic digits in English: a mark after each run — the day, the
  // year, the time.
  const arab = formatDate('en-US-u-nu-arab', at);
  expect(unmarked(arab)).toBe(
    at.toLocaleString('en-US-u-nu-arab', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  );
  expect(marks(arab)).toBe(3);
  // In Arabic, as Intl wrote it.
  expect(marks(formatDate('ar', at))).toBe(0);
});

test('formatDuration: Intl’s words for a duration, digits in order', () => {
  expect(formatDuration('en-US', { hours: 1, minutes: 30 })).toBe(
    new Intl.DurationFormat('en-US').format({ hours: 1, minutes: 30 }),
  );
  expect(
    formatDuration('en-US', { minutes: 3, seconds: 42 }, { style: 'narrow' }),
  ).toBe('3m 42s');
  // A Temporal duration too.
  expect(formatDuration('en-US', Temporal.Duration.from('PT1H30M'))).toBe(
    new Intl.DurationFormat('en-US').format({ hours: 1, minutes: 30 }),
  );
  // Digital, Arabic-Indic digits in English: one figure, one mark.
  const digital = formatDuration(
    'en-u-nu-arab',
    { hours: 1, minutes: 5, seconds: 9 },
    { style: 'digital' },
  );
  expect(unmarked(digital)).toBe('١:٠٥:٠٩');
  expect(marks(digital)).toBe(1);
});
