import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Button Pattern Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/button-pattern');
    await expectNoA11yViolations(page);
  });
});
