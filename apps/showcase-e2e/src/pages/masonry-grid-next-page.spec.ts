import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('masonry-grid-next page: sections, and no axe violations', async ({
  page,
}) => {
  await page.goto('/docs/components/masonry-grid-next');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Layout',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
