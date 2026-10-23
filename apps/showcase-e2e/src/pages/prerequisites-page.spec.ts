import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Prerequisites Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/prerequisites');
    await expectNoA11yViolations(page);
  });
});
