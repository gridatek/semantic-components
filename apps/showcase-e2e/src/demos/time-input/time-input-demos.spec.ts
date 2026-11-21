import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/time-input/${name}-demo`;
const part = (page: Page, name: string, nth = 0) =>
  page.getByRole('spinbutton', { name, exact: true }).nth(nth);
/** The Controlled demo's line: the value, as the app sees it. */
const said = (page: Page) => page.locator('[aria-live="polite"]');

test.describe('Usage', () => {
  test('a group named by its label; each part an input, a spin button named in words', async ({
    page,
  }) => {
    await page.goto(demo('time-input-usage'));
    await expect(
      page.getByRole('group', { name: 'Meeting time' }),
    ).toBeVisible();
    const hour = part(page, 'hour');
    await expect(hour).toHaveValue('9');
    await expect(hour).toHaveAttribute('inputmode', 'numeric');
    await expect(hour).toHaveAttribute('aria-valuemin', '1');
    await expect(hour).toHaveAttribute('aria-valuemax', '12');
    await expect(part(page, 'minute')).toHaveAttribute('aria-valuenow', '30');
    await expect(part(page, 'AM/PM')).toHaveValue('AM');
    // The field's description, read with each part.
    const described = await hour.getAttribute('aria-describedby');
    await expect(page.locator(`[id="${described}"]`)).toHaveText(
      'In your local time.',
    );
  });
});

test.describe('Controlled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('controlled-time-input'));
    await expect(said(page)).toHaveText('Reminder at 07:45');
  });

  test('digits fill a part and move on once it is whole; a/p sets AM/PM', async ({
    page,
  }) => {
    await part(page, 'hour').focus();
    await page.keyboard.type('11');
    await expect(part(page, 'minute')).toBeFocused();
    await page.keyboard.type('05');
    await expect(part(page, 'AM/PM')).toBeFocused();
    await page.keyboard.type('p');
    await expect(said(page)).toHaveText('Reminder at 23:05');
    // 9: no hour can follow it — on at once.
    await part(page, 'hour').focus();
    await page.keyboard.type('9');
    await expect(part(page, 'minute')).toBeFocused();
    await expect(said(page)).toHaveText('Reminder at 21:05');
  });

  test('a phone keyboard: text inserted without keys', async ({ page }) => {
    await part(page, 'hour').focus();
    await page.keyboard.insertText('1');
    await page.keyboard.insertText('0');
    await expect(part(page, 'minute')).toBeFocused();
    await expect(said(page)).toHaveText('Reminder at 10:45');
    // The input shows the part, never the raw text typed.
    await expect(part(page, 'hour')).toHaveValue('10');
  });

  test('a typed separator moves on', async ({ page }) => {
    await part(page, 'hour').focus();
    await page.keyboard.type('1:');
    await expect(part(page, 'minute')).toBeFocused();
    await expect(said(page)).toHaveText('Reminder at 01:45');
  });

  test('Backspace: a digit back, the part emptied (no value), then the part before', async ({
    page,
  }) => {
    const minute = part(page, 'minute');
    await minute.focus();
    await page.keyboard.press('Backspace');
    await expect(minute).toHaveValue('04');
    await page.keyboard.press('Backspace');
    await expect(minute).toHaveValue('');
    await expect(minute).toHaveAttribute('data-empty', 'true');
    await expect(said(page)).toHaveText('No reminder.');
    await page.keyboard.press('Backspace');
    await expect(part(page, 'hour')).toBeFocused();
    // The other parts kept: one minute typed, the time is back.
    await minute.focus();
    await page.keyboard.type('50');
    await expect(said(page)).toHaveText('Reminder at 07:50');
  });

  test('arrows step and wrap; Page Up / Down by 15 on its multiples; Home / End', async ({
    page,
  }) => {
    const minute = part(page, 'minute');
    await minute.focus();
    await page.keyboard.press('PageUp');
    await expect(minute).toHaveValue('00');
    await page.keyboard.press('ArrowDown');
    await expect(minute).toHaveValue('59');
    await page.keyboard.press('PageDown');
    await expect(minute).toHaveValue('45');
    await page.keyboard.press('Home');
    await expect(minute).toHaveValue('00');
    await page.keyboard.press('End');
    await expect(minute).toHaveValue('59');
    await part(page, 'AM/PM').focus();
    await page.keyboard.press('ArrowUp');
    await expect(said(page)).toHaveText('Reminder at 19:59');
  });

  test('a whole time pasted fills every part', async ({
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
      ['14:30', 'Reminder at 14:30'],
      ['2:05 pm', 'Reminder at 14:05'],
    ]) {
      await page.evaluate((t) => navigator.clipboard.writeText(t), text);
      await part(page, 'hour').focus();
      await page.keyboard.press('ControlOrMeta+V');
      await expect(said(page)).toHaveText(expected);
    }
  });

  test('clear() empties every part', async ({ page }) => {
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(said(page)).toHaveText('No reminder.');
    for (const name of ['hour', 'minute', 'AM/PM'])
      await expect(part(page, name)).toHaveValue('');
    // An empty part, stepped: it starts at now.
    await part(page, 'minute').focus();
    await page.keyboard.press('ArrowUp');
    await expect(part(page, 'minute')).not.toHaveValue('');
  });
});

test('Hour cycle: 12 and 24 hours, seconds, the hour padded', async ({
  page,
}) => {
  await page.goto(demo('hour-cycle-time-input'));
  const twelve = page.getByRole('group', { name: '12-hour clock' });
  const twentyFour = page.getByRole('group', { name: '24-hour clock' });
  await expect(twelve.getByRole('spinbutton', { name: 'hour' })).toHaveValue(
    '2',
  );
  await expect(twelve.getByRole('spinbutton', { name: 'AM/PM' })).toHaveValue(
    'PM',
  );
  await expect(
    twentyFour.getByRole('spinbutton', { name: 'hour' }),
  ).toHaveValue('14');
  await expect(twentyFour.getByRole('spinbutton')).toHaveCount(2);
  await expect(
    page
      .getByRole('group', { name: 'With seconds' })
      .getByRole('spinbutton', { name: 'second' }),
  ).toHaveValue('30');
  await expect(
    page
      .getByRole('group', { name: 'Leading zeros' })
      .getByRole('spinbutton', { name: 'hour' }),
  ).toHaveValue('09');
});

test('Limits: a time outside them is marked invalid', async ({ page }) => {
  await page.goto(demo('limits-time-input'));
  const group = page.getByRole('group', { name: 'Opening time' });
  await expect(group).not.toHaveAttribute('data-invalid');
  await part(page, 'hour').focus();
  await page.keyboard.type('8');
  await expect(group).toHaveAttribute('data-invalid', 'true');
  await expect(part(page, 'minute')).toHaveAttribute('aria-invalid', 'true');
});

test("Locale: each part's order, clock and names are the locale's", async ({
  page,
}) => {
  await page.goto(demo('locale-time-input'));
  const german = page.getByRole('group', { name: 'Ankunftszeit' });
  await expect(german.getByRole('spinbutton')).toHaveCount(2);
  await expect(german.getByRole('spinbutton').first()).toHaveValue('14');
  // Korean: AM/PM first.
  const korean = page.getByRole('group', { name: '도착 시간' });
  await expect(korean.getByRole('spinbutton').first()).toHaveAttribute(
    'data-type',
    'dayPeriod',
  );
});

test('Disabled: out of the tab order', async ({ page }) => {
  await page.goto(demo('disabled-time-input'));
  for (const input of await page.getByRole('spinbutton').all())
    await expect(input).toBeDisabled();
});

test('Read-only: focused and read, not changed', async ({ page }) => {
  await page.goto(demo('read-only-time-input'));
  const hour = part(page, 'hour');
  await hour.focus();
  await expect(hour).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await page.keyboard.type('5');
  await expect(hour).toHaveValue('2');
});

test('Form: required, the hours and the 15-minute rule, from the schema', async ({
  page,
}) => {
  await page.goto(demo('form-time-input'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByText('Pick a time.')).toBeVisible();
  await part(page, 'hour').focus();
  await page.keyboard.type('1007a');
  await expect(
    page.getByText('Appointments start every 15 minutes.'),
  ).toBeVisible();
  await part(page, 'minute').focus();
  await page.keyboard.type('15');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText('Booked for 10:15.');
});

test('RTL: the clock left to right, AM/PM where the locale puts it; arrows as they show', async ({
  page,
}) => {
  await page.goto(demo('rtl-time-input'));
  const inputs = page.getByRole('spinbutton');
  await expect(inputs).toHaveCount(3);
  const hour = page.locator('[data-type=hour]');
  const minute = page.locator('[data-type=minute]');
  const period = page.locator('[data-type=dayPeriod]');
  const left = async (locator: typeof hour) =>
    (await locator.boundingBox())?.x ?? 0;
  // On screen: AM/PM, then the hour, then the minute.
  expect(await left(period)).toBeLessThan(await left(hour));
  expect(await left(hour)).toBeLessThan(await left(minute));
  await minute.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(hour).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(period).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(hour).toBeFocused();
});
