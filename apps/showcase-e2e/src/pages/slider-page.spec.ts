import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Slider Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/slider');
    await expectNoA11yViolations(page);
  });
});
