import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Intersection Observer Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/intersection-observer');
    await expectNoA11yViolations(page);
  });
});
