import { expect, test } from '@playwright/test';

test.describe('Native Dialog Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/native-dialog/native-dialog-demo');
  });

  test('should be centered horizontally and vertically when open', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).click();

    const dialog = page.locator('dialog[open]');
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
