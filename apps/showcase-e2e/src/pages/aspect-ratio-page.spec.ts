import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Aspect Ratio Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/aspect-ratio');
    await expectNoA11yViolations(page);
  });
});
