import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Toolbar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/toolbar');
    await expectNoA11yViolations(page);
  });
});
