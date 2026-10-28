import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Line Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/line-chart');
    await expectNoA11yViolations(page);
  });
});
