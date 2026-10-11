import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Data Table Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/data-table');
    await expectNoA11yViolations(page);
  });
});
