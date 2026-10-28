import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/chart');
    await expectNoA11yViolations(page);
  });
});
