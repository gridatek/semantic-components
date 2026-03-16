import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Code Install Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/code');
    await expectNoA11yViolations(page);
  });
});
