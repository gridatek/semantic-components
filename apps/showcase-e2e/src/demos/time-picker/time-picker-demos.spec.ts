import { type Page, expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const demo = (name: string) => `/demos/time-picker/${name}-time-picker-demo`;
const trigger = (page: Page) =>
  page.locator('[data-slot="time-picker-trigger"]');
const list = (page: Page) => page.getByRole('listbox');
const picked = (page: Page) => page.getByTestId('picked');

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = collectErrors(page);
  await page.clock.setFixedTime('2026-10-22T10:07:00');
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: opens on the value; a pick closes, focus back', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await trigger(page).click();
  const ten = page.getByRole('option', { name: '10:00 AM' });
  await expect(ten).toBeFocused();
  await expect(ten).toHaveAttribute('aria-selected', 'true');
  await press(page, 'ArrowDown');
  await expect(page.getByRole('option', { name: '10:30 AM' })).toBeFocused();
  await press(page, 'Enter');
  await expect(list(page)).toHaveCount(0);
  await expect(trigger(page)).toBeFocused();
  await expect(picked(page)).toHaveText('10:30:00');
  // Escape: closed, the value kept.
  await trigger(page).click();
  await expect(page.getByRole('option', { name: '10:30 AM' })).toBeFocused();
  await press(page, 'Escape');
  await expect(list(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('10:30:00');
});

test('Interval and limits: every 15 minutes, from now', async ({ page }) => {
  await page.goto(demo('interval'));
  await trigger(page).click();
  await expect(page.getByRole('option')).toHaveCount(17);
  await expect(page.getByRole('option').first()).toHaveText('8:00 AM');
  await expect(page.getByRole('option', { name: '10:15 AM' })).toBeFocused();
  await page.getByRole('option', { name: '11:45 AM' }).click();
  await expect(list(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('11:45:00');
});

test('Locale: French, 24 hours', async ({ page }) => {
  await page.goto(demo('locale'));
  await page.getByRole('button', { name: 'Choisir une heure' }).click();
  await expect(page.getByRole('option', { name: '18:30' })).toBeFocused();
});

test('In a form: required; filled from the list', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('alert')).toHaveText('Pick a time.');
  await trigger(page).click();
  await page.getByRole('option', { name: '12:00 PM' }).click();
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText('Table booked at 12:00.');
});
