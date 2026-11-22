import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('preferences page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/preferences');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Kept, and shown',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
