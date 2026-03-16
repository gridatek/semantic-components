import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Stepper Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/stepper');
    await expectNoA11yViolations(page);
  });
});
