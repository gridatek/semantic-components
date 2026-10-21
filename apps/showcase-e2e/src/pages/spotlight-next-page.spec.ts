import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Spotlight Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/spotlight-next');
    await expectNoA11yViolations(page);
  });
});
