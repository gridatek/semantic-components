import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Home Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await expectNoA11yViolations(page);
  });
});
