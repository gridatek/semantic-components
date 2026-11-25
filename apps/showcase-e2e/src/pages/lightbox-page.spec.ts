import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Lightbox Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/recipes/lightbox');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'How it is made',
      'Accessibility',
      'Examples',
    ]);
    await expectNoA11yViolations(page);
  });
});
