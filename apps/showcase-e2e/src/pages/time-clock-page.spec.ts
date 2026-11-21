import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('time-clock page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/time-clock');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Picking',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
