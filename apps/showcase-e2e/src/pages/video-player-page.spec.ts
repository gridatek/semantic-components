import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Video Player Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/video-player');
    await expectNoA11yViolations(page);
  });
});
