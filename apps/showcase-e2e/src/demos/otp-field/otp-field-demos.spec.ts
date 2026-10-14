import { expect, test } from '@playwright/test';
import { collectErrors, press, type } from '../../interaction';

test.describe('OTP field', () => {
  test('typing fills in order, overwrites, and completes', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/otp-field/verification-otp-field-demo');
    // The label names the first input (it has the field's id).
    const first = page.getByRole('textbox', {
      name: 'Enter verification code',
    });
    const status = page.getByRole('status');
    await expect(first).toHaveAttribute('autocomplete', 'one-time-code');
    await expect(
      page.getByRole('textbox', { name: 'Digit 2 of 6' }),
    ).toHaveAttribute('autocomplete', 'off');

    // Focus goes to the first empty input, whichever is clicked.
    await page.getByRole('textbox', { name: 'Digit 4 of 6' }).click();
    await expect(first).toBeFocused();
    await type(page, '12345');
    await expect(
      page.getByRole('textbox', { name: 'Digit 6 of 6' }),
    ).toBeFocused();
    // Only digits.
    await type(page, 'x');
    await expect(status).toHaveText('Enter all 6 digits.');
    await type(page, '6');
    await expect(status).toHaveText('Verifying 123456…');

    // Typing over a filled input replaces its character.
    await page.getByRole('textbox', { name: 'Digit 2 of 6' }).click();
    await type(page, '9');
    await expect(status).toHaveText('Verifying 193456…');
    expect(errors).toEqual([]);
  });

  test('Backspace, Delete, arrows, Home and End', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/otp-field/basic-otp-field-demo');
    const input = (n: number) =>
      page.getByRole('textbox', { name: `Digit ${n} of 6` });
    const value = page.getByText(/^Value:/);
    await input(1).click();
    await type(page, '1234');
    await expect(value).toHaveText('Value: 1234');

    // On an empty input, Backspace clears the previous one.
    await press(page, 'Backspace');
    await expect(value).toHaveText('Value: 123');
    await expect(input(4)).toBeFocused();

    await press(page, 'Home');
    await expect(input(1)).toBeFocused();
    await press(page, 'ArrowRight');
    await expect(input(2)).toBeFocused();
    // Delete clears it; the ones after move back.
    await press(page, 'Delete');
    await expect(value).toHaveText('Value: 13');
    await press(page, 'End');
    await expect(input(3)).toBeFocused();
    expect(errors).toEqual([]);
  });

  test('a code autofilled into the first input fills them all', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/otp-field/basic-otp-field-demo');
    const first = page.getByRole('textbox', { name: 'Digit 1 of 6' });
    // What an SMS code autofill does: the whole code into one input.
    await first.evaluate((input: HTMLInputElement) => {
      input.value = '987654';
      input.dispatchEvent(
        new InputEvent('input', {
          bubbles: true,
          inputType: 'insertReplacementText',
        }),
      );
    });
    await expect(page.getByText(/^Value:/)).toHaveText('Value: 987654');
    await expect(first).toHaveValue('9');
    await expect(
      page.getByRole('textbox', { name: 'Digit 6 of 6' }),
    ).toHaveValue('4');
    expect(errors).toEqual([]);
  });
});
