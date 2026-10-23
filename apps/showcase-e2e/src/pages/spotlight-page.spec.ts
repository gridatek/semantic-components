import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Spotlight Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/spotlight');
    await expectNoA11yViolations(page);
  });
});
