import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Stat Card Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/stat-card');
    await expectNoA11yViolations(page);
  });
});
