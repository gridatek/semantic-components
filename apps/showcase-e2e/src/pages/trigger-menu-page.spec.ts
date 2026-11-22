import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('trigger-menu page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/trigger-menu');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Triggers',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
