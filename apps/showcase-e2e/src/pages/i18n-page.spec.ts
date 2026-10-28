import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Internationalization Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/i18n');
    await expectNoA11yViolations(page);
  });
});
