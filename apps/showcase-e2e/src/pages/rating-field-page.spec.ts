import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Rating Field Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/rating-field');
    await expectNoA11yViolations(page);
  });
});
