import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Editor Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/editor');
    await expectNoA11yViolations(page);
  });
});
