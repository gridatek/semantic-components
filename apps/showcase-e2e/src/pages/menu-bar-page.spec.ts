import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Menu Bar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/menu-bar');
    await expectNoA11yViolations(page);
  });
});
