import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Theme Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/theme');
    await expectNoA11yViolations(page);
  });
});
