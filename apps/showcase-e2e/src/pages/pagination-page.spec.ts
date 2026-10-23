import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Pagination Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/pagination');
    await expectNoA11yViolations(page);
  });
});
