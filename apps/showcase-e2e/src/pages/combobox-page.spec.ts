import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Combobox Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/combobox');
    await expectNoA11yViolations(page);
  });
});
