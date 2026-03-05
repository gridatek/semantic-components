import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Multiselect Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/multiselect');
    await expectNoA11yViolations(page);
  });
});
