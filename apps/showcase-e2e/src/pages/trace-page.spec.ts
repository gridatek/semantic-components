import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Trace Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/trace');
    await expectNoA11yViolations(page);
  });
});
