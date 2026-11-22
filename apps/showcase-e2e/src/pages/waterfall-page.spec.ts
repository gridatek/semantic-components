import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('waterfall page: sections, and no axe violations', async ({ page }) => {
  await page.goto('/docs/components/waterfall');
  await expect(page.locator('h2')).toHaveText([
    'Usage',
    'Anatomy',
    'Spans and time',
    'Keyboard',
    'Accessibility',
    'Examples',
    'API reference',
  ]);
  await expectNoA11yViolations(page);
});
