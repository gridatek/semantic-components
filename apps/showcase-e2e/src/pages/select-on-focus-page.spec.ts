import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Select On Focus Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/select-on-focus');
    await expectNoA11yViolations(page);
  });
});
