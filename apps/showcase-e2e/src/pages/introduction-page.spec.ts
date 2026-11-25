import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Introduction Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/overview/introduction');
    await expectNoA11yViolations(page);
  });
});
