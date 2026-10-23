import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Bubble Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/bubble');
    await expectNoA11yViolations(page);
  });
});
