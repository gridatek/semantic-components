import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Timeline Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/timeline');
    await expectNoA11yViolations(page);
  });
});
