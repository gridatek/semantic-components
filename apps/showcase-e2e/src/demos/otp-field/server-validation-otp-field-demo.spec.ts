import { collectErrors, type } from '../../interaction';
import { type Page, expect, test } from '../../test';

/** Types a code from the start, over whatever was there. */
async function enter(page: Page, code: string): Promise<void> {
  await page.getByRole('textbox', { name: 'Verification code' }).click();
  await type(page, code);
}

/** Leaves the field: it is touched, its errors show. */
async function leave(page: Page): Promise<void> {
  await page.locator('body').click({ position: { x: 5, y: 5 } });
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

    // A wrong code: once the field is left, the server's answer is the error.
    await enter(page, '111111');
    await expect(status).toHaveText('');
    await leave(page);
    await expect(message).toHaveText('That code is wrong.');
    await expect(first).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toHaveAttribute('data-invalid', 'true');

    // No answer: the error says so.
    await enter(page, '000000');
    await leave(page);
    await expect(message).toHaveText(
      "The code couldn't be checked. Try again.",
    );
    expect(errors).toEqual([]);
  });
});
