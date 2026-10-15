import { type Page, expect, test } from '@playwright/test';

const toasts = (page: Page) => page.locator('[data-slot="toast"]');

test.describe('Toast', () => {
  test('a toast is written by the app template, and closes', async ({
    page,
  }) => {
    await page.goto('/demos/toast/basic-toast-demo');
    await page.getByRole('button', { name: 'Show Toast' }).click();
    const toast = toasts(page).first();
    await expect(toast).toContainText('Your message has been sent.');
    // The stack is the one live region: each toast is announced in it.
    await expect(page.locator('sc-toast-stack')).toHaveAttribute(
      'aria-live',
      'polite',
    );

    await toast.hover();
    await toast.getByRole('button', { name: 'Close' }).click();
    await expect(toasts(page)).toHaveCount(0);
  });

  test('its action runs, then dismisses it', async ({ page }) => {
    await page.goto('/demos/toast/action-toast-demo');
    await page.getByRole('button', { name: 'Show Toast' }).click();
    const toast = toasts(page).first();
    await expect(toast).toContainText('Event has been created');
    await toast.getByRole('button', { name: 'Undo' }).click();
    await expect(toasts(page)).toHaveCount(0);
  });
});
