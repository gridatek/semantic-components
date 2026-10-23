import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Button Group Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/button-group');
    await expectNoA11yViolations(page);
  });
});
