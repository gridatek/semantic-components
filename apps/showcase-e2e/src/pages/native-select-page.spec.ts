import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Native Select Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/native-select');
    await expectNoA11yViolations(page);
  });
});
