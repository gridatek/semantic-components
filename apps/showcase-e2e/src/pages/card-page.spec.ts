import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Card Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/card');
    await expectNoA11yViolations(page);
  });
});
