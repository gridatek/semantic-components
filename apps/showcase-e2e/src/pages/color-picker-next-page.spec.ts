import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('color-picker-next page: sections, and no axe violations', async ({
  page,
}) => {
  await page.goto('/docs/components/color-picker-next');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Spaces, formats, gamut',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
