import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('media-player page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/media-player');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Small players',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
