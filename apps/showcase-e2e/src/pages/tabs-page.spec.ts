import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Tabs Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/tabs');
    await expectNoA11yViolations(page);
  });
});
