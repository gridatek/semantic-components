import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/date-input/${name}-date-input-demo`;
const picked = (page: Page) => page.getByTestId('picked');

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = collectErrors(page);
  await page.clock.setFixedTime('2026-10-22T10:00:00');
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: the locale’s order or ISO; unreadable text marked', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const input = page.getByLabel('Start date');
  await input.fill('10/14/2026');
  await input.press('Enter');
  await expect(picked(page)).toHaveText('2026-10-14');
  await input.fill('2026-11-02');
  await input.blur();
  await expect(picked(page)).toHaveText('2026-11-02');
  await expect(input).toHaveValue('11/02/2026');
  // Not a day: marked, kept, the value as it was.
  await input.fill('02/30/2026');
  await input.press('Enter');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(input).toHaveValue('02/30/2026');
  await expect(picked(page)).toHaveText('2026-11-02');
  await input.press('Backspace');
  await expect(input).not.toHaveAttribute('aria-invalid');
  // Emptied: no date.
  await input.fill('');
  await input.press('Enter');
  await expect(picked(page)).toHaveText('No date.');
});

test('Locale: French, day first', async ({ page }) => {
  await page.goto(demo('locale'));
  const input = page.getByLabel('Date d’arrivée');
  await expect(input).toHaveValue('14/10/2026');
  await input.fill('02/11/26');
  await input.press('Enter');
  await expect(picked(page)).toHaveText('2026-11-02');
  await expect(input).toHaveValue('02/11/2026');
});

test('Limits: weekend and past days not read', async ({ page }) => {
  await page.goto(demo('limits'));
  const input = page.getByLabel('Delivery');
  await input.fill('10/24/2026');
  await input.press('Enter');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await input.fill('10/21/2026');
  await input.press('Enter');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(picked(page)).toHaveText('No date.');
  await input.fill('10/23/2026');
  await input.press('Enter');
  await expect(input).not.toHaveAttribute('aria-invalid');
  await expect(picked(page)).toHaveText('2026-10-23');
});

test('In a form: required; marked once left', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('alert')).toHaveText('Enter your date of birth.');
  const input = page.getByLabel('Date of birth');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await input.fill('05/14/2001');
  await input.press('Enter');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('status')).toHaveText('Born on 2001-05-14.');
});

test('Disabled: not edited', async ({ page }) => {
  await page.goto(demo('disabled'));
  const input = page.getByLabel('Issued');
  await expect(input).toBeDisabled();
  await expect(input).toHaveValue('03/01/2024');
});
