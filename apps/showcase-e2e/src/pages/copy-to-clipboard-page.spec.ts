import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Copy to Clipboard Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/copy-to-clipboard');
    await expectNoA11yViolations(page);
  });
});
