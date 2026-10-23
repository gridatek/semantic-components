import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/time-clock/${name}-time-clock-demo`;
const dial = (page: Page) => page.locator('[data-slot="time-clock-dial"]');
const number = (page: Page, value: number) =>
  page.locator(`[data-slot="time-clock-number"][data-value="${value}"]`);
const picked = (page: Page) => page.getByTestId('picked');

/** A point on the dial where a number is: the numbers let the pointer through. */
async function at(page: Page, value: number) {
  const box = await number(page, value).boundingBox();
  if (!box) throw new Error(`no ${value}`);
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

async function clickNumber(page: Page, value: number) {
  const { x, y } = await at(page, value);
  await page.mouse.click(x, y);
}

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = collectErrors(page);
  await page.clock.setFixedTime('2026-10-22T10:07:00');
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: an hour, then the minutes; AM/PM; the header', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await expect(dial(page)).toHaveAccessibleName('Hours');
  await expect(dial(page)).toHaveAttribute('aria-valuenow', '10');
  await expect(dial(page)).toHaveAttribute('aria-valuetext', '10:30 AM');
  await clickNumber(page, 3);
  await expect(picked(page)).toHaveText('03:30:00');
  // On to the minutes.
  await expect(dial(page)).toHaveAccessibleName('Minutes');
  await expect(dial(page)).toBeFocused();
  await clickNumber(page, 15);
  await expect(picked(page)).toHaveText('03:15:00');
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('03:16:00');
  await page.getByRole('button', { name: 'PM' }).click();
  await expect(picked(page)).toHaveText('15:16:00');
  await expect(page.getByRole('button', { name: 'PM' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  // The header: back to the hours.
  const hours = page.getByRole('button', { name: /hour/ });
  await hours.click();
  await expect(hours).toHaveAttribute('aria-pressed', 'true');
  await expect(dial(page)).toHaveAccessibleName('Hours');
  await dial(page).focus();
  await press(page, 'Enter');
  await expect(dial(page)).toHaveAccessibleName('Minutes');
});

test('Basic: dragged — the hand follows, released on the minutes', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const from = await at(page, 10);
  const to = await at(page, 6);
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move((from.x + to.x) / 2 - 40, (from.y + to.y) / 2, {
    steps: 5,
  });
  await page.mouse.move(to.x, to.y, { steps: 5 });
  await expect(picked(page)).toHaveText('06:30:00');
  await expect(dial(page)).toHaveAccessibleName('Hours');
  await page.mouse.up();
  await expect(dial(page)).toHaveAccessibleName('Minutes');
});

test('24 hours: 13–00 on the inner ring', async ({ page }) => {
  await page.goto(demo('locale'));
  await expect(page.getByRole('button', { name: 'AM' })).toHaveCount(0);
  await expect(number(page, 0)).toHaveText('00');
  await clickNumber(page, 0);
  await expect(picked(page)).toHaveText('00:45:00');
  await page.getByRole('button', { name: /heure/ }).click();
  await clickNumber(page, 12);
  await expect(picked(page)).toHaveText('12:45:00');
  await page.getByRole('button', { name: /heure/ }).click();
  await clickNumber(page, 21);
  await expect(picked(page)).toHaveText('21:45:00');
});

test('Step: from now, by 5 minutes', async ({ page }) => {
  await page.goto(demo('step'));
  await expect(dial(page)).toHaveAttribute('aria-valuenow', '0');
  await expect(dial(page)).not.toHaveAttribute('aria-valuetext');
  await dial(page).focus();
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('11:00:00');
  await press(page, 'Enter');
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('11:05:00');
  await press(page, 'PageUp');
  await expect(picked(page)).toHaveText('11:10:00');
  await press(page, 'End');
  await expect(picked(page)).toHaveText('11:55:00');
});

test('Limits: outside dimmed, not picked', async ({ page }) => {
  await page.goto(demo('limits'));
  await expect(number(page, 8)).toHaveAttribute('data-disabled');
  await expect(number(page, 9)).not.toHaveAttribute('data-disabled');
  await clickNumber(page, 8);
  await expect(picked(page)).toHaveText('09:00:00');
  // Not picked: still on the hours.
  await expect(dial(page)).toHaveAccessibleName('Hours');
  // PM: 9 PM is too late — the nearest that can be: 5 PM.
  await page.getByRole('button', { name: 'PM' }).click();
  await expect(picked(page)).toHaveText('17:00:00');
  await expect(number(page, 18)).toHaveAttribute('data-disabled');
  await expect(number(page, 17)).not.toHaveAttribute('data-disabled');
  await clickNumber(page, 17);
  await expect(picked(page)).toHaveText('17:00:00');
  await expect(number(page, 45)).toHaveAttribute('data-disabled');
  await expect(number(page, 30)).not.toHaveAttribute('data-disabled');
  await expect(number(page, 5)).toHaveAttribute('data-disabled');
});

test('With a time input: one value', async ({ page }) => {
  await page.goto(demo('input'));
  await page.getByRole('spinbutton', { name: 'hour' }).focus();
  await press(page, 'ArrowUp');
  await expect(picked(page)).toHaveText('08:15:00');
  await expect(dial(page)).toHaveAttribute('aria-valuenow', '8');
  await clickNumber(page, 9);
  await expect(page.getByRole('spinbutton', { name: 'hour' })).toHaveText('9');
});

test('In a form: required; booked', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Book a call' }).click();
  await expect(page.getByRole('alert')).toHaveText('Pick a time.');
  await clickNumber(page, 4);
  await clickNumber(page, 30);
  await page.getByRole('button', { name: 'Book a call' }).click();
  await expect(page.getByRole('status')).toHaveText('Call booked at 04:30.');
});
