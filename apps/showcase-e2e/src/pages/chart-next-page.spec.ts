import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Chart (Next) Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/chart-next');
    await expectNoA11yViolations(page);
  });
});
