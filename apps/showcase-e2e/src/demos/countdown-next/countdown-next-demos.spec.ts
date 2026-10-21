import { type Page, expect, test } from '@playwright/test';

const demo = (name: string) =>
  `/demos/countdown-next/${name}-countdown-next-demo`;
const timer = (page: Page) => page.getByRole('timer');
/** The digits shown, as read: "02:14:05". */
const shown = (page: Page) =>
  page
    .locator('[data-slot="countdown-unit"]')
    .allTextContents()
    .then((units) => units.map((unit) => unit.trim()).join(':'));

// The time is the test's: fixed — Angular's timers still run — and moved on
// by the test, so times are exact and the end comes at once.
const start = new Date('2026-10-16T12:00:00Z').getTime();
let at = start;
const advance = (page: Page, ms: number) => page.clock.setFixedTime((at += ms));

test.beforeEach(async ({ page }) => {
  at = start;
  await page.clock.setFixedTime(at);
});

test('Event: units, and words for screen readers', async ({ page }) => {
  await page.goto(demo('event'));
  const units = page.locator('[data-slot="countdown-unit"]');
  await expect(units).toHaveText(['02', '03', '04', '05']);
  await expect(timer(page)).toHaveAccessibleName('Launch in');
  await expect(page.locator('[data-slot="countdown-text"]')).toHaveText(
    '2 days, 3 hours, 4 minutes, 5 seconds',
  );
  await advance(page, 6000);
  await expect(units).toHaveText(['02', '03', '03', '59']);
});

test('Inline: on the second', async ({ page }) => {
  await page.goto(demo('inline'));
  await expect.poll(() => shown(page)).toBe('02:14:05');
  await advance(page, 1000);
  await expect.poll(() => shown(page)).toBe('02:14:04');
});

test('Timer: start, pause, reset', async ({ page }) => {
  await page.goto(demo('timer'));
  await expect.poll(() => shown(page)).toBe('05:00');
  // Started (rendered) before the time moves on.
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
  await advance(page, 3000);
  await expect.poll(() => shown(page)).toBe('04:57');
  await page.getByRole('button', { name: 'Pause' }).click();
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  await advance(page, 5000);
  await expect.poll(() => shown(page)).toBe('04:57');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect.poll(() => shown(page)).toBe('05:00');
});

test('Rolling digits: each digit at its place', async ({ page }) => {
  await page.goto(demo('roll'));
  await expect(page.locator('[data-slot="countdown-text"]')).toHaveText(
    '5 hours, 30 minutes',
  );
  // 05: the tens column at 0, the ones at 5.
  const columns = page
    .locator('[data-slot="countdown-unit"]')
    .first()
    .locator('.flex-col');
  await expect(columns.nth(1)).toHaveAttribute('style', /translateY\(-5em\)/);
});

test('Done: completed, once', async ({ page }) => {
  await page.goto(demo('done'));
  await expect(page.getByRole('status')).toHaveText('Not yet.');
  await advance(page, 10_000);
  await expect(page.getByRole('status')).toHaveText('The doors are open.');
  await expect(timer(page)).toHaveAttribute('data-done', 'true');
  await expect(page.locator('[data-slot="countdown-text"]')).toHaveText(
    '0 seconds',
  );
  await page.getByRole('button', { name: 'Again' }).click();
  await expect(page.getByRole('status')).toHaveText('Not yet.');
});
