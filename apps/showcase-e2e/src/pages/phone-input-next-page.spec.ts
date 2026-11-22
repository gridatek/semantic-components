import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('phone-input-next page: sections, and no axe violations', async ({
  page,
}) => {
  await page.goto('/docs/components/phone-input-next');
  await expect(page.locator('h2')).toHaveText([
    'Installation',
    'Usage',
    'Anatomy',
    'Country and number',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
