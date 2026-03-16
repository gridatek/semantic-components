import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('UI Lab Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/ui-lab');
    await expectNoA11yViolations(page);
  });
});
