import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('virtual-list-next page: sections, and no axe violations', async ({
  page,
}) => {
  await page.goto('/docs/components/virtual-list-next');
  await expect(page.locator('h2')).toHaveText([
    'Installation',
    'Usage',
    'Anatomy',
    'Sizes and scrolling',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
