import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Stacked Layout Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/stacked-layout');
    await expectNoA11yViolations(page);
  });
});
