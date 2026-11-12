import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Data Table Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/data-table');
    await expect(page.locator('h2')).toHaveText([
      'Installation',
      'Usage',
      'Anatomy',
      'How it works',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
