import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('virtual-list page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/virtual-list');
  await expect(page.locator('h2')).toHaveText([
    'Installation',
    'Usage',
    'Anatomy',
    'Sizes and scrolling',
    'With the infinite scroll',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
