import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Focus Trap Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/focus-trap');
    await expectNoA11yViolations(page);
  });
});
