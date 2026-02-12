import { test, expect } from '@playwright/test';

test.describe('Users Table Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/table/users-table-demo');
  });

  test('should render table', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
  });
});
