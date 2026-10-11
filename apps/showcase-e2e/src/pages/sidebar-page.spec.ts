import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Sidebar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/sidebar');
    await expectNoA11yViolations(page);
  });
});
