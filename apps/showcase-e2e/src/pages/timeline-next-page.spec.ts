import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Timeline Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/timeline-next');
    await expectNoA11yViolations(page);
  });
});
