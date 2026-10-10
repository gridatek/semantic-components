import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Select Signal Forms Demo', () => {
  test('required, invalid once touched, valid after picking', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/select/select-signal-forms-demo');
    const trigger = page.locator('[scSelectTrigger]');

    await expect(trigger).toHaveAttribute('aria-required', 'true');
    await trigger.focus();
    await press(page, 'Tab');
    await expect(trigger).toHaveAttribute('aria-invalid', 'true');

    await trigger.click();
    await page.getByRole('option', { name: 'Mango' }).click();
    await expect(page.locator('pre')).toContainText('"fruit": "Mango"');
    await expect(trigger).not.toHaveAttribute('aria-invalid', 'true');
    expect(errors).toEqual([]);
  });
});
