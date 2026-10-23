import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Command Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/command');
    await expectNoA11yViolations(page);
  });
});
