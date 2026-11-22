import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('token-input page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/token-input');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'The value',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
