import { test, expect } from '@playwright/test';

test.describe('Separator Field Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/field/separator-field-demo');
  });

  test('should render email and phone fields', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' });
    await expect(emailInput).toBeVisible();

    const phoneInput = page.getByRole('textbox', { name: 'Phone' });
    await expect(phoneInput).toBeVisible();
  });

  test('should render separator with "or" text', async ({ page }) => {
    const separator = page.locator('span', { hasText: 'or' });
    await expect(separator).toBeVisible();
  });
});
