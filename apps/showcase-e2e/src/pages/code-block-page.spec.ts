import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Code Block Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/code-block');
    await expectNoA11yViolations(page);
  });
});
