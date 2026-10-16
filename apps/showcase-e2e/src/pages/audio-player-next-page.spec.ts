import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Audio Player Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/audio-player-next');
    await expectNoA11yViolations(page);
  });
});
