import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Typeset Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/typeset');
    await expectNoA11yViolations(page);
  });
});
