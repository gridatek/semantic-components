import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Separator Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/separator');
    await expectNoA11yViolations(page);
  });
});
