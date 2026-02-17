import { test, expect } from '@playwright/test';

test.describe('With Icons Button Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/button/with-icons-button-demo');
  });

  test('should render all three buttons', async ({ page }) => {
    const buttons = page.locator('button[scButton]');
    await expect(buttons).toHaveCount(3);
  });

  test('should render Upload button with leading icon', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Upload' });
    await expect(button).toBeVisible();
    await expect(button.locator('svg')).toBeVisible();
  });

  test('should render Export button with leading icon', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Export' });
    await expect(button).toBeVisible();
    await expect(button.locator('svg')).toBeVisible();
  });

  test('should render Settings button with trailing icon', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Settings' });
    await expect(button).toBeVisible();
    await expect(button.locator('svg')).toBeVisible();
  });

  test('should contain SVGs with pointer-events-none class', async ({
    page,
  }) => {
    const svgs = page.locator('button[scButton] svg');
    const count = await svgs.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      await expect(svgs.nth(i)).toHaveCSS('pointer-events', 'none');
    }
  });

  test('should apply correct variant classes', async ({ page }) => {
    const uploadBtn = page.getByRole('button', { name: 'Upload' });
    await expect(uploadBtn).toHaveClass(/bg-primary/);

    const exportBtn = page.getByRole('button', { name: 'Export' });
    await expect(exportBtn).toHaveClass(/border-border/);

    const settingsBtn = page.getByRole('button', { name: 'Settings' });
    await expect(settingsBtn).toHaveClass(/bg-secondary/);
  });
});
