import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Code Block Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/code-block');
    await expectNoA11yViolations(page);
  });
});
