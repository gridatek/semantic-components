import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Tour Guide Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/tour-guide');
    await expectNoA11yViolations(page);
  });
});
