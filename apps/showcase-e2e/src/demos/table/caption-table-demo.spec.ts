import { test, expect } from '@playwright/test';

test.describe('Caption Table Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/table/caption-table-demo');
  });

  test('should render table', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
  });
});
