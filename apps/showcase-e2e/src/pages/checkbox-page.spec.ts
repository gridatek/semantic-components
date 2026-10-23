import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Checkbox Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/checkbox');
    await expectNoA11yViolations(page);
  });
});
