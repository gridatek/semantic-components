import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Aspect Ratio Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/aspect-ratio');
    await expectNoA11yViolations(page);
  });
});
