import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Compare Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/compare');
    await expectNoA11yViolations(page);
  });
});
