import { type Page, expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const demo = (name: string) => `/demos/time-input/${name}-time-input-demo`;
const part = (page: Page, name: string) =>
  page.getByRole('spinbutton', { name, exact: true });
const picked = (page: Page) => page.getByTestId('picked');

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = collectErrors(page);
  await page.clock.setFixedTime('2026-10-22T10:07:00');
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: typed part by part, arrows, Backspace', async ({ page }) => {
  await page.goto(demo('basic'));
  await expect(page.getByRole('group', { name: 'Start time' })).toBeVisible();
  await expect(part(page, 'hour')).toHaveText('––');
  await part(page, 'hour').focus();
  await press(page, '9');
  await expect(part(page, 'minute')).toBeFocused();
  await press(page, '3');
  await press(page, '0');
  await expect(part(page, 'AM/PM')).toBeFocused();
  await expect(picked(page)).toHaveText('No time.');
  await press(page, 'p');
  await expect(picked(page)).toHaveText('21:30:00');
  await expect(part(page, 'hour')).toHaveAttribute('aria-valuenow', '9');
  await part(page, 'hour').focus();
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('22:30:00');
  await part(page, 'minute').focus();
  await press(page, 'Backspace');
  await expect(part(page, 'minute')).toHaveText('––');
  await expect(picked(page)).toHaveText('No time.');
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('22:07:00');
});

test('Locale: French, 24 hours', async ({ page }) => {
  await page.goto(demo('locale'));
  await expect(page.getByRole('spinbutton')).toHaveCount(2);
  await expect(part(page, 'heure')).toHaveText('14');
  await part(page, 'heure').focus();
  await press(page, '0');
  await press(page, '8');
  await expect(picked(page)).toHaveText('08:30:00');
});

test('Seconds: a third part', async ({ page }) => {
  await page.goto(demo('seconds'));
  await expect(page.getByRole('spinbutton')).toHaveCount(4);
  await part(page, 'second').focus();
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('09:05:31');
});

test('Step and limits: 15 minutes; outside marked', async ({ page }) => {
  await page.goto(demo('limits'));
  await part(page, 'minute').focus();
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('09:15:00');
  await part(page, 'hour').focus();
  await press(page, 'ArrowDown');
  await expect(picked(page)).toHaveText('08:15:00');
  await expect(part(page, 'hour')).toHaveAttribute('aria-invalid', 'true');
});

test('In a form: required until whole', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Set' }).click();
  await expect(page.getByRole('alert')).toHaveText('Set a time.');
  await part(page, 'hour').focus();
  await press(page, '7');
  await press(page, '4');
  await press(page, '5');
  await press(page, 'a');
  await page.getByRole('button', { name: 'Set' }).click();
  await expect(page.getByRole('status')).toHaveText('Alarm set for 07:45.');
});

test('Disabled: out of the tab order', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(part(page, 'hour')).toHaveAttribute('tabindex', '-1');
  await expect(part(page, 'hour')).toHaveAttribute('aria-disabled', 'true');
});
