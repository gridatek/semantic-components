import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Color Picker Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/color-picker');
    await expectNoA11yViolations(page);
  });
});
