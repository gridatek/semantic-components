import { expect, test } from '@playwright/test';
import { collectErrors, type } from '../../interaction';

test.describe('Country Selector Phone Input Demo', () => {
  test('picking a country updates the trigger', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/phone-input/country-selector-phone-input-demo');
    const trigger = page.locator('[scComboboxTrigger]');
    await expect(trigger).toContainText('US +1');

    await trigger.click();
    await type(page, 'fra');
    await page.getByRole('option', { name: /France/ }).click();
    await expect(trigger).toContainText('FR +33');
    expect(errors).toEqual([]);
  });
});
