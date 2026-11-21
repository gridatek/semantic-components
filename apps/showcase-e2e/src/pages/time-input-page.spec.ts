import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Time Input Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/time-input');
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

  test('API reference: the part and its inputs', async ({ page }) => {
    await page.goto('/docs/components/time-input');
    await expect(
      page.getByRole('region', { name: 'Time Input parts' }).getByRole('row'),
    ).toHaveCount(2);
    await expect(
      page.getByRole('region', { name: 'ScTimeInput inputs' }),
    ).toContainText('hourCycle');
  });
});
