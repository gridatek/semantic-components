import { type Page, expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const demo = (name: string) => `/demos/date-input/${name}-date-input-demo`;
const part = (page: Page, name: string) =>
  page.getByRole('spinbutton', { name, exact: true });
const picked = (page: Page) => page.getByTestId('picked');
const type = async (page: Page, digits: string) => {
  for (const digit of digits) await press(page, digit);
};

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = collectErrors(page);
  await page.clock.setFixedTime('2026-10-22T10:00:00');
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Segmented: typed part by part, arrows, Backspace', async ({ page }) => {
  await page.goto(demo('segmented'));
  await expect(page.getByRole('group', { name: 'Start date' })).toBeVisible();
  await expect(part(page, 'month')).toHaveText('––');
  await part(page, 'month').focus();
  await press(page, '4');
  await expect(part(page, 'day')).toBeFocused();
  await type(page, '30');
  await expect(part(page, 'year')).toBeFocused();
  await expect(picked(page)).toHaveText('No date.');
  await type(page, '2026');
  await expect(picked(page)).toHaveText('2026-04-30');
  await expect(part(page, 'month')).toHaveAttribute('aria-valuetext', 'April');
  await part(page, 'month').focus();
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('2026-05-30');
  await part(page, 'day').focus();
  await press(page, 'End');
  await expect(picked(page)).toHaveText('2026-05-31');
  // April has 30 days: the day kept within the month.
  await part(page, 'month').focus();
  await press(page, 'ArrowDown');
  await expect(picked(page)).toHaveText('2026-04-30');
  await press(page, 'ArrowUp');
  await part(page, 'year').focus();
  await press(page, 'Backspace');
  await expect(part(page, 'year')).toHaveText('––––');
  await expect(picked(page)).toHaveText('No date.');
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('2026-05-30');
});

test('Segmented: two digits for the year — this century’s', async ({
  page,
}) => {
  await page.goto(demo('segmented'));
  await part(page, 'month').focus();
  await type(page, '1225');
  await expect(part(page, 'year')).toBeFocused();
  await type(page, '27');
  await part(page, 'year').blur();
  await expect(picked(page)).toHaveText('2027-12-25');
});

test('Segmented, French: day first', async ({ page }) => {
  await page.goto(demo('segmented-locale'));
  await expect(page.getByRole('spinbutton').first()).toHaveAccessibleName(
    'jour',
  );
  await expect(part(page, 'jour')).toHaveText('14');
  await part(page, 'jour').focus();
  await type(page, '02112026');
  await expect(picked(page)).toHaveText('2026-11-02');
});
