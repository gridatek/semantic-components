import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Speed Dial Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/speed-dial');
    await expectNoA11yViolations(page);
  });
});
