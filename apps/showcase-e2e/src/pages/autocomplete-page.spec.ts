import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Autocomplete Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/autocomplete');
    await expectNoA11yViolations(page);
  });
});
