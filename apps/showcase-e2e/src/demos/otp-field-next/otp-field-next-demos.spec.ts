import { collectErrors, press, type } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/otp-field-next/${name}-otp-field-next-demo`;
const input = (page: import('@playwright/test').Page, n: number) =>
  n === 1
    ? page.getByRole('textbox', { name: 'One-time password' })
    : page.getByRole('textbox', { name: `Character ${n} of 6` });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: the label names the first input; it offers the SMS code', async ({
  page,
}) => {
  await page.goto('/demos/otp-field-next/otp-field-next-usage-demo');
  const first = page.getByRole('textbox', { name: 'Verification code' });
  await expect(first).toHaveValue('1');
  await expect(first).toHaveAttribute('autocomplete', 'one-time-code');
  await expect(
    page.getByRole('textbox', { name: 'Character 2 of 6' }),
  ).toHaveAttribute('autocomplete', 'off');
  await expect(page.locator('[data-slot=otp-field]')).toHaveAttribute(
    'data-complete',
    '',
  );
});

test('Controlled: typing fills in order; Backspace, Delete, Home, End', async ({
  page,
}) => {
  await page.goto(demo('controlled'));
  const said = page.getByText(/You entered|Enter your/);
  // Focus goes to the first empty input, whichever is clicked.
  await input(page, 4).click();
  await expect(input(page, 1)).toBeFocused();
  await type(page, '1234');
  await expect(said).toHaveText('You entered: 1234');
  await press(page, 'Backspace');
  await expect(said).toHaveText('You entered: 123');
  await press(page, 'Home');
  await expect(input(page, 1)).toBeFocused();
  await press(page, 'ArrowRight');
  await press(page, 'Delete');
  await expect(said).toHaveText('You entered: 13');
  await press(page, 'End');
  await expect(input(page, 3)).toBeFocused();
});

test('Digits only: letters dropped, digits of any script kept as ASCII', async ({
  page,
}) => {
  await page.goto(demo('digits-only'));
  const first = page.getByRole('textbox', { name: 'Digits Only' });
  await first.click();
  await type(page, 'a٣३');
  await expect(first).toHaveValue('3');
  await expect(
    page.getByRole('textbox', { name: 'Character 2 of 6' }),
  ).toHaveValue('3');
});

test('A code pasted or autofilled into the first input fills them all', async ({
  page,
}) => {
  await page.goto(demo('controlled'));
  await input(page, 1).evaluate((el: HTMLInputElement) => {
    el.value = '987654';
    el.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        inputType: 'insertReplacementText',
      }),
    );
  });
  await expect(page.getByText('You entered: 987654')).toBeVisible();
});

test('Custom normalization: uppercased', async ({ page }) => {
  await page.goto(demo('normalization'));
  await page.getByRole('textbox', { name: 'Invite code' }).click();
  await type(page, 'ab');
  await expect(page.getByRole('textbox', { name: 'Invite code' })).toHaveValue(
    'A',
  );
});

test('Masked entry: password inputs', async ({ page }) => {
  await page.goto(demo('masked'));
  await expect(
    page.locator('input[scOtpFieldNextInput]').first(),
  ).toHaveAttribute('type', 'password');
});

test('Invalid: marked once touched, its error shown', async ({ page }) => {
  await page.goto(demo('invalid'));
  await expect(
    page.getByRole('textbox', { name: 'Verification code' }),
  ).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter all 6 digits.')).toBeVisible();
});

test('Disabled: every input disabled', async ({ page }) => {
  await page.goto(demo('disabled'));
  for (const box of await page.locator('input[scOtpFieldNextInput]').all())
    await expect(box).toBeDisabled();
});

test('Verification: complete() once every input is filled', async ({
  page,
}) => {
  await page.goto(demo('verification'));
  await page.getByRole('textbox', { name: 'Enter verification code' }).click();
  await type(page, '123456');
  await expect(page.getByRole('status')).toHaveText('Verifying 123456…');
});

test('RTL: in a right-to-left section, ArrowLeft goes to the next input', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const first = page.getByRole('textbox', { name: 'رمز التحقق' });
  await first.click();
  await type(page, '123');
  await press(page, 'Home');
  await expect(first).toBeFocused();
  await press(page, 'ArrowLeft');
  await expect(
    page.getByRole('textbox', { name: 'الحرف 2 من 6' }),
  ).toBeFocused();
});
