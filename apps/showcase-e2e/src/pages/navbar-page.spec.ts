import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Navbar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/navbar');
    await expectNoA11yViolations(page);
  });
});
