import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const label = (date: Date) =>
  date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
    const start = new Date(`${await last.getAttribute('aria-label')}`);
    const focused = () =>
      page.evaluate(() => document.activeElement?.getAttribute('aria-label'));

    // Next month, same day clamped to its length.
    await press(page, 'PageDown');
    const nextMonthLast = new Date(
      start.getFullYear(),
      start.getMonth() + 2,
      0,
    );
    const expectedDay = Math.min(start.getDate(), nextMonthLast.getDate());
    await expect
      .poll(focused)
      .toBe(
        label(new Date(start.getFullYear(), start.getMonth() + 1, expectedDay)),
      );

    await press(page, 'PageUp');
    await expect
      .poll(focused)
      .toBe(
        label(new Date(start.getFullYear(), start.getMonth(), expectedDay)),
      );

    await press(page, 'Shift+PageDown');
    await expect
      .poll(focused)
      .toBe(
        label(new Date(start.getFullYear() + 1, start.getMonth(), expectedDay)),
      );
    expect(errors).toEqual([]);
  });
});
