import { expectNoA11yViolations } from '../../axe';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/time-picker-next/${name}-demo`;
const picked = (page: Page) => page.getByTestId('picked');
const column = (page: Page, name: string) =>
  page.getByRole('listbox', { name, exact: true });
const option = (page: Page, columnName: string, name: string) =>
  column(page, columnName).getByRole('option', { name, exact: true });
const open = async (page: Page, nth = 0) => {
  await page.locator('[data-slot=time-picker-trigger]').nth(nth).click();
  await expect(page.locator('[data-slot=time-picker-columns]')).toBeVisible();
};

test.describe('Usage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('time-picker-next-usage'));
    await expect(picked(page)).toHaveText('09:30:00');
  });

  test('opens on the value, focus on the hour; a listbox per part, named in words', async ({
    page,
  }) => {
    const trigger = page.getByRole('button', { name: 'Choose a time' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await open(page);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('listbox')).toHaveCount(3);
    await expect(option(page, 'hour', '9')).toBeFocused();
    await expect(option(page, 'hour', '9')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(option(page, 'minute', '30')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expectNoA11yViolations(page);
  });

  test('a click sets its part at once; it stays open', async ({ page }) => {
    await open(page);
    await option(page, 'minute', '45').click();
    await expect(picked(page)).toHaveText('09:45:00');
    await option(page, 'AM/PM', 'PM').click();
    await expect(picked(page)).toHaveText('21:45:00');
    await expect(page.locator('[data-slot=time-picker-columns]')).toBeVisible();
  });

  test('arrows pick in a column and move between columns; Enter closes, focus back on the button', async ({
    page,
  }) => {
    await open(page);
    await expect(option(page, 'hour', '9')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(option(page, 'hour', '10')).toBeFocused();
    await expect(picked(page)).toHaveText('10:30:00');
    await page.keyboard.press('ArrowRight');
    await expect(option(page, 'minute', '30')).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(picked(page)).toHaveText('10:29:00');
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-slot=time-picker-columns]')).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('button', { name: 'Choose a time' }),
    ).toBeFocused();
  });

  test('Escape closes, focus back on the button', async ({ page }) => {
    await open(page);
    await expect(option(page, 'hour', '9')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-slot=time-picker-columns]')).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('button', { name: 'Choose a time' }),
    ).toBeFocused();
  });
});

test('Hour cycle: AM/PM on 12 hours; a seconds column, none for AM/PM on 24', async ({
  page,
}) => {
  await page.goto(demo('hour-cycle-time-picker-next'));
  await open(page, 1);
  await expect(page.getByRole('listbox')).toHaveCount(3);
  await expect(column(page, 'second')).toBeVisible();
  await expect(option(page, 'hour', '18')).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('Steps: the minutes every 15', async ({ page }) => {
  await page.goto(demo('steps-time-picker-next'));
  await open(page);
  await expect(column(page, 'minute').getByRole('option')).toHaveText([
    '00',
    '15',
    '30',
    '45',
  ]);
});

test("Limits: what's outside can't be picked", async ({ page }) => {
  await page.goto(demo('limits-time-picker-next'));
  await open(page);
  await expect(option(page, 'hour', '8')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await expect(option(page, 'hour', '9')).not.toHaveAttribute('aria-disabled');
  // 10 PM is past 5:30 PM.
  await expect(option(page, 'AM/PM', 'PM')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await option(page, 'hour', '8').click({ force: true });
  await expect(picked(page)).toHaveText('10:00:00');
});

test('Range: before the start disabled, the duration from it', async ({
  page,
}) => {
  await page.goto(demo('range-time-picker-next'));
  await open(page, 1);
  await expect(option(page, 'hour', '8')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  const duration = page.locator('[data-slot=time-picker-duration]');
  await expect(duration).toContainText('30');
  await option(page, 'hour', '11').click();
  await expect(duration).toContainText('2');
  await expect(duration).toHaveAttribute('aria-live', 'polite');
});

test('Now: the current time, on the steps — and closed', async ({ page }) => {
  await page.goto(demo('now-time-picker-next'));
  await expect(picked(page)).toHaveText('No time.');
  await open(page);
  await page.getByRole('button', { name: 'Now' }).click();
  await expect(page.locator('[data-slot=time-picker-columns]')).toHaveCount(0);
  await expect(picked(page)).toHaveText(/^\d\d:\d[05]:00$/);
});

test("Locale: the columns in the locale's order and words", async ({
  page,
}) => {
  await page.goto(demo('locale-time-picker-next'));
  await open(page);
  await expect(page.getByRole('listbox').first()).toHaveAttribute(
    'data-type',
    'dayPeriod',
  );
});

test('Disabled: the button too', async ({ page }) => {
  await page.goto(demo('disabled-time-picker-next'));
  await expect(
    page.getByRole('button', { name: 'Choose a time' }),
  ).toBeDisabled();
});

test('Form: required; picked in the columns, booked', async ({ page }) => {
  await page.goto(demo('form-time-picker-next'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByText('Pick a time.')).toBeVisible();
  await open(page);
  await option(page, 'hour', '10').click();
  await option(page, 'minute', '15').click();
  await option(page, 'AM/PM', 'AM').click();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText('Call booked at 10:15.');
});

test('RTL: the clock left to right, AM/PM where the locale puts it; the arrows as they show', async ({
  page,
}) => {
  await page.goto(demo('rtl-time-picker-next'));
  await open(page);
  const hour = page.locator('[data-slot=time-picker-column][data-type=hour]');
  const minute = page.locator(
    '[data-slot=time-picker-column][data-type=minute]',
  );
  const period = page.locator(
    '[data-slot=time-picker-column][data-type=dayPeriod]',
  );
  const left = async (locator: typeof hour) =>
    (await locator.boundingBox())?.x ?? 0;
  expect(await left(period)).toBeLessThan(await left(hour));
  expect(await left(hour)).toBeLessThan(await left(minute));
  await expect(hour.locator('[aria-selected=true]')).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(period.locator('[aria-selected=true]')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(minute.locator('[aria-selected=true]')).toBeFocused();
});
