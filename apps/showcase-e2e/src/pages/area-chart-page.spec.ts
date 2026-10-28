import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Area Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/area-chart');
    await expectNoA11yViolations(page);
  });
});
