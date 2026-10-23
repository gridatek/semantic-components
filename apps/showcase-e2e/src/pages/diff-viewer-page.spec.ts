import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Diff Viewer Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/diff-viewer');
    await expectNoA11yViolations(page);
  });
});
