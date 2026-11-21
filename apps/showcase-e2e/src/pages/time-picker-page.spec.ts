import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Time Picker Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/time-picker');
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

  test('the columns open: no axe violations', async ({ page }) => {
    await page.goto('/docs/components/time-picker');
    await page.getByRole('button', { name: 'Choose a time' }).first().click();
    await expect(page.getByRole('listbox', { name: 'hour' })).toBeVisible();
    await expectNoA11yViolations(page);
  });

  test('API reference: every part and the inputs', async ({ page }) => {
    await page.goto('/docs/components/time-picker');
    await expect(
      page.getByRole('region', { name: 'Time Picker parts' }).getByRole('row'),
    ).toHaveCount(8);
    await expect(
      page.getByRole('region', { name: 'ScTimePicker inputs' }),
    ).toContainText('startTime');
  });
});
