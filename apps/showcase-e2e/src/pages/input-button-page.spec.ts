import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Input Button Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/input-button');
    await expectNoA11yViolations(page);
  });
});
