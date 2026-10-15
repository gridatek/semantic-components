import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const label = (date: Temporal.PlainDate) =>
  date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  Temporal.PlainDate.from({ year: 2000, month: i + 1, day: 1 }).toLocaleString(
    'en-US',
    { month: 'long' },
  ),
);

/** A day button's label ("January 31, 2026") as a date. */
const fromLabel = (text: string | null) => {
  const [, month, day, year] = text?.match(/^(\w+) (\d+), (\d+)$/) ?? [];
  return Temporal.PlainDate.from({
    year: Number(year),
    month: MONTHS.indexOf(month) + 1,
    day: Number(day),
  });
};

test.describe('Single Date Calendar Demo', () => {
  test('PageUp/PageDown change month, Shift for year, day clamped', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/calendar/single-date-calendar-demo');

    // Start on the last day of the shown month.
    const days = page.locator('[role=gridcell] button:not([data-outside])');
    const last = days.last();
    await last.focus();
    const start = fromLabel(await last.getAttribute('aria-label'));
    const focused = () =>
      page.evaluate(() => document.activeElement?.getAttribute('aria-label'));

    // Next month, same day clamped to its length (as Temporal adds months).
    await press(page, 'PageDown');
    const nextMonth = start.add({ months: 1 });
    await expect.poll(focused).toBe(label(nextMonth));

    await press(page, 'PageUp');
    const back = nextMonth.subtract({ months: 1 });
    await expect.poll(focused).toBe(label(back));

    await press(page, 'Shift+PageDown');
    await expect.poll(focused).toBe(label(back.add({ years: 1 })));
    expect(errors).toEqual([]);
  });
});
