import { expect, test } from '@playwright/test';

test.describe('Dialog Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/dialog/dialog-demo');
  });

  test('should be centered horizontally and vertically when open', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).click();

    const dialog = page.getByRole('dialog');
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
