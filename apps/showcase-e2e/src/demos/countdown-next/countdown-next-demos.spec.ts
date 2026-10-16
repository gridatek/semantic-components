import { type Page, expect, test } from '@playwright/test';

const demo = (name: string) =>
  `/demos/countdown-next/${name}-countdown-next-demo`;
const timer = (page: Page) => page.getByRole('timer');

// The clock is the test's: times are exact, the end comes at once.
test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: new Date('2026-10-16T12:00:00Z') });
});

test('Event: units, and words for screen readers', async ({ page }) => {
  await page.goto(demo('event'));
  const units = page.locator('[data-slot="countdown-unit"]');
  await expect(units).toHaveText(['02', '03', '04', '05']);
  await expect(timer(page)).toHaveAccessibleName('Launch in');
  await expect(page.locator('[data-slot="countdown-text"]')).toHaveText(
    '2 days, 3 hours, 4 minutes, 5 seconds',
  );
  await page.clock.runFor(6000);
  await expect(units).toHaveText(['02', '03', '03', '59']);
});

test('Inline: on the second', async ({ page }) => {
  await page.goto(demo('inline'));
  await expect(timer(page)).toContainText('02:14:05');
  await page.clock.runFor(1000);
  await expect(timer(page)).toContainText('02:14:04');
});

test('Timer: start, pause, reset', async ({ page }) => {
  await page.goto(demo('timer'));
  await expect(timer(page)).toContainText('05:00');
  await page.getByRole('button', { name: 'Start' }).click();
  await page.clock.runFor(3000);
  await expect(timer(page)).toContainText('04:57');
  await page.getByRole('button', { name: 'Pause' }).click();
  await page.clock.runFor(5000);
  await expect(timer(page)).toContainText('04:57');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(timer(page)).toContainText('05:00');
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
  await page.clock.runFor(10_000);
  await expect(page.getByRole('status')).toHaveText('The doors are open.');
  await expect(timer(page)).toHaveAttribute('data-done', 'true');
  await expect(page.locator('[data-slot="countdown-text"]')).toHaveText(
    '0 seconds',
  );
  await page.getByRole('button', { name: 'Again' }).click();
  await expect(page.getByRole('status')).toHaveText('Not yet.');
});
