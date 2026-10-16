import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Scheduler Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/scheduler');
    await expectNoA11yViolations(page);
  });
});
