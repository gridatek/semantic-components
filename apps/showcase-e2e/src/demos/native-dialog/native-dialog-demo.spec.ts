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

    const dialogBox = (await dialog.boundingBox()) as {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    const viewport = page.viewportSize() as { width: number; height: number };

    const dialogCenterX = dialogBox.x + dialogBox.width / 2;
    const dialogCenterY = dialogBox.y + dialogBox.height / 2;

    const viewportCenterX = viewport.width / 2;
    const viewportCenterY = viewport.height / 2;

    // Allow a small tolerance (2px) for rounding
    expect(Math.abs(dialogCenterX - viewportCenterX)).toBeLessThanOrEqual(2);
    expect(Math.abs(dialogCenterY - viewportCenterY)).toBeLessThanOrEqual(2);
  });
});
