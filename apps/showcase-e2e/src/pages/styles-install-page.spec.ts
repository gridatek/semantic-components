import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Styles Install Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/packages/styles');
    await expectNoA11yViolations(page);
  });
});
