import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Typography Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/typography');
    await expectNoA11yViolations(page);
  });
});
