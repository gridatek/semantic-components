import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('listbox page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/listbox');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Choosing',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
