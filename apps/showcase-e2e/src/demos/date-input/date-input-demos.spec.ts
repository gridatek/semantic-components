import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/date-input/${name}-demo`;
const part = (page: Page, name: string, nth = 0) =>
  page.getByRole('spinbutton', { name, exact: true }).nth(nth);
/** The Controlled demo's line: the value, as the app sees it. */
const said = (page: Page) => page.locator('[aria-live="polite"]');

test.describe('Usage', () => {
  test('a group named by its label; each part an input, a spin button named in words', async ({
    page,
  }) => {
    await page.goto(demo('date-input-usage'));
    await expect(page.getByRole('group', { name: 'Birthday' })).toBeVisible();
    const month = part(page, 'month');
    await expect(month).toHaveAttribute('inputmode', 'numeric');
    await expect(month).toHaveAttribute('data-empty', 'true');
    await expect(part(page, 'year')).toHaveAttribute('placeholder', '––––');
    const described = await month.getAttribute('aria-describedby');
    await expect(page.locator(`[id="${described}"]`)).toHaveText(
      'We send a card on the day.',
    );
  });
});

test('its label names the group, tied by `for` to its first part (a native input: WAVE reads it so); a click on the label focuses that part', async ({
  page,
}) => {
  await page.goto(demo('date-input-usage'));
  const label = page.locator('label[scLabel]', { hasText: 'Birthday' });
  await expect(page.getByRole('group', { name: 'Birthday' })).toBeVisible();
  expect(
    await label.evaluate(
      (l: HTMLLabelElement) => l.control?.getAttribute('data-type') ?? null,
    ),
  ).toBe('month');
  // The part keeps its own name.
  await expect(part(page, 'month')).toHaveAccessibleName(/month/i);
  await label.click();
  await expect(part(page, 'month')).toBeFocused();
});

test.describe('Controlled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('controlled-date-input'));
    await expect(said(page)).toHaveText('Due on 2026-11-02');
  });

  test('digits fill a part and move on once it is whole; the month by its name', async ({
    page,
  }) => {
    await part(page, 'month').focus();
    await page.keyboard.type('4');
    await expect(part(page, 'day')).toBeFocused();
    await expect(part(page, 'month')).toHaveAttribute(
      'aria-valuetext',
      'April',
    );
    await page.keyboard.type('15');
    await expect(part(page, 'year')).toBeFocused();
    await page.keyboard.type('2027');
    await expect(said(page)).toHaveText('Due on 2027-04-15');
  });

  test('a phone keyboard: text inserted without keys', async ({ page }) => {
    await part(page, 'day').focus();
    await page.keyboard.insertText('2');
    await page.keyboard.insertText('0');
    await expect(part(page, 'year')).toBeFocused();
    await expect(said(page)).toHaveText('Due on 2026-11-20');
    await expect(part(page, 'day')).toHaveValue('20');
  });

  test('a typed separator moves on; a short year is this century’s', async ({
    page,
  }) => {
    await part(page, 'day').focus();
    await page.keyboard.type('3/');
    await expect(part(page, 'year')).toBeFocused();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await expect(part(page, 'year')).toHaveValue('');
    await page.keyboard.type('27');
    await part(page, 'month').focus();
    await expect(said(page)).toHaveText('Due on 2027-11-03');
  });

  test('Backspace: a digit back, the part emptied (no value), then the part before', async ({
    page,
  }) => {
    const month = part(page, 'month');
    await month.focus();
    await page.keyboard.press('Backspace');
    await expect(month).toHaveValue('01');
    await page.keyboard.press('Backspace');
    await expect(month).toHaveValue('');
    await expect(said(page)).toHaveText('No due date.');
    // The month is the first part: nothing before it.
    await page.keyboard.press('Backspace');
    await expect(month).toBeFocused();
    await page.keyboard.type('12');
    await expect(said(page)).toHaveText('Due on 2026-12-02');
  });

  test('arrows step and wrap; Page Up / Down by 3 months, 7 days, 5 years; the day kept in its month', async ({
    page,
  }) => {
    const month = part(page, 'month');
    await month.focus();
    await page.keyboard.press('PageUp');
    await expect(said(page)).toHaveText('Due on 2026-02-02');
    await part(page, 'day').focus();
    await page.keyboard.press('End');
    await expect(said(page)).toHaveText('Due on 2026-02-28');
    await page.keyboard.press('ArrowUp');
    await expect(said(page)).toHaveText('Due on 2026-02-01');
    await page.keyboard.press('PageDown');
    await expect(said(page)).toHaveText('Due on 2026-02-22');
    await part(page, 'year').focus();
    await page.keyboard.press('PageUp');
    await expect(said(page)).toHaveText('Due on 2031-02-22');
  });

  test('a whole date pasted fills every part', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'Writing to the clipboard: Chromium only',
    );
    await page
      .context()
      .grantPermissions(['clipboard-read', 'clipboard-write']);
    for (const [text, expected] of [
      ['2027-01-15', 'Due on 2027-01-15'],
      ['3/4/2028', 'Due on 2028-03-04'],
    ]) {
      await page.evaluate((t) => navigator.clipboard.writeText(t), text);
      await part(page, 'day').focus();
      await page.keyboard.press('ControlOrMeta+V');
      await expect(said(page)).toHaveText(expected);
    }
  });

  test('clear() empties every part', async ({ page }) => {
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(said(page)).toHaveText('No due date.');
    for (const name of ['month', 'day', 'year'])
      await expect(part(page, name)).toHaveValue('');
  });
});

test('Min and max: a day outside them is marked invalid', async ({ page }) => {
  await page.goto(demo('limits-date-input'));
  const group = page.getByRole('group', { name: 'Check-in' });
  await expect(group).not.toHaveAttribute('data-invalid');
  await part(page, 'year').focus();
  await page.keyboard.press('ArrowUp');
  await expect(group).toHaveAttribute('data-invalid', 'true');
  await expect(part(page, 'day')).toHaveAttribute('aria-invalid', 'true');
});

test('Unavailable: a weekend is marked invalid', async ({ page }) => {
  await page.goto(demo('unavailable-date-input'));
  const group = page.getByRole('group', { name: 'Delivery date' });
  await expect(group).not.toHaveAttribute('data-invalid');
  await part(page, 'day').focus();
  await page.keyboard.type('07');
  await expect(group).toHaveAttribute('data-invalid', 'true');
});

test("Locale: the parts' order and separators are the locale's", async ({
  page,
}) => {
  await page.goto(demo('locale-date-input'));
  const order = (name: string) =>
    page
      .getByRole('group', { name, exact: true })
      .getByRole('spinbutton')
      .evaluateAll((inputs) =>
        inputs.map((input) => input.getAttribute('data-type')),
      );
  await expect.poll(() => order('Datum')).toEqual(['day', 'month', 'year']);
  await expect.poll(() => order('日付')).toEqual(['year', 'month', 'day']);
});

test('Disabled: out of the tab order', async ({ page }) => {
  await page.goto(demo('disabled-date-input'));
  await expect(page.getByRole('spinbutton')).toHaveCount(3);
  for (const input of await page.getByRole('spinbutton').all())
    await expect(input).toBeDisabled();
});

test('Read-only: focused and read, not changed', async ({ page }) => {
  await page.goto(demo('read-only-date-input'));
  const day = part(page, 'day');
  await day.focus();
  await expect(day).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await page.keyboard.type('5');
  await expect(day).toHaveValue('14');
});

test('Form: required and not in the past, from the schema', async ({
  page,
}) => {
  await page.goto(demo('form-date-input'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByText('Pick a date.')).toBeVisible();
  await part(page, 'month').focus();
  await page.keyboard.type('01012020');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByText('Pick a day from today on.')).toBeVisible();
  await part(page, 'year').focus();
  await page.keyboard.type('2099');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText('Booked for 2099-01-01.');
});

test('RTL: an Arabic date reads right to left; arrows as they show', async ({
  page,
}) => {
  await page.goto(demo('rtl-date-input'));
  const day = page.locator('[data-type=day]');
  const month = page.locator('[data-type=month]');
  const year = page.locator('[data-type=year]');
  await expect(day).toBeVisible();
  const left = async (locator: typeof day) =>
    (await locator.boundingBox())?.x ?? 0;
  // On screen, right to left: the day, the month, the year.
  expect(await left(year)).toBeLessThan(await left(month));
  expect(await left(month)).toBeLessThan(await left(day));
  await day.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(month).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(day).toBeFocused();
});
