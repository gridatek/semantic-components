import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Bubble Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/bubble');
    await expectNoA11yViolations(page);
  });
});
