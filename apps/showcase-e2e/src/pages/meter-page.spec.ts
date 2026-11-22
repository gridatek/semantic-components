import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('meter page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/meter');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'The value',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
