import { type Locator, type Page, expect, test } from '@playwright/test';

const toasts = (page: Page) => page.locator('[data-slot="toast"]');

/** Waits for a toast to finish sliding in. */
const settled = (toast: Locator) =>
  toast.evaluate((el) =>
    Promise.all(el.getAnimations().map((animation) => animation.finished)),
  );

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

test.describe('Toast positions', () => {
  test('a toast elsewhere leaves the others where they are', async ({
    page,
  }) => {
    await page.goto('/demos/toast/position-toast-demo');
    await page.getByRole('button', { name: 'Top start' }).click();
    const first = toasts(page).filter({ hasText: 'Shown at top-start.' });
    await expect(first).toBeVisible();
    await settled(first);
    const before = await first.boundingBox();

    await page.getByRole('button', { name: 'Bottom end' }).click();
    const second = toasts(page).filter({ hasText: 'Shown at bottom-end.' });
    await expect(second).toBeVisible();
    await expect(toasts(page)).toHaveCount(2);
    await settled(second);

    // The first is still at the top, the second at the bottom.
    const after = await first.boundingBox();
    const bottom = await second.boundingBox();
    expect(after?.y).toBeCloseTo(before?.y ?? 0, 0);
    expect(bottom?.y ?? 0).toBeGreaterThan((after?.y ?? 0) + 100);
  });
});
