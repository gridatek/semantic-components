import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Intersection Observer Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/intersection-observer');
    await expectNoA11yViolations(page);
  });
});
