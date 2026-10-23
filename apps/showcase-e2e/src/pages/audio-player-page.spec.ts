import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Audio Player Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/audio-player');
    await expectNoA11yViolations(page);
  });
});
