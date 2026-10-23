import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Code Editor Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/code-editor');
    await expectNoA11yViolations(page);
  });
});
