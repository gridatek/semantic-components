import { collectErrors } from '../../interaction';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { type Page, expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/password-field/${name}-password-field-demo`;
const password = (page: Page, name = 'Password') =>
  page.getByLabel(name, { exact: true });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Password Field: labelled, described, never spellchecked', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const input = password(page);
  await expect(input).toHaveAttribute('type', 'password');
  await expect(input).toHaveAttribute('autocomplete', 'current-password');
  await expect(input).toHaveAttribute('spellcheck', 'false');
  await expect(input).toHaveAttribute('autocapitalize', 'off');
  await expect(input).toHaveAccessibleDescription(
    'The one you signed up with.',
  );
});

test('Password Field: the toggle shows it, the caret stays', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const input = password(page);
  const toggle = page.getByRole('button', { name: 'Show password' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(toggle).toHaveAttribute(
    'aria-controls',
    (await input.getAttribute('id')) ?? '',
  );
  await input.fill('hunter22');
  await toggle.click();
  await expect(input).toHaveAttribute('type', 'text');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(input).toBeFocused();
  await page.keyboard.type('!');
  await expect(input).toHaveValue('hunter22!');
  // The keyboard reaches it too.
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(input).toHaveAttribute('type', 'password');
});

test('Shown: open at first, for a key password managers ignore', async ({
  page,
}) => {
  await page.goto(demo('visible'));
  const input = password(page, 'API key');
  await expect(input).toHaveAttribute('type', 'text');
  await expect(input).toHaveAttribute('data-1p-ignore', '');
  await expect(input).toHaveAttribute('data-lpignore', 'true');
  await page.getByRole('button', { name: 'Show key' }).click();
  await expect(page.getByText('Shown: false')).toBeVisible();
});

test('Disabled: the input and the toggle', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(password(page)).toBeDisabled();
  await expect(
    page.getByRole('button', { name: 'Show password' }),
  ).toBeDisabled();
});

test('Signal Forms: its errors, read with the input', async ({ page }) => {
  await page.goto(demo('form'));
  const input = password(page);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('alert')).toHaveText('Enter your password.');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(input).toHaveAccessibleDescription('Enter your password.');
  await input.fill('short');
  await expect(page.getByRole('alert')).toHaveText('Use 8 characters or more.');
  await input.fill('long enough');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Signed in.')).toBeVisible();
});

test('Caps Lock: the warning while it is on', async ({ page }) => {
  await page.goto(demo('caps-lock'));
  const input = password(page);
  const status = page.getByRole('status');
  await expect(status).toHaveText('');
  await input.focus();
  // A key pressed with Caps Lock on.
  await input.evaluate((element) =>
    element.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'A',
        modifierCapsLock: true,
        bubbles: true,
      } as KeyboardEventInit),
    ),
  );
  await expect(status).toHaveText('Caps Lock is on');
  await input.blur();
  await expect(status).toHaveText('');
});

test('Strength: a meter, its value in words', async ({ page }) => {
  await page.goto(demo('strength'));
  const input = password(page, 'New password');
  const meter = page.getByRole('meter', { name: 'Password strength' });
  await expect(meter).toHaveAttribute('aria-valuenow', '0');
  await input.fill('abc');
  await expect(meter).toHaveAttribute('aria-valuenow', '1');
  await expect(meter).toHaveAttribute('aria-valuetext', 'Weak');
  await input.fill('Abcdefghijk1!');
  await expect(meter).toHaveAttribute('aria-valuenow', '4');
  await expect(meter).toHaveAttribute('aria-valuetext', 'Strong');
});

test('Requirements: met or not, read with the input', async ({ page }) => {
  await page.goto(demo('requirements'));
  const input = password(page, 'New password');
  const rules = page.locator('[data-slot=password-requirement]');
  await input.fill('abcdefghijkL1');
  await expect(rules.nth(0)).toHaveAttribute('data-met');
  await expect(rules.nth(3)).not.toHaveAttribute('data-met');
  await expect(input).toHaveAccessibleDescription(/A symbol \(not met\)/);
});

test('Generate: a strong password, shown', async ({ page }) => {
  await page.goto(demo('generate'));
  const input = password(page, 'New password');
  await page.getByRole('button', { name: 'Generate' }).click();
  await expect(input).toHaveAttribute('type', 'text');
  const value = await input.inputValue();
  expect(value).toHaveLength(20);
  expect(value).toMatch(/[a-z]/);
  expect(value).toMatch(/[A-Z]/);
  expect(value).toMatch(/\d/);
  expect(value).toMatch(/[^A-Za-z0-9]/);
  await expect(
    page.getByRole('meter', { name: 'Password strength' }),
  ).toHaveAttribute('aria-valuenow', '4');
});

test('RTL: mirrored, the toggle at the start', async ({ page }) => {
  await page.goto(demo('rtl'));
  const input = password(page, 'كلمة المرور الجديدة');
  await expect(input).toBeVisible();
  await expectRtl(input);
  await expectInlineOrder([
    input,
    page.getByRole('button', { name: 'إظهار كلمة المرور' }),
  ]);
});
