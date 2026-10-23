import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Org Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/org-chart');
    await expectNoA11yViolations(page);
  });
});
