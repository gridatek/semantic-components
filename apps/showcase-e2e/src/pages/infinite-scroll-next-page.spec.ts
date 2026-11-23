import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('infinite-scroll-next page: sections, and no axe violations', async ({
  page,
}) => {
  await page.goto('/docs/components/infinite-scroll-next');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'How it asks',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
