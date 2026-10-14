import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Query Param State Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/query-param-state');
    await expectNoA11yViolations(page);
  });
});
