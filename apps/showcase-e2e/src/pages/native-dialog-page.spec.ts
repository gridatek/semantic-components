import { expect, test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Native Dialog Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/native-dialog');
    await expectNoA11yViolations(page);
  });

  test('should be centered horizontally and vertically when open', async ({
    page,
  }) => {
    await page.goto('/docs/components/native-dialog');

    // Open the dialog
    await page.getByRole('button', { name: 'Open Dialog' }).first().click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();

    const dialogBox = await dialog.boundingBox();
    const viewport = page.viewportSize();

    expect(dialogBox).not.toBeNull();
    expect(viewport).not.toBeNull();

    const dialogCenterX = dialogBox!.x + dialogBox!.width / 2;
    const dialogCenterY = dialogBox!.y + dialogBox!.height / 2;

    const viewportCenterX = viewport!.width / 2;
    const viewportCenterY = viewport!.height / 2;

    // Allow a small tolerance (2px) for rounding
    expect(Math.abs(dialogCenterX - viewportCenterX)).toBeLessThanOrEqual(2);
    expect(Math.abs(dialogCenterY - viewportCenterY)).toBeLessThanOrEqual(2);
  });
});
