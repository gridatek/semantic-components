import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Prerequisites Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/prerequisites');
    await expectNoA11yViolations(page);
  });
});
