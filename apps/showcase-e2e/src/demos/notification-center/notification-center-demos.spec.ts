import { expect, test } from '../../test';

test.describe('Usage: an inbox behind a bell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/demos/notification-center/notification-center-usage-demo',
    );
    await page.getByRole('button', { name: 'Notifications, 2 unread' }).click();
    await expect(
      page.getByRole('heading', { name: 'Notifications' }),
    ).toBeVisible();
  });

  test('All or Unread; marked read, the count follows', async ({ page }) => {
    const items = page.getByRole('listitem');
    await expect(items).toHaveCount(3);
    await page.getByRole('button', { name: 'Unread', exact: true }).click();
    await expect(items).toHaveCount(2);

    await page
      .getByRole('button', { name: 'Mark “New comment” as read' })
      .click();
    await expect(items).toHaveCount(1);
    await page.getByRole('button', { name: 'Mark all as read' }).click();
    await expect(page.getByText("You're all caught up.")).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mark all as read' }),
    ).toBeDisabled();
    await page.keyboard.press('Escape');
    await expect(
      page.getByRole('button', { name: 'Notifications, 0 unread' }),
    ).toBeFocused();
  });

  test('dismissed, gone; an unread one says so in words', async ({ page }) => {
    await expect(page.getByRole('listitem').first()).toContainText('Unread:');
    await page.getByRole('button', { name: 'Dismiss “Invoice paid”' }).click();
    await expect(page.getByRole('listitem')).toHaveCount(2);
    await expect(page.getByText('Invoice paid')).toHaveCount(0);
  });
});

test('By day: today, yesterday, then dates; Clear all', async ({ page }) => {
  // Noon: "20 minutes ago" and "3 hours ago" are today, whenever the test runs.
  await page.clock.setFixedTime('2026-11-21T12:00:00');
  await page.goto('/demos/notification-center/by-day-notification-center-demo');
  await expect(page.locator('section section h4')).toHaveText([
    'today',
    'yesterday',
    'Nov 18, 2026',
  ]);
  await expect(
    page.getByRole('region', { name: 'today' }).getByRole('listitem'),
  ).toHaveCount(2);
  await page.getByRole('button', { name: 'Clear all' }).click();
  await expect(page.getByText('Nothing yet.')).toBeVisible();
});

test('RTL: in Arabic, dismissed by its name', async ({ page }) => {
  await page.goto('/demos/notification-center/rtl-notification-center-demo');
  await expect(page.getByRole('listitem')).toHaveCount(2);
  await page.getByRole('button', { name: 'تجاهل «تعليق جديد»' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(1);
});
