import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('sortable-next page: sections, and no axe violations', async ({
  page,
}) => {
  await page.goto('/docs/components/sortable-next');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Moving',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
