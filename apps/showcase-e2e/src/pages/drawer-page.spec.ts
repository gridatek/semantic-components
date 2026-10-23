import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Drawer Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/drawer');
    await expectNoA11yViolations(page);
  });
});
