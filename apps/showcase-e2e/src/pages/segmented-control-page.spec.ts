import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('segmented-control page: sections, and no axe violations', async ({
  page,
}) => {
  await page.goto('/docs/components/segmented-control');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'The indicator',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
