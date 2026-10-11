import { expect, test } from '@playwright/test';
import { collectErrors, press, type } from '../../interaction';

test.describe('Country Selector Phone Input Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/phone-input/country-selector-phone-input-demo');
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('picking a country updates the trigger', async ({ page }) => {
    const trigger = page.locator('[scComboboxTrigger]');
    await expect(trigger).toContainText('US +1');

    await trigger.click();
    await type(page, 'fra');
    await page.getByRole('option', { name: /France/ }).click();
    await expect(trigger).toContainText('FR +33');
  });

  test('formats as you type; the value is the full number', async ({
    page,
  }) => {
    const input = page.getByLabel('Phone number');
    await input.click();
    await type(page, '2015550123');
    await expect(input).toHaveValue('(201) 555-0123');
    await expect(page.getByText('Value: +12015550123')).toBeVisible();
  });

  test('Backspace after formatting removes a digit', async ({ page }) => {
    const input = page.getByLabel('Phone number');
    await input.click();
    await type(page, '201');
    await expect(input).toHaveValue('(201)');
    // Deleting the ")" alone would only have it formatted back.
    await press(page, 'Backspace');
    await expect(input).toHaveValue('20');
  });

  test('a number typed with + switches the country', async ({ page }) => {
    const input = page.getByLabel('Phone number');
    await input.click();
    await type(page, '+33612345678');
    await expect(page.locator('[scComboboxTrigger]')).toContainText('FR +33');
    await expect(page.getByText('Value: +33612345678')).toBeVisible();
  });

  test('an invalid number shows an error once touched', async ({ page }) => {
    const input = page.getByLabel('Phone number');
    await input.click();
    await type(page, '123');
    await press(page, 'Tab');
    await expect(page.getByText('Enter a valid phone number')).toBeVisible();
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
