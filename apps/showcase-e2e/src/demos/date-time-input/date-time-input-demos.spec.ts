import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/date-time-input/${name}-demo`;
const part = (page: Page, name: string, nth = 0) =>
  page.getByRole('spinbutton', { name, exact: true }).nth(nth);
/** The Controlled demo's line: the value, as the app sees it. */
const said = (page: Page) => page.locator('[aria-live="polite"]');

test('Usage: a group named by its label; date and time parts in the locale’s order', async ({
  page,
}) => {
  await page.goto(demo('date-time-input-usage'));
  const group = page.getByRole('group', { name: 'Departure' });
  await expect(group.getByRole('spinbutton')).toHaveCount(6);
  await expect
    .poll(() =>
      group
        .getByRole('spinbutton')
        .evaluateAll((parts) => parts.map((p) => p.getAttribute('data-type'))),
    )
    .toEqual(['month', 'day', 'year', 'hour', 'minute', 'dayPeriod']);
  await expect(part(page, 'hour')).toHaveValue('2');
  await expect(part(page, 'AM/PM')).toHaveValue('PM');
});

test.describe('Controlled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('controlled-date-time-input'));
    await expect(said(page)).toHaveText('Reminder at 2026-11-02T07:45');
  });

  test('typed straight through: date, then time, then AM/PM', async ({
    page,
  }) => {
    await part(page, 'month').focus();
    await page.keyboard.type('12252026');
    await expect(part(page, 'hour')).toBeFocused();
    await page.keyboard.type('0930p');
    await expect(said(page)).toHaveText('Reminder at 2026-12-25T21:30');
  });

  test('Backspace from the hour goes back to the year; the value empties', async ({
    page,
  }) => {
    const hour = part(page, 'hour');
    await hour.focus();
    await page.keyboard.press('Backspace');
    await expect(hour).toHaveValue('');
    await expect(said(page)).toHaveText('No reminder.');
    await page.keyboard.press('Backspace');
    await expect(part(page, 'year')).toBeFocused();
  });

  test('arrows: the day kept within its month; Page Up on the minutes by 15', async ({
    page,
  }) => {
    await part(page, 'day').focus();
    await page.keyboard.press('End');
    await expect(said(page)).toHaveText('Reminder at 2026-11-30T07:45');
    await part(page, 'month').focus();
    await page.keyboard.press('PageUp');
    await expect(said(page)).toHaveText('Reminder at 2026-02-28T07:45');
    await part(page, 'minute').focus();
    await page.keyboard.press('PageUp');
    await expect(said(page)).toHaveText('Reminder at 2026-02-28T07:00');
  });

  test('a whole value pasted fills every part', async ({
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
    await page.evaluate(() =>
      navigator.clipboard.writeText('2027-01-15T18:20'),
    );
    await part(page, 'day').focus();
    await page.keyboard.press('ControlOrMeta+V');
    await expect(said(page)).toHaveText('Reminder at 2027-01-15T18:20');
  });

  test('clear() empties every part', async ({ page }) => {
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(said(page)).toHaveText('No reminder.');
    await expect(part(page, 'year')).toHaveValue('');
    await expect(part(page, 'hour')).toHaveValue('');
  });
});

test('Hour cycle: seconds on 24 hours; a padded hour on 12', async ({
  page,
}) => {
  await page.goto(demo('hour-cycle-date-time-input'));
  const seconds = page.getByRole('group', { name: '24 hours, with seconds' });
  await expect(seconds.getByRole('spinbutton', { name: 'second' })).toHaveValue(
    '30',
  );
  await expect(seconds.getByRole('spinbutton', { name: 'AM/PM' })).toHaveCount(
    0,
  );
  const twelve = page.getByRole('group', { name: '12 hours, two-digit hour' });
  await expect(twelve.getByRole('spinbutton', { name: 'hour' })).toHaveValue(
    '09',
  );
});

test('Limits: before the first, or on a Sunday, marked invalid', async ({
  page,
}) => {
  await page.goto(demo('limits-date-time-input'));
  const group = page.getByRole('group', { name: 'Pickup' });
  await expect(group).not.toHaveAttribute('data-invalid');
  await part(page, 'day').focus();
  await page.keyboard.type('08');
  await expect(group).toHaveAttribute('data-invalid', 'true');
  await part(page, 'day').focus();
  await page.keyboard.type('02');
  await expect(group).not.toHaveAttribute('data-invalid');
  await part(page, 'hour').focus();
  await page.keyboard.type('8');
  await expect(group).toHaveAttribute('data-invalid', 'true');
});

test("Locale: the parts' order is the locale's", async ({ page }) => {
  await page.goto(demo('locale-date-time-input'));
  const order = (name: string) =>
    page
      .getByRole('group', { name, exact: true })
      .getByRole('spinbutton')
      .evaluateAll((parts) => parts.map((p) => p.getAttribute('data-type')));
  await expect
    .poll(() => order('Abfahrt'))
    .toEqual(['day', 'month', 'year', 'hour', 'minute']);
  await expect
    .poll(() => order('출발'))
    .toEqual(['year', 'month', 'day', 'dayPeriod', 'hour', 'minute']);
});

test('Disabled and read-only', async ({ page }) => {
  await page.goto(demo('disabled-date-time-input'));
  await expect(page.getByRole('spinbutton')).toHaveCount(6);
  for (const input of await page.getByRole('spinbutton').all())
    await expect(input).toBeDisabled();
  await page.goto(demo('read-only-date-time-input'));
  const minute = part(page, 'minute');
  await minute.focus();
  await page.keyboard.press('ArrowUp');
  await expect(minute).toHaveValue('05');
});

test('Form: required and not in the past', async ({ page }) => {
  await page.goto(demo('form-date-time-input'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByText('Pick a date and time.')).toBeVisible();
  await part(page, 'month').focus();
  await page.keyboard.type('010120201000a');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByText('Pick a time from now on.')).toBeVisible();
  await part(page, 'year').focus();
  await page.keyboard.type('2099');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText(
    'Booked for 2099-01-01T10:00.',
  );
});

test('RTL: the Arabic date right to left, the clock left to right', async ({
  page,
}) => {
  await page.goto(demo('rtl-date-time-input'));
  const at = (type: string) =>
    page
      .locator(`[data-type=${type}]`)
      .boundingBox()
      .then((b) => b?.x ?? 0);
  await expect(page.locator('[data-type=day]')).toBeVisible();
  // The date: the day at the right.
  expect(await at('year')).toBeLessThan(await at('month'));
  expect(await at('month')).toBeLessThan(await at('day'));
  // The clock: the hour before the minute, left to right.
  expect(await at('hour')).toBeLessThan(await at('minute'));
});
