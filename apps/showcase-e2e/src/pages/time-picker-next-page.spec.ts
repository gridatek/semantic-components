import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Time Picker Next Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/time-picker-next');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'The columns',
      'Keyboard',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: every part and the inputs', async ({ page }) => {
    await page.goto('/docs/components/time-picker-next');
    await expect(
      page
        .getByRole('region', { name: 'Time Picker Next parts' })
        .getByRole('row'),
    ).toHaveCount(7);
    await expect(
      page.getByRole('region', { name: 'ScTimePickerNext inputs' }),
    ).toContainText('startTime');
  });
});
