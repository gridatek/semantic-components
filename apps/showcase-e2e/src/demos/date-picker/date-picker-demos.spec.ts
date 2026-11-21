import { collectErrors, press } from '../../interaction';
import { type Locator, type Page, expect, test } from '../../test';

const demo = (name: string) =>
  name === 'usage'
    ? '/demos/date-picker/date-picker-usage-demo'
    : `/demos/date-picker/${name}-date-picker-demo`;
const trigger = (page: Page) =>
  page.locator('[data-slot="date-picker-trigger"]');
const calendar = (page: Page) => page.locator('[data-slot="calendar"]');
const day = (page: Page, date: string) =>
  page.locator(`[data-slot="calendar-cell"][data-date="${date}"]`);
const picked = (page: Page) => page.getByTestId('picked');
/** A date input's parts as they show, joined: `10/14/2026`. */
const shown = (input: Locator) =>
  input
    .getByRole('spinbutton')
    .evaluateAll((parts) =>
      parts.map((part) => (part as HTMLInputElement).value).join('/'),
    );
/** A date typed into a date input, from its first part. */
const typeDate = async (page: Page, input: Locator, digits: string) => {
  await input.getByRole('spinbutton').first().focus();
  await page.keyboard.type(digits);
};

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = collectErrors(page);
  await page.clock.setFixedTime('2026-10-22T10:00:00');
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: focus on the day; a pick closes, focus back', async ({ page }) => {
  await page.goto(demo('usage'));
  await expect(trigger(page)).toHaveAttribute('data-placeholder');
  await expect(trigger(page)).toHaveAttribute('aria-haspopup', 'dialog');
  await trigger(page).click();
  await expect(trigger(page)).toHaveAttribute('aria-expanded', 'true');
  await expect(day(page, '2026-10-22')).toBeFocused();
  await press(page, 'ArrowRight');
  await press(page, 'Enter');
  await expect(calendar(page)).toHaveCount(0);
  await expect(trigger(page)).toBeFocused();
  await expect(trigger(page)).toContainText('Oct 23, 2026');
  await expect(trigger(page)).not.toHaveAttribute('data-placeholder');
  // Escape: closed, the value kept.
  await trigger(page).click();
  await expect(day(page, '2026-10-23')).toBeFocused();
  await press(page, 'Escape');
  await expect(calendar(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('Oct 23, 2026');
});

test('Typed: part by part, the picker’s value — and the calendar’s', async ({
  page,
}) => {
  await page.goto(demo('typed'));
  const input = page.getByRole('group', { name: 'Start date', exact: true });
  await expect.poll(() => shown(input)).toBe('10/14/2026');
  await expect(picked(page)).toHaveText('Oct 14, 2026');
  await typeDate(page, input, '11022026');
  await expect(picked(page)).toHaveText('Nov 2, 2026');
  // The calendar opens on the day; a pick there is typed back.
  await page.getByRole('button', { name: 'Choose a date' }).click();
  await expect(day(page, '2026-11-02')).toBeFocused();
  await day(page, '2026-11-20').click();
  await expect.poll(() => shown(input)).toBe('11/20/2026');
});

test('Date of birth: opens on the years — on the days once set; 18 or older', async ({
  page,
}) => {
  await page.goto(demo('birth'));
  await page.getByRole('button', { name: 'Choose your date of birth' }).click();
  const year = (y: number) =>
    page.locator('[data-slot="calendar-cell-year"]', { hasText: String(y) });
  await expect(year(2008)).toBeFocused();
  await expect(year(2009)).toHaveAttribute('aria-disabled', 'true');
  const years = page.locator('[data-slot="calendar-years"] [role="grid"]');
  while ((await year(2001).count()) === 0) {
    const shown = await years.getAttribute('aria-label');
    await page.getByRole('button', { name: 'Previous years' }).click();
    await expect(years).not.toHaveAttribute('aria-label', shown ?? '');
  }
  await year(2001).click();
  await page
    .locator('[data-slot="calendar-cell-month"]', { hasText: 'May' })
    .click();
  await day(page, '2001-05-14').click();
  await expect(calendar(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('May 14, 2001');
  const birth = page.getByRole('group', { name: 'Date of birth', exact: true });
  await expect.poll(() => shown(birth)).toBe('05/14/2001');
  // Reopened with a date: its days, the day focused — not the years.
  await page.getByRole('button', { name: 'Choose your date of birth' }).click();
  await expect(day(page, '2001-05-14')).toBeFocused();
  await expect(page.locator('[data-slot="calendar-cell-year"]')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(calendar(page)).toHaveCount(0);
  // Typed: not 18 yet — written, and marked.
  await typeDate(page, birth, '10232008');
  await expect(birth).toHaveAttribute('data-invalid', 'true');
  await expect(birth.getByRole('spinbutton').first()).toHaveAttribute(
    'aria-invalid',
    'true',
  );
});

test('Range: written as one span; closed once whole', async ({ page }) => {
  await page.goto(demo('range'));
  await trigger(page).click();
  await expect(page.getByRole('grid')).toHaveCount(2);
  await day(page, '2026-10-12').click();
  await expect(calendar(page)).toHaveCount(1);
  await day(page, '2026-10-18').click();
  await expect(calendar(page)).toHaveCount(0);
  await expect(picked(page)).toHaveText('Oct 12 – 18, 2026');
});

test('Multiple: a list; it stays open', async ({ page }) => {
  await page.goto(demo('multiple'));
  await trigger(page).click();
  await day(page, '2026-10-12').click();
  await day(page, '2026-10-05').click();
  await expect(calendar(page)).toHaveCount(1);
  await expect(picked(page)).toHaveText('Oct 5, 2026 and Oct 12, 2026');
});

test('Constraints: kept for typed days too', async ({ page }) => {
  await page.goto(demo('constraints'));
  const input = page.getByRole('group', { name: 'Delivery date' });
  await typeDate(page, input, '10102026');
  await expect(input).toHaveAttribute('data-invalid', 'true');
  await typeDate(page, input, '10012026');
  await expect(input).toHaveAttribute('data-invalid', 'true');
  await typeDate(page, input, '10092026');
  await expect(input).not.toHaveAttribute('data-invalid');
  await expect(picked(page)).toHaveText('Oct 9, 2026');
  await page.getByRole('button', { name: 'Choose a delivery date' }).click();
  await expect(day(page, '2026-10-10')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
});

test('In a form: required; marked once closed; booked', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('alert')).toHaveText('Pick your arrival.');
  await expect(trigger(page)).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('Arrival').click();
  await day(page, '2026-10-28').click();
  await expect(trigger(page)).not.toHaveAttribute('aria-invalid');
  await page.getByRole('button', { name: 'Book' }).click();
  await expect(page.getByRole('status')).toHaveText(
    'Booked from October 28, 2026.',
  );
});

test('Locale: French, typed day first', async ({ page }) => {
  await page.goto(demo('locale'));
  const input = page.getByRole('group', { name: 'Date d’arrivée' });
  await expect.poll(() => shown(input)).toBe('14/10/2026');
  await expect(picked(page)).toHaveText('14 octobre 2026');
  await typeDate(page, input, '02112026');
  await expect(picked(page)).toHaveText('2 novembre 2026');
  await page.getByRole('button', { name: 'Choisir une date' }).click();
  await expect(page.getByRole('grid', { name: 'novembre 2026' })).toBeVisible();
});
