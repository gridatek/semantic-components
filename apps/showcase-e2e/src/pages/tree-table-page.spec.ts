import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Tree Table Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/recipes/tree-table');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'How it is made',
      'Keyboard',
      'Accessibility',
      'Examples',
    ]);
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
