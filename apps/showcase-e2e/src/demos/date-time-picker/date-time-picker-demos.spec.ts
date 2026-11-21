import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/date-time-picker/${name}-demo`;
const picked = (page: Page) => page.getByTestId('picked');
const day = (page: Page, date: string) =>
  page.locator(`[data-slot="calendar-cell"][data-date="${date}"]`);
const column = (page: Page, name: string) =>
  page.getByRole('listbox', { name, exact: true });
const option = (page: Page, columnName: string, name: string) =>
  column(page, columnName).getByRole('option', { name, exact: true });
const open = async (page: Page) => {
  await page.locator('[data-slot=date-time-picker-trigger]').click();
  await expect(page.locator('[data-slot=time-picker-columns]')).toBeVisible();
};

test.describe('Usage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('date-time-picker-usage'));
    await expect(picked(page)).toHaveText('2026-11-02T14:30:00');
  });

  test('opens on the day, focus in the calendar; the columns at the time', async ({
    page,
  }) => {
    const trigger = page.getByRole('button', {
      name: 'Choose a date and time',
    });
    await open(page);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(day(page, '2026-11-02')).toBeFocused();
    await expect(option(page, 'hour', '2')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(option(page, 'AM/PM', 'PM')).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  test('a day picked moves on to the time; each pick on to the next; the last one closes', async ({
    page,
  }) => {
    await open(page);
    await day(page, '2026-11-20').click();
    await expect(picked(page)).toHaveText('2026-11-20T14:30:00');
    // On to the time: the hour.
    await expect(option(page, 'hour', '2')).toBeFocused();
    await option(page, 'hour', '9').click();
    await expect(option(page, 'minute', '30')).toBeFocused();
    await option(page, 'minute', '45').click();
    await expect(
      column(page, 'AM/PM').locator('[aria-selected=true]'),
    ).toBeFocused();
    await option(page, 'AM/PM', 'PM').click();
    await expect(page.locator('[data-slot=time-picker-columns]')).toHaveCount(
      0,
    );
    await expect(picked(page)).toHaveText('2026-11-20T21:45:00');
    await expect(
      page.getByRole('button', { name: 'Choose a date and time' }),
    ).toBeFocused();
  });

  test('Escape closes, focus back on the button', async ({ page }) => {
    await open(page);
    await expect(day(page, '2026-11-02')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-slot=time-picker-columns]')).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('button', { name: 'Choose a date and time' }),
    ).toBeFocused();
  });
});

test('Steps: the minutes every 15', async ({ page }) => {
  await page.goto(demo('steps-date-time-picker'));
  await open(page);
  await expect(column(page, 'minute').getByRole('option')).toHaveText([
    '00',
    '15',
    '30',
    '45',
  ]);
});

test("Limits: days and times outside them can't be picked", async ({
  page,
}) => {
  await page.goto(demo('limits-date-time-picker'));
  await open(page);
  // Before the first day, and a Sunday.
  await expect(day(page, '2026-11-01')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await expect(day(page, '2026-11-08')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  // On the first day: not before 9 AM.
  await expect(option(page, 'hour', '8')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await expect(option(page, 'hour', '9')).not.toHaveAttribute('aria-disabled');
  // Another day: any hour.
  await day(page, '2026-11-03').click();
  await expect(option(page, 'hour', '8')).not.toHaveAttribute('aria-disabled');
});

test('Locale: German, 24 hours, no AM/PM', async ({ page }) => {
  await page.goto(demo('locale-date-time-picker'));
  await open(page);
  await expect(page.getByRole('listbox')).toHaveCount(2);
  await expect(option(page, 'Stunde', '14')).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('Form: required; picked, booked', async ({ page }) => {
  await page.goto(demo('form-date-time-picker'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByText('Pick a date and time.')).toBeVisible();
  await open(page);
  // Nothing yet: the calendar opens on today; a day and a time, picked.
  await page
    .locator('[data-slot="calendar-cell"]:not([aria-disabled])')
    .first()
    .click();
  await option(page, 'hour', '10').click();
  await option(page, 'minute', '15').click();
  await option(page, 'AM/PM', 'AM').click();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toContainText('T10:15.');
});

test('RTL: the calendar right, the clock’s columns left to right', async ({
  page,
}) => {
  await page.goto(demo('rtl-date-time-picker'));
  await open(page);
  const left = (selector: string) =>
    page
      .locator(selector)
      .first()
      .boundingBox()
      .then((b) => b?.x ?? 0);
  expect(await left('[data-slot=time-picker-columns]')).toBeLessThan(
    await left('[data-slot=calendar]'),
  );
  expect(
    await left('[data-slot=time-picker-column][data-type=hour]'),
  ).toBeLessThan(
    await left('[data-slot=time-picker-column][data-type=minute]'),
  );
});

test.describe('Apply (confirm)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('confirm-date-time-picker'));
    await expect(picked(page)).toHaveText('2026-11-02T14:30:00');
  });

  test('the day and time tried out; Apply keeps them', async ({ page }) => {
    const trigger = page.locator('[data-slot=date-time-picker-trigger]');
    await open(page);
    await day(page, '2026-11-20').click();
    await option(page, 'hour', '9').click();
    await option(page, 'minute', '45').click();
    await option(page, 'AM/PM', 'AM').click();
    await expect(picked(page)).toHaveText('2026-11-20T09:45:00');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(picked(page)).toHaveText('2026-11-20T09:45:00');
  });

  test('Escape puts back the value from before', async ({ page }) => {
    await open(page);
    await day(page, '2026-11-20').click();
    await expect(picked(page)).toHaveText('2026-11-20T14:30:00');
    await page.keyboard.press('Escape');
    await expect(picked(page)).toHaveText('2026-11-02T14:30:00');
  });
});
