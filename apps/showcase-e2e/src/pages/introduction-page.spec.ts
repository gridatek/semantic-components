import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Introduction Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/introduction');
    await expectNoA11yViolations(page);
  });
});
