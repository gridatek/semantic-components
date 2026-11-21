import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Date Input Next Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/date-input-next');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'The value',
      'Keyboard',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: every part and the inputs', async ({ page }) => {
    await page.goto('/docs/components/date-input-next');
    await expect(
      page
        .getByRole('region', { name: 'Date Input Next parts' })
        .getByRole('row'),
    ).toHaveCount(3);
    await expect(
      page.getByRole('region', { name: 'ScDateInputNext inputs' }),
    ).toContainText('unavailable');
  });
});
