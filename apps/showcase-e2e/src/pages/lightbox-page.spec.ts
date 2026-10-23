import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Lightbox Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/lightbox');
    await expectNoA11yViolations(page);
  });
});
