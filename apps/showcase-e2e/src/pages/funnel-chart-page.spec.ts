import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Funnel Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/funnel-chart');
    await expectNoA11yViolations(page);
  });
});
