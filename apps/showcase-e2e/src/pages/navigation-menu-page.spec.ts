import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Navigation Menu Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/navigation-menu');
    await expectNoA11yViolations(page);
  });
});
