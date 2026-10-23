import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Field Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/field');
    await expectNoA11yViolations(page);
  });
});
