import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Animated Counter Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/animated-counter');
    await expectNoA11yViolations(page);
  });
});
