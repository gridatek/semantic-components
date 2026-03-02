import { test, expect } from '@playwright/test';

test.describe('Error Field Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/field/error-field-demo');
  });

  test('should render a labeled password input', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await expect(input).toBeVisible();

    const label = page.locator('label', { hasText: 'Password' });
    await expect(label).toBeVisible();
  });

  test('should render field description', async ({ page }) => {
    const description = page.locator('[data-slot="field-description"]');
    await expect(description).toBeVisible();
    await expect(description).toContainText('Must be at least 8 characters.');
  });
});
