import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Radar Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/radar-chart');
    await expectNoA11yViolations(page);
  });
});
