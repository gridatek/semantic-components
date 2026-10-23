import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Tooltip Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/tooltip');
    await expectNoA11yViolations(page);
  });
});
