import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Context Menu Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/context-menu');
    await expectNoA11yViolations(page);
  });
});
