import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Input Button Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/input-button');
    await expectNoA11yViolations(page);
  });
});
