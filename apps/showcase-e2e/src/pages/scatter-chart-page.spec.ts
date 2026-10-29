import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Scatter Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/scatter-chart');
    await expectNoA11yViolations(page);
  });
});
