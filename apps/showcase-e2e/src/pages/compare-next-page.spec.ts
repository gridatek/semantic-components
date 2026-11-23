import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('compare-next page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/compare-next');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Dragging',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
