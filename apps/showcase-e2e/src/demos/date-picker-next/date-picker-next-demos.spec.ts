import { type Page, expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const demo = (name: string) =>
  `/demos/date-picker-next/${name}-date-picker-next-demo`;
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

test('Basic: focus on the day; a pick closes, focus back', async ({ page }) => {
  await page.goto(demo('basic'));
  await expect(trigger(page)).toHaveAttribute('data-placeholder');
  await expect(trigger(page)).toHaveAttribute('aria-haspopup', 'dialog');
  await trigger(page).click();
  await expect(trigger(page)).toHaveAttribute('aria-expanded', 'true');
  await expect(day(page, '2026-10-22')).toBeFocused();
  await press(page, 'ArrowRight');
  await press(page, 'Enter');
  await expect(calendar(page)).toHaveCount(0);
  await expect(trigger(page)).toBeFocused();
  await expect(trigger(page)).toContainText('Oct 23, 2026');
  await expect(trigger(page)).not.toHaveAttribute('data-placeholder');
  // Escape: closed, the value kept.
  await trigger(page).click();
  await expect(day(page, '2026-10-23')).toBeFocused();
  await press(page, 'Escape');
  await expect(calendar(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('Oct 23, 2026');
});

test('Typed: the locale’s order or ISO; unreadable text marked', async ({
  page,
}) => {
  await page.goto(demo('typed'));
  const field = page.getByLabel('Start date');
  await field.fill('10/14/2026');
  await field.press('Enter');
  await expect(picked(page)).toHaveText('Oct 14, 2026');
  await field.fill('2026-11-02');
  await field.blur();
  await expect(picked(page)).toHaveText('Nov 2, 2026');
  await expect(field).toHaveValue('11/02/2026');
  // Not a day: marked, kept, the value as it was.
  await field.fill('13/45/2026');
  await field.press('Enter');
  await expect(field).toHaveAttribute('aria-invalid', 'true');
  await expect(field).toHaveValue('13/45/2026');
  await expect(picked(page)).toHaveText('Nov 2, 2026');
  await field.press('Backspace');
  await expect(field).not.toHaveAttribute('aria-invalid');
  // The calendar opens on the day.
  await page.getByRole('button', { name: 'Choose a date' }).click();
  await expect(day(page, '2026-11-02')).toBeFocused();
});

test('Date of birth: opens on the years; nothing after today', async ({
  page,
}) => {
  await page.goto(demo('birth'));
  await page.getByRole('button', { name: 'Choose your date of birth' }).click();
  const year = (y: number) =>
    page.locator('[data-slot="calendar-cell-year"]', { hasText: String(y) });
  await expect(year(2026)).toBeFocused();
  await expect(year(2027)).toHaveAttribute('aria-disabled', 'true');
  const years = page.locator('[data-slot="calendar-years"] [role="grid"]');
  while ((await year(2001).count()) === 0) {
    const shown = await years.getAttribute('aria-label');
    await page.getByRole('button', { name: 'Previous years' }).click();
    await expect(years).not.toHaveAttribute('aria-label', shown ?? '');
  }
  await year(2001).click();
  await page
    .locator('[data-slot="calendar-cell-month"]', { hasText: 'May' })
    .click();
  await day(page, '2001-05-14').click();
  await expect(calendar(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('May 14, 2001');
  await expect(page.getByLabel('Date of birth')).toHaveValue('05/14/2001');
});

test('Range: written as one span; closed once whole', async ({ page }) => {
  await page.goto(demo('range'));
  await trigger(page).click();
  await expect(page.getByRole('grid')).toHaveCount(2);
  await day(page, '2026-10-12').click();
  await expect(calendar(page)).toHaveCount(1);
  await day(page, '2026-10-18').click();
  await expect(calendar(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('Oct 12 – 18, 2026');
});

test('Multiple: a list; it stays open', async ({ page }) => {
  await page.goto(demo('multiple'));
  await trigger(page).click();
  await day(page, '2026-10-12').click();
  await day(page, '2026-10-05').click();
  await expect(calendar(page)).toHaveCount(1);
  await expect(picked(page)).toHaveText('Oct 5, 2026 and Oct 12, 2026');
});

test('Constraints: kept for typed days too', async ({ page }) => {
  await page.goto(demo('constraints'));
  const field = page.getByLabel('Delivery date');
  await field.fill('10/10/2026');
  await field.press('Enter');
  await expect(field).toHaveAttribute('aria-invalid', 'true');
  await field.fill('10/01/2026');
  await field.press('Enter');
  await expect(field).toHaveAttribute('aria-invalid', 'true');
  await field.fill('10/09/2026');
  await field.press('Enter');
  await expect(field).not.toHaveAttribute('aria-invalid');
  await expect(picked(page)).toHaveText('Oct 9, 2026');
  await page.getByRole('button', { name: 'Choose a delivery date' }).click();
  await expect(day(page, '2026-10-10')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
});

test('In a form: required; marked once closed; booked', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('alert')).toHaveText('Pick your arrival.');
  await expect(trigger(page)).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('Arrival').click();
  await day(page, '2026-10-28').click();
  await expect(trigger(page)).not.toHaveAttribute('aria-invalid');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText(
    'Booked from October 28, 2026.',
  );
});

test('Locale: French, typed day first', async ({ page }) => {
  await page.goto(demo('locale'));
  const field = page.getByLabel('Date d’arrivée');
  await expect(field).toHaveValue('14/10/2026');
  await expect(picked(page)).toHaveText('14 octobre 2026');
  await field.fill('02/11/2026');
  await field.press('Enter');
  await expect(picked(page)).toHaveText('2 novembre 2026');
  await page.getByRole('button', { name: 'Choisir une date' }).click();
  await expect(page.getByRole('grid', { name: 'novembre 2026' })).toBeVisible();
});
