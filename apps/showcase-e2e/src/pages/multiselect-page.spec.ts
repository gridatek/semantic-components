import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Multiselect Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/multiselect');
    await expectNoA11yViolations(page);
  });
});
