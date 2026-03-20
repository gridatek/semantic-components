import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Number Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/number');
    await expectNoA11yViolations(page);
  });
});
