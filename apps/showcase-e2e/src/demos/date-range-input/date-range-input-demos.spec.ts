import { type Locator, type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/date-range-input/${name}-demo`;
/** The demos' line: the range, as the app sees it. */
const said = (page: Page) => page.locator('[aria-live="polite"]');
/** A date input's parts as they show, joined. */
const shown = (end: Locator) =>
  end
    .getByRole('spinbutton')
    .evaluateAll((parts) =>
      parts.map((part) => (part as HTMLInputElement).value).join('/'),
    );
const end = (page: Page, name: string) =>
  page.getByRole('group', { name, exact: true });

test.describe('Usage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('date-range-input-usage'));
    await expect(said(page)).toHaveText('2026-11-02 → 2026-11-06');
  });

  test('one group named by its label; each end a group named by you', async ({
    page,
  }) => {
    await expect(page.getByRole('group', { name: 'Stay' })).toBeVisible();
    await expect.poll(() => shown(end(page, 'Check-in'))).toBe('11/02/2026');
    await expect.poll(() => shown(end(page, 'Check-out'))).toBe('11/06/2026');
  });

  test('typed straight through: the start, then on into the end', async ({
    page,
  }) => {
    await end(page, 'Check-in').getByRole('spinbutton').first().focus();
    await page.keyboard.type('12012026');
    await expect(said(page)).toHaveText('2026-12-01 → 2026-11-06');
    await expect(
      end(page, 'Check-out').getByRole('spinbutton').first(),
    ).toBeFocused();
    await page.keyboard.type('12052026');
    await expect(said(page)).toHaveText('2026-12-01 → 2026-12-05');
  });

  test('Backspace on the end’s first empty part goes back into the start', async ({
    page,
  }) => {
    const month = end(page, 'Check-out').getByRole('spinbutton').first();
    await month.focus();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await expect(month).toHaveValue('');
    await page.keyboard.press('Backspace');
    await expect(
      end(page, 'Check-in').getByRole('spinbutton', { name: 'year' }),
    ).toBeFocused();
  });
});

test('Limits: an end on the wrong side, or on a closed day, marked', async ({
  page,
}) => {
  await page.goto(demo('limits-date-range-input'));
  const range = page.locator('[data-slot=date-range-input]');
  await expect(range).not.toHaveAttribute('data-invalid');
  const checkOut = end(page, 'Check-out');
  // Before the start.
  await checkOut.getByRole('spinbutton', { name: 'day' }).focus();
  await page.keyboard.type('01');
  await expect(range).toHaveAttribute('data-invalid', 'true');
  await expect(checkOut).toHaveAttribute('data-invalid', 'true');
  // A Monday.
  await checkOut.getByRole('spinbutton', { name: 'day' }).focus();
  await page.keyboard.type('09');
  await expect(checkOut).toHaveAttribute('data-invalid', 'true');
  await checkOut.getByRole('spinbutton', { name: 'day' }).focus();
  await page.keyboard.type('10');
  await expect(range).not.toHaveAttribute('data-invalid');
});

test('Locale: German, day first', async ({ page }) => {
  await page.goto(demo('locale-date-range-input'));
  await expect.poll(() => shown(end(page, 'Anreise'))).toBe('02/11/2026');
});

test('Disabled: both ends', async ({ page }) => {
  await page.goto(demo('disabled-date-range-input'));
  await expect(page.getByRole('spinbutton')).toHaveCount(6);
  for (const input of await page.getByRole('spinbutton').all())
    await expect(input).toBeDisabled();
});

test('Form: both ends, the end after the start — from the schema', async ({
  page,
}) => {
  await page.goto(demo('form-date-range-input'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByText('Pick both days.')).toBeVisible();
  await end(page, 'Check-in').getByRole('spinbutton').first().focus();
  await page.keyboard.type('1105202611032026');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByText('Check out after you check in.')).toBeVisible();
  await end(page, 'Check-out').getByRole('spinbutton', { name: 'day' }).focus();
  await page.keyboard.type('08');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText(
    'Booked: 2026-11-05 → 2026-11-08.',
  );
});

test('Controlled: clear() empties both ends', async ({ page }) => {
  await page.goto(demo('controlled-date-range-input'));
  await expect(said(page)).toHaveText('2026-11-02 → 2026-11-06');
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(said(page)).toHaveText('… → …');
  await expect.poll(() => shown(end(page, 'Check-in'))).toBe('//');
});

test('RTL: the start at the right', async ({ page }) => {
  await page.goto(demo('rtl-date-range-input'));
  const left = async (name: string) =>
    (await end(page, name).boundingBox())?.x ?? 0;
  await expect(end(page, 'الوصول')).toBeVisible();
  expect(await left('المغادرة')).toBeLessThan(await left('الوصول'));
});
