import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('phone-input page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/phone-input');
  await expect(page.locator('h2')).toHaveText([
    'Installation',
    'Usage',
    'Anatomy',
    'Country and number',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
