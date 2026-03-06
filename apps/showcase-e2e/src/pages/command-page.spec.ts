import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Command Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/command');
    await expectNoA11yViolations(page);
  });
});
