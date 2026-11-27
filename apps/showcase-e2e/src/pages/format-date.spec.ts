import { expect, test } from '@playwright/test';
// The library's formatter itself, as a unit (`injectFormatDate()` gives it
// the user's locale and digits).
// eslint-disable-next-line @nx/enforce-module-boundaries
import { formatDate } from '../../../../packages/ui/src/lib/utils/numbering-system/format-date';

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
  // The user's digits, carried by the locale.
  expect(formatDate('en-US-u-nu-arab', day('2026-10-12'))).toBe('Oct ١٢, ٢٠٢٦');
});
