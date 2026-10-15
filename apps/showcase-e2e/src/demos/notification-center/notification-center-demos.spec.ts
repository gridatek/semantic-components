import { type Page, expect, test } from '@playwright/test';

const items = (page: Page) => page.locator('li[data-slot="notification"]');

test.describe('Inbox Notification Center Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/demos/notification-center/inbox-notification-center-demo',
    );
  });

  const bell = (page: Page) =>
    page.getByRole('button', { name: /^Notifications/ });

  test('the bell says how many are unread and opens them', async ({ page }) => {
    await expect(bell(page)).toHaveAccessibleName('Notifications, 3 unread');
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

  test('the filter shows all or the unread ones', async ({ page }) => {
    await bell(page).click();
    const unread = page.getByRole('button', { name: 'Unread', exact: true });
    await unread.click();
    await expect(unread).toHaveAttribute('aria-pressed', 'true');
    await expect(items(page)).toHaveCount(3);
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await expect(items(page)).toHaveCount(5);
  });

  test('marks one read, dismisses one, marks all read', async ({ page }) => {
    await bell(page).click();
    const first = items(page).first();
    await expect(first).toHaveAttribute('data-read', 'false');
    await first.getByRole('button', { name: 'Mark as read' }).click();
    await expect(first).toHaveAttribute('data-read', 'true');
    await expect(bell(page)).toHaveAccessibleName('Notifications, 2 unread');

    await page.getByRole('button', { name: 'Dismiss Payment failed' }).click();
    await expect(items(page)).toHaveCount(4);

    const markAll = page.getByRole('button', { name: 'Mark all as read' });
    await markAll.click();
    await expect(bell(page)).toHaveAccessibleName('Notifications');
    await expect(markAll).toBeDisabled();
  });
});

test.describe('By Day Notification Center Demo', () => {
  test.beforeEach(async ({ page }) => {
    // Midday: early in the morning, "2 hours ago" would be yesterday.
    await page.clock.setFixedTime('2026-01-15T12:00:00');
    await page.goto(
      '/demos/notification-center/by-day-notification-center-demo',
    );
  });

  test('sections are named by their day', async ({ page }) => {
    // Five days ago is always "Earlier", whatever the time of the run.
    await expect(
      page.getByRole('group', { name: 'Earlier' }).locator('li'),
    ).toHaveCount(1);
    await expect(items(page)).toHaveCount(5);
  });

  test('the unread filter leaves out the read ones, in every section', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /^Unread/ }).click();
    await expect(items(page)).toHaveCount(3);
    await expect(page.getByRole('group', { name: 'Earlier' })).toHaveCount(0);
    await page.getByRole('button', { name: 'Mark all as read' }).click();
    await expect(page.getByText("You're all caught up.")).toBeVisible();
  });

  test('clear all leaves the empty state', async ({ page }) => {
    await page.getByRole('button', { name: 'Clear all' }).click();
    await expect(items(page)).toHaveCount(0);
    await expect(page.getByText("You're all caught up.")).toBeVisible();
  });
});
