import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Autocomplete Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/autocomplete');
    await expectNoA11yViolations(page);
  });
});
