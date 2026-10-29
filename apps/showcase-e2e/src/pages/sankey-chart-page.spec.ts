import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Sankey Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/sankey-chart');
    await expectNoA11yViolations(page);
  });
});
