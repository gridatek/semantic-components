import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Sidebar Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    // 17 framed demos, each a page of its own that axe checks: about 35s.
    test.slow();
    await page.goto('/docs/components/sidebar');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });
});
