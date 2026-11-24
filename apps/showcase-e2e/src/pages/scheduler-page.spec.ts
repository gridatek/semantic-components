import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Scheduler Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/scheduler');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'Dates and times',
      'Creating and moving',
      'Keyboard',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });
});
