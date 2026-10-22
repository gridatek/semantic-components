import { type Page, expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

const demo = (name: string) =>
  `/demos/date-range-picker-next/${name}-date-range-picker-next-demo`;
const trigger = (page: Page) =>
  page.locator('[data-slot="date-picker-trigger"]');
const calendar = (page: Page) => page.locator('[data-slot="calendar"]');
const day = (page: Page, date: string) =>
  page.locator(`[data-slot="calendar-cell"][data-date="${date}"]`);
const picked = (page: Page) => page.getByTestId('picked');

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = collectErrors(page);
  await page.clock.setFixedTime('2026-10-22T10:00:00');
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: one span; closed once whole, focus back', async ({ page }) => {
  await page.goto(demo('basic'));
  await trigger(page).click();
  await expect(page.getByRole('grid')).toHaveCount(2);
  await day(page, '2026-10-12').click();
  await expect(calendar(page)).toHaveCount(1);
  await day(page, '2026-10-18').click();
  await expect(calendar(page)).toHaveCount(0);
  await expect(trigger(page)).toBeFocused();
  await expect(picked(page)).toHaveText('Oct 12 – 18, 2026');
});

test('Presets: picked and closed; pressed while the value', async ({
  page,
}) => {
  await page.goto(demo('presets'));
  await trigger(page).click();
  await page.getByRole('button', { name: 'Last 7 days' }).click();
  await expect(calendar(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('Oct 16 – 22, 2026');
  await trigger(page).click();
  await expect(
    page.getByRole('button', { name: 'Last 7 days' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Today' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
});

test('Typed: each end; an end before the start marked', async ({ page }) => {
  await page.goto(demo('typed'));
  const start = page.getByLabel('Check-in');
  const end = page.getByLabel('Check-out');
  await expect(start).toHaveValue('10/14/2026');
  await expect(end).toHaveValue('10/18/2026');
  await end.fill('10/10/2026');
  await end.press('Enter');
  await expect(end).toHaveAttribute('aria-invalid', 'true');
  await expect(picked(page)).toHaveText('Oct 14 – 18, 2026');
  await end.fill('10/20/2026');
  await end.press('Enter');
  await expect(end).not.toHaveAttribute('aria-invalid');
  await expect(picked(page)).toHaveText('Oct 14 – 20, 2026');
  await start.fill('10/25/2026');
  await start.press('Enter');
  await expect(start).toHaveAttribute('aria-invalid', 'true');
  await start.fill('2026-10-16');
  await start.blur();
  await expect(picked(page)).toHaveText('Oct 16 – 20, 2026');
  await page.getByRole('button', { name: 'Choose dates' }).click();
  await expect(day(page, '2026-10-16')).toBeFocused();
});

test('Apply: a draft until applied; Cancel drops it', async ({ page }) => {
  await page.goto(demo('confirm'));
  await expect(picked(page)).toHaveText('Oct 16 – 22, 2026');
  const apply = page.getByRole('button', { name: 'Apply' });
  await trigger(page).click();
  await expect(apply).toBeEnabled();
  await day(page, '2026-10-01').click();
  await expect(apply).toBeDisabled();
  await day(page, '2026-10-05').click();
  await expect(calendar(page)).toHaveCount(1);
  await expect(picked(page)).toHaveText('Oct 16 – 22, 2026');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(calendar(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('Oct 16 – 22, 2026');
  // Dropped: open again on the value.
  await trigger(page).click();
  await expect(
    page.getByRole('button', { name: 'Last 7 days' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Last 30 days' }).click();
  await expect(calendar(page)).toHaveCount(1);
  await apply.click();
  await expect(calendar(page)).toHaveCount(0);
  await expect(trigger(page)).toBeFocused();
  await expect(picked(page)).toHaveText('Sep 23 – Oct 22, 2026');
});

test('Constraints: from today, 90 days ahead', async ({ page }) => {
  await page.goto(demo('constraints'));
  await trigger(page).click();
  await expect(day(page, '2026-10-21')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await expect(day(page, '2026-10-22')).not.toHaveAttribute('aria-disabled');
});

test('In a form: a whole range required; booked', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('alert')).toHaveText(
    'Pick your arrival and departure.',
  );
  await expect(trigger(page)).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('Stay').click();
  await day(page, '2026-10-28').click();
  await day(page, '2026-10-30').click();
  await expect(trigger(page)).not.toHaveAttribute('aria-invalid');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText(
    'Booked: Oct 28 – 30, 2026.',
  );
});
