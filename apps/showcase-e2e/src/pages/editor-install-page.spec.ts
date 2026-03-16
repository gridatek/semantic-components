import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Editor Install Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/editor');
    await expectNoA11yViolations(page);
  });
});
