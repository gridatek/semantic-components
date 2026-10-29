import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Pie Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/pie-chart');
    await expectNoA11yViolations(page);
  });
});
