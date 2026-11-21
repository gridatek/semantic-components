import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('date-time-picker page: no axe violations', async ({ page }) => {
  await page.goto('/docs/components/date-time-picker');
  await expect(page.locator('h2').first()).toHaveText('Usage');
  await expectNoA11yViolations(page);
});

test('date-time-picker page: the popover open, no axe violations', async ({
  page,
}) => {
  await page.goto('/docs/components/date-time-picker');
  await page
    .getByRole('button', { name: 'Choose a date and time' })
    .first()
    .click();
  await expect(page.getByRole('listbox', { name: 'hour' })).toBeVisible();
  await expectNoA11yViolations(page);
});
