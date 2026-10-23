import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Backdrop Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/backdrop');
    await expectNoA11yViolations(page);
  });
});
