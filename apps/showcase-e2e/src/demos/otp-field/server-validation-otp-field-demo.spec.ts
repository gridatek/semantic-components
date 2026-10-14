import { type Page, expect, test } from '@playwright/test';
import { collectErrors, type } from '../../interaction';

/** Types a code from the start, over whatever was there. */
async function enter(page: Page, code: string): Promise<void> {
  const first = page.getByRole('textbox', { name: 'Verification code' });
  await first.click();
  await type(page, code);
}

test.describe('OTP field — validation with a server call', () => {
  test('pending while checked; right, wrong and unreachable', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/otp-field/server-validation-otp-field-demo');
    const field = page.locator('[data-slot=otp-field]');
    const status = page.getByRole('status');
    const message = page.getByRole('alert');
    const first = page.getByRole('textbox', { name: 'Verification code' });

    // Incomplete: no server call.
    await enter(page, '123');
    await expect(field).not.toHaveAttribute('data-pending');

    // Complete: checked by the server — pending, then verified.
    await type(page, '456');
    await expect(field).toHaveAttribute('data-pending', 'true');
    await expect(status).toHaveText('Checking…');
    await expect(status).toHaveText('Verified.');
    await expect(field).not.toHaveAttribute('data-pending');
    await expect(message).toHaveCount(0);

    // A wrong code: the server's answer is the error.
    await enter(page, '111111');
    await expect(message).toHaveText('That code is wrong.');
    await expect(first).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toHaveAttribute('data-invalid', 'true');

    // No answer: the error says so.
    await enter(page, '000000');
    await expect(message).toHaveText(
      "The code couldn't be checked. Try again.",
    );
    expect(errors).toEqual([]);
  });
});
