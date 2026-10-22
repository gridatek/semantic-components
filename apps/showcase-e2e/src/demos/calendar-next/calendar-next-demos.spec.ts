import { type Page, expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const demo = (name: string) =>
  `/demos/calendar-next/${name}-calendar-next-demo`;
const day = (page: Page, date: string) =>
  page.locator(`[data-slot="calendar-cell"][data-date="${date}"]`);
const focusedDate = (page: Page) =>
  page.evaluate(() => document.activeElement?.getAttribute('data-date'));
const picked = (page: Page) => page.getByTestId('picked');
const heading = (page: Page) =>
  page.locator('[data-slot="calendar"] [aria-live="polite"]');

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = collectErrors(page);
  // Thursday 22 October 2026: today.
  await page.clock.setFixedTime('2026-10-22T10:00:00');
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Single', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('single'));
  });

  test('a named grid; full day names; today and the picked marked', async ({
    page,
  }) => {
    const grid = page.getByRole('grid', { name: 'October 2026' });
    await expect(grid).toBeVisible();
    await expect(grid.getByRole('columnheader').first()).toHaveText(/Sunday/);
    await expect(day(page, '2026-10-22')).toHaveAttribute(
      'aria-current',
      'date',
    );
    await expect(day(page, '2026-10-14')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(day(page, '2026-10-14')).toContainText(
      'Wednesday, October 14, 2026',
    );
    // One Tab stop: the focused day.
    await expect(
      page.locator('[data-slot="calendar-cell"][tabindex="0"]'),
    ).toHaveCount(1);
  });

  test('the keys: days, weeks, its ends, months, years — across months', async ({
    page,
  }) => {
    await day(page, '2026-10-14').focus();
    await press(page, 'ArrowRight');
    expect(await focusedDate(page)).toBe('2026-10-15');
    await press(page, 'ArrowDown');
    expect(await focusedDate(page)).toBe('2026-10-22');
    await press(page, 'Home');
    expect(await focusedDate(page)).toBe('2026-10-18');
    await press(page, 'End');
    expect(await focusedDate(page)).toBe('2026-10-24');
    await press(page, 'PageDown');
    expect(await focusedDate(page)).toBe('2026-11-24');
    await expect(heading(page)).toHaveText('November 2026');
    await press(page, 'Shift+PageUp');
    expect(await focusedDate(page)).toBe('2025-11-24');
    // Across a month's end.
    await press(page, 'PageUp');
    await press(page, 'End');
    await press(page, 'ArrowDown');
    await press(page, 'ArrowDown');
    expect(await focusedDate(page)).toBe('2025-11-08');
    await expect(heading(page)).toHaveText('November 2025');
    await press(page, 'Enter');
    await expect(picked(page)).toHaveText('November 8, 2025');
  });

  test('a click picks; Today and Clear', async ({ page }) => {
    await day(page, '2026-10-20').click();
    await expect(picked(page)).toHaveText('October 20, 2026');
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(picked(page)).toHaveText('No day picked.');
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.getByRole('button', { name: 'Today' }).click();
    await expect(picked(page)).toHaveText('October 22, 2026');
    await expect(heading(page)).toHaveText('October 2026');
  });

  test('views: months, then years — picked back down', async ({ page }) => {
    await page.getByRole('button', { name: 'October 2026' }).click();
    const months = page.locator('[data-slot="calendar-cell-month"]');
    await expect(months).toHaveCount(12);
    await expect(heading(page)).toHaveText('2026');
    await page.getByRole('button', { name: '2026' }).click();
    await expect(heading(page)).toHaveText('2016 – 2027');
    await page.getByRole('button', { name: 'Next years' }).click();
    await page
      .locator('[data-slot="calendar-cell-year"]', { hasText: '2030' })
      .click();
    await expect(heading(page)).toHaveText('2030');
    // By keys: a month on, then its days.
    await press(page, 'ArrowRight');
    await press(page, 'Enter');
    await expect(heading(page)).toHaveText('November 2030');
    await expect(day(page, '2030-11-14')).toBeFocused();
  });

  test('right to left: ← is the next day', async ({ page }) => {
    await page.evaluate(() =>
      document.documentElement.setAttribute('dir', 'rtl'),
    );
    await day(page, '2026-10-14').focus();
    await press(page, 'ArrowLeft');
    expect(await focusedDate(page)).toBe('2026-10-15');
  });
});

test('Range: a preview to the pointer; picked backwards, swapped', async ({
  page,
}) => {
  await page.goto(demo('range'));
  await expect(page.getByRole('grid')).toHaveCount(2);
  await expect(day(page, '2026-10-14')).toHaveAttribute('data-range', 'middle');
  await day(page, '2026-10-20').click();
  await expect(picked(page)).toHaveText('From October 20, 2026…');
  await day(page, '2026-10-24').hover();
  await expect(day(page, '2026-10-22')).toHaveAttribute(
    'data-range',
    'preview',
  );
  await day(page, '2026-10-18').click();
  await expect(picked(page)).toHaveText('October 18, 2026 – October 20, 2026');
  await expect(day(page, '2026-10-18')).toHaveAttribute('data-range', 'start');
  await expect(day(page, '2026-10-20')).toHaveAttribute('data-range', 'end');
});

test('Multiple: each day on its own', async ({ page }) => {
  await page.goto(demo('multiple'));
  await expect(picked(page)).toHaveText('2 days: 5, 7');
  await day(page, '2026-10-12').click();
  await expect(picked(page)).toHaveText('3 days: 5, 7, 12');
  await day(page, '2026-10-05').click();
  await expect(picked(page)).toHaveText('2 days: 7, 12');
});

test('Min, max and unavailable: reached, not picked — in every view', async ({
  page,
}) => {
  await page.goto(demo('constraints'));
  await expect(day(page, '2026-10-07')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await expect(day(page, '2026-10-10')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await expect(day(page, '2026-10-09')).not.toHaveAttribute('aria-disabled');
  // The keys stop at min.
  await page.locator('[data-slot="calendar-cell"][tabindex="0"]').focus();
  await press(page, 'PageUp');
  await press(page, 'PageUp');
  expect(await focusedDate(page)).toBe('2026-10-08');
  // A weekend: focused, not picked.
  await press(page, 'ArrowRight');
  await press(page, 'ArrowRight');
  await press(page, 'Enter');
  await expect(day(page, '2026-10-10')).not.toHaveAttribute(
    'aria-selected',
    'true',
  );
  // Months before min, years after max.
  await page.getByRole('button', { name: 'October 2026' }).click();
  await expect(
    page.locator('[data-slot="calendar-cell-month"]', { hasText: 'Sep' }),
  ).toHaveAttribute('aria-disabled', 'true');
  await expect(
    page.locator('[data-slot="calendar-cell-month"]', { hasText: 'Nov' }),
  ).not.toHaveAttribute('aria-disabled');
  await page.getByRole('button', { name: '2026' }).click();
  await expect(
    page.locator('[data-slot="calendar-cell-year"]', { hasText: '2027' }),
  ).toHaveAttribute('aria-disabled', 'true');
});

test('In a form: required, then booked', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('alert')).toHaveText('Pick a day.');
  await expect(page.locator('[data-slot="calendar"]')).toHaveAttribute(
    'data-invalid',
  );
  await day(page, '2026-10-28').click();
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText('Booked: October 28, 2026');
});

test('Custom days: your content, said too', async ({ page }) => {
  await page.goto(demo('custom'));
  await expect(day(page, '2026-10-06')).toContainText(', 2 events');
  await expect(day(page, '2026-10-07')).not.toContainText('events');
});

test('Locale: French, Monday first, week numbers', async ({ page }) => {
  await page.goto(demo('locale'));
  const grid = page.getByRole('grid', { name: 'octobre 2026' });
  await expect(grid.getByRole('columnheader').first()).toHaveText(/lundi/);
  await expect(grid.getByRole('rowheader')).toHaveText([
    '40',
    '41',
    '42',
    '43',
    '44',
  ]);
  await expect(
    page.getByRole('button', { name: 'Mois suivant' }),
  ).toBeVisible();
});

test('Outside days: none shown; always six weeks', async ({ page }) => {
  await page.goto(demo('outside'));
  await expect(day(page, '2026-01-31')).toHaveCount(0);
  await expect(page.getByRole('grid').locator('tbody tr')).toHaveCount(6);
});
