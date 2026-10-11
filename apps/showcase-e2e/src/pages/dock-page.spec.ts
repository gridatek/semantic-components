import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Dock Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/dock');
    await expectNoA11yViolations(page);
  });
});
