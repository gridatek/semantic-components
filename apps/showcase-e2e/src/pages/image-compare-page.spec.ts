import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Image Compare Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/image-compare');
    await expectNoA11yViolations(page);
  });
});
