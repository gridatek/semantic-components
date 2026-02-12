import { test, expect } from '@playwright/test';

test.describe('Basic Table Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/table/basic-table-demo');
  });

  test('should render table', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
  });
});
