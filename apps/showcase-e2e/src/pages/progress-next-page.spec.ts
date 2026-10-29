import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Progress Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/progress-next');
    await expectNoA11yViolations(page);
  });
});
