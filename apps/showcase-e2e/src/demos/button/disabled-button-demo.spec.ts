import { test, expect } from '@playwright/test';

test.describe('Disabled Button Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/button/disabled-button-demo');
  });

  test('should render all four disabled buttons', async ({ page }) => {
    const buttons = page.locator('button[sc-button]');
    await expect(buttons).toHaveCount(4);
  });

  test('should have aria-disabled on all buttons', async ({ page }) => {
    const buttons = page.locator('button[sc-button]');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toHaveAttribute('aria-disabled', 'true');
    }
  });

  test('should render disabled default button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Default' });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('should render disabled secondary button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Secondary' });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('should render disabled destructive button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Destructive' });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('should render disabled outline button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Outline' });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('should have reduced opacity when disabled', async ({ page }) => {
    const buttons = page.locator('button[sc-button]');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const opacity = await buttons
        .nth(i)
        .evaluate((el) => window.getComputedStyle(el).opacity);
      expect(parseFloat(opacity)).toBeLessThan(1);
    }
  });

  test('should not be focusable via keyboard tab', async ({ page }) => {
    await page.keyboard.press('Tab');
    const buttons = page.locator('button[sc-button]');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).not.toBeFocused();
    }
  });
});
