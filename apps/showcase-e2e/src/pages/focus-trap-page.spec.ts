import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Focus Trap Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/focus-trap');
    await expectNoA11yViolations(page);
  });
});
