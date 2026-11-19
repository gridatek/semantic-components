import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Installation Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/installation');
    await expectNoA11yViolations(page);
  });
});
