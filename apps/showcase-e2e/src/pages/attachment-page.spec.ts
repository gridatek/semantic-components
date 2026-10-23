import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Attachment Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/attachment');
    await expectNoA11yViolations(page);
  });
});
