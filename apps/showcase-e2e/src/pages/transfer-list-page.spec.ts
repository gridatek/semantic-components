import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('transfer-list recipe page: sections, and no axe violations', async ({
  page,
}) => {
  await page.goto('/docs/components/transfer-list');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'How it is made',
    'Accessibility',
    'Examples',
  ]);
  await expectNoA11yViolations(page);
});
