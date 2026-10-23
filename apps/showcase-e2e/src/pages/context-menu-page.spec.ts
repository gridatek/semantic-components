import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Context Menu Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/context-menu');
    await expectNoA11yViolations(page);
  });
});
