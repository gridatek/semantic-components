import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Sidebar Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/sidebar-next');
    await expectNoA11yViolations(page);
  });
});
