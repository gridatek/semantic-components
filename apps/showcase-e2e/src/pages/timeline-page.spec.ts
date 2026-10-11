import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Timeline Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/timeline');
    await expectNoA11yViolations(page);
  });
});
