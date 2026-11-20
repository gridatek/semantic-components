import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Get Started Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started');
    await expectNoA11yViolations(page);
  });
});
