import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Video Player Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/video-player-next');
    await expectNoA11yViolations(page);
  });
});
