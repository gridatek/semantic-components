import { expect, test } from '@playwright/test';

test.describe('Basic Alert Dialog Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/alert-dialog/basic-alert-dialog-demo');
  });

  test('should be centered horizontally and vertically when open', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Delete Account' }).click();

    const dialog = page.getByRole('alertdialog');
    await expect(dialog).toBeVisible();

    const offset = await dialog.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      return {
        dx: Math.abs(centerX - window.innerWidth / 2),
        dy: Math.abs(centerY - window.innerHeight / 2),
      };
    });

    // Allow a small tolerance (2px) for rounding
    expect(offset.dx).toBeLessThanOrEqual(2);
    expect(offset.dy).toBeLessThanOrEqual(2);
  });
});
