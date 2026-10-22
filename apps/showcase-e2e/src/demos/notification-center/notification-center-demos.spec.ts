import { type Page, expect, test } from '@playwright/test';

const demo = (name: string) =>
  `/demos/notification-center/${name}-notification-center-demo`;
const items = (page: Page) => page.locator('li[data-slot="notification"]');

test.describe('Inbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('inbox'));
  });

  const bell = (page: Page) =>
    page.getByRole('button', { name: /^Notifications/ });
  const count = (page: Page) =>
    page.locator('[data-slot="notification-count"]');

  test('the bell: the unread count, named by you', async ({ page }) => {
    await expect(bell(page)).toHaveAccessibleName('Notifications, 3 unread');
    await expect(count(page)).toHaveText('3');
    await expect(count(page)).toHaveAttribute('aria-hidden', 'true');
    await bell(page).click();
    await expect(items(page)).toHaveCount(5);
    await expect(items(page).first().locator('time')).toHaveText(
      '4 minutes ago',
    );
    await expect(items(page).first().locator('time')).toHaveAttribute(
      'datetime',
      /^\d{4}-\d\d-\d\dT/,
    );
  });

  test('the count: 9+ beyond nine, hidden at none', async ({ page }) => {
    const send = page.getByRole('button', { name: 'Send a test notification' });
    for (let i = 0; i < 6; i++) await send.click();
    await expect(count(page)).toHaveText('9');
    await send.click();
    await expect(count(page)).toHaveText('9+');
    await expect(bell(page)).toHaveAccessibleName('Notifications, 10 unread');

    await bell(page).click();
    await page.getByRole('button', { name: 'Mark all as read' }).click();
    await expect(count(page)).toBeHidden();
    await expect(bell(page)).toHaveAccessibleName('Notifications');
  });

  test('the filter shows all or the unread ones', async ({ page }) => {
    await bell(page).click();
    const unread = page.getByRole('button', { name: 'Unread', exact: true });
    await unread.click();
    await expect(unread).toHaveAttribute('aria-pressed', 'true');
    await expect(items(page)).toHaveCount(3);
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await expect(items(page)).toHaveCount(5);
  });

  test('marks one read and unread, dismisses one', async ({ page }) => {
    await bell(page).click();
    const first = items(page).first();
    await expect(first).toHaveAttribute('data-read', 'false');
    await first.getByRole('button', { name: 'Mark as read' }).click();
    await expect(first).toHaveAttribute('data-read', 'true');
    await expect(count(page)).toHaveText('2');
    await first.getByRole('button', { name: 'Mark as unread' }).click();
    await expect(count(page)).toHaveText('3');

    await page.getByRole('button', { name: 'Dismiss Payment failed' }).click();
    await expect(items(page)).toHaveCount(4);
  });

  test('icons take the theme’s colours', async ({ page }) => {
    await bell(page).click();
    const success = page
      .locator('[data-slot="notification-icon"][data-type="success"]')
      .first();
    const colour = await success.evaluate((el) => getComputedStyle(el).color);
    const theme = await page.evaluate(() => {
      const probe = document.createElement('span');
      probe.className = 'text-success';
      document.body.append(probe);
      const value = getComputedStyle(probe).color;
      probe.remove();
      return value;
    });
    expect(colour).toBe(theme);
  });
});

test.describe('By day', () => {
  test.beforeEach(async ({ page }) => {
    // Thursday 15 January, midday.
    await page.clock.install({ time: new Date('2026-01-15T12:00:00') });
    await page.goto(demo('by-day'));
  });

  const section = (page: Page, name: RegExp) =>
    page.getByRole('group', { name });

  test('days(): sections by day, titled in the app’s language', async ({
    page,
  }) => {
    const titles = page.locator('[data-slot="notification-day"]');
    await expect(titles).toHaveText([
      'today',
      'yesterday',
      'Saturday',
      'January 3',
    ]);
    await expect(titles.first()).toHaveAttribute('datetime', '2026-01-15');
    // Shown as a title: its first letter up.
    const first = await titles
      .first()
      .evaluate((el) => getComputedStyle(el, '::first-letter').textTransform);
    expect(first).toBe('uppercase');
    await expect(section(page, /^today$/i).locator('li')).toHaveCount(2);
    await expect(section(page, /^yesterday$/i).locator('li')).toHaveCount(2);
    await expect(items(page)).toHaveCount(6);
  });

  test('times and titles move on with the clock', async ({ page }) => {
    await expect(items(page).first().locator('time')).toHaveText(
      '6 minutes ago',
    );
    await page.clock.runFor(60_000);
    await expect(items(page).first().locator('time')).toHaveText(
      '7 minutes ago',
    );
    // Past midnight: today's notifications are yesterday's.
    await page.clock.fastForward('13:00:00');
    await page.clock.runFor(60_000);
    await expect(
      page.locator('[data-slot="notification-day"]').first(),
    ).toHaveText('yesterday');
  });

  test('the unread filter leaves out the read ones, in every day', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /^Unread/ }).click();
    await expect(items(page)).toHaveCount(3);
    await expect(page.locator('[data-slot="notification-day"]')).toHaveCount(2);
    await page.getByRole('button', { name: 'Mark all as read' }).click();
    await expect(page.getByText("You're all caught up.")).toBeVisible();
  });

  test('clear all leaves the empty state', async ({ page }) => {
    await page.getByRole('button', { name: 'Clear all' }).click();
    await expect(items(page)).toHaveCount(0);
    await expect(page.getByText("You're all caught up.")).toBeVisible();
  });
});

test('Empty: your empty state', async ({ page }) => {
  await page.goto(demo('empty'));
  await expect(page.getByText('All caught up')).toBeVisible();
  await expect(items(page)).toHaveCount(0);
});
