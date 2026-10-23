import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Presets Install Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/presets');
    await expectNoA11yViolations(page);
  });
});
