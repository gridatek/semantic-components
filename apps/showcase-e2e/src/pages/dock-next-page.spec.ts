import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Dock Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/dock-next');
    await expectNoA11yViolations(page);
  });
});
