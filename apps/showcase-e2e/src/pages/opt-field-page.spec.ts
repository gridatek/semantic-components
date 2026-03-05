import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Opt Field Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/opt-field');
    await expectNoA11yViolations(page);
  });
});
