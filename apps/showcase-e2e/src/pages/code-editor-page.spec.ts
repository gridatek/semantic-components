import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Code Editor Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/code-editor');
    await expectNoA11yViolations(page);
  });
});
