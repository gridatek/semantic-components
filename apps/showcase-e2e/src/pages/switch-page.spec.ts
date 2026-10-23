import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Switch Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/switch');
    await expectNoA11yViolations(page);
  });
});
