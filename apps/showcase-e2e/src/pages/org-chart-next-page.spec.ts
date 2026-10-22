import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Org Chart Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/org-chart-next');
    await expectNoA11yViolations(page);
  });
});
