import { collectErrors, type } from '../../interaction';
import { expect, test } from '../../test';

test.describe('OTP field', () => {
  test('Signal Forms: left incomplete, it is touched and shows its error', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/otp-field/signal-forms-otp-field-demo');
    const field = page.locator('[scOtpField]');
    const first = page.getByRole('textbox', { name: 'Digit 1 of 6' });
    await expect(field).toHaveAttribute('role', 'group');

    // From slot to slot: not touched yet.
    await first.click();
    await type(page, '123');
    await expect(page.locator('pre')).toContainText('"touched": false');

    // Leaving the field: touched, invalid, the message shown and described.
    await page.locator('body').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('pre')).toContainText('"touched": true');
    await expect(field).toHaveAttribute('data-invalid', 'true');
    await expect(page.getByRole('alert')).toHaveText('Enter all 6 digits.');
    await expect(first).toHaveAttribute('aria-invalid', 'true');
    await expect(first).toHaveAccessibleDescription('Enter all 6 digits.');

    // Completed: valid, no message.
    await page.getByRole('textbox', { name: 'Digit 4 of 6' }).click();
    await type(page, '456');
    await expect(page.locator('pre')).toContainText('"valid": true');
    await expect(field).not.toHaveAttribute('data-invalid');
    await expect(page.getByRole('alert')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
});
