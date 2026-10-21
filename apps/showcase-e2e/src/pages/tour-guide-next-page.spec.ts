import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Tour Guide Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/tour-guide-next');
    await expectNoA11yViolations(page);
  });
});
