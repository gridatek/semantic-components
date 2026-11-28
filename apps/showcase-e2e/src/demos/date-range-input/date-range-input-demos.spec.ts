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

  test("its label, tied by `for` to the start's first part; a click on it focuses that part", async ({
    page,
  }) => {
    const label = page.locator('label[scLabel]', { hasText: 'Stay' });
    const first = end(page, 'Check-in').getByRole('spinbutton').first();
    expect(
      await label.evaluate((l: HTMLLabelElement) => l.control?.id ?? null),
    ).toBe(await first.getAttribute('id'));
    await expect(first).toHaveAttribute('id', /.+/);
    await label.click();
    await expect(first).toBeFocused();
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

test('In the docs on a phone (280px): the field shrinks to the width it has, both ends whole inside it', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto(demo('date-range-input-usage'));
  // The docs' frame on a phone: 40px a side (their margin and its padding).
  await page.addStyleTag({
    content: 'app-root { padding-inline: 40px !important; }',
  });
  const field = page.locator('[scField]');
  await expect(field).toBeVisible();
  // Not cut by the frame: into its 16px padding at most (as the phone test),
  // a few pixels there where text renders wider (Linux, Android).
  const f = await field.boundingBox();
  expect(f?.x).toBeGreaterThanOrEqual(24 - 0.5);
  expect((f?.x ?? 0) + (f?.width ?? 0)).toBeLessThanOrEqual(360 - 24 + 0.5);
  // Its ends: none cut by the field.
  const range = await page.locator('[scDateRangeInput]').boundingBox();
  expect((range?.x ?? 0) + (range?.width ?? 0)).toBeLessThanOrEqual(
    (f?.x ?? 0) + (f?.width ?? 0) + 0.5,
  );
});

test('Controlled, in the docs on a phone (280px): the field and Clear inside the frame, both dates inside the field', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto(demo('controlled-date-range-input'));
  // The docs' frame on a phone: 40px a side (their margin and its padding).
  await page.addStyleTag({
    content: 'app-root { padding-inline: 40px !important; }',
  });
  const range = page.locator('[scDateRangeInput]');
  await expect(range).toBeVisible();
  const right = async (locator: Locator) => {
    const box = await locator.boundingBox();
    return (box?.x ?? 0) + (box?.width ?? 0);
  };
  // Not cut by the frame (into its 16px padding at most).
  for (const part of [range, page.getByRole('button', { name: 'Clear' })])
    expect(await right(part)).toBeLessThanOrEqual(360 - 24 + 0.5);
  // No room beside the field: Clear under it, not squeezing it (text a few
  // pixels wider on Linux and Android would push the row out of the frame).
  const field = await page.locator('[scField]').boundingBox();
  const clear = await page.getByRole('button', { name: 'Clear' }).boundingBox();
  expect(clear?.y).toBeGreaterThanOrEqual(
    (field?.y ?? 0) + (field?.height ?? 0) - 0.5,
  );
  // The dates inside the field's own box, the second one too.
  expect(await right(page.locator('[scDateInput]').last())).toBeLessThanOrEqual(
    (await right(range)) + 0.5,
  );
});
