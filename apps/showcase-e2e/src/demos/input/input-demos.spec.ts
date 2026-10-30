import { collectErrors, press } from '../../interaction';
import { box, computed, openStill } from '../../looks';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/input/${name}-input-demo`;

let errors: string[];
let warnings: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
  warnings = [];
  page.on('console', (m) => {
    if (m.type() === 'warning') warnings.push(m.text());
  });
});

test.afterEach(() => {
  expect(errors).toEqual([]);
  // Every input has a name: none warns.
  expect(warnings.filter((w) => w.includes('has no name'))).toEqual([]);
});

test('Usage: in a field, named by its label', async ({ page }) => {
  await page.goto('/demos/input/input-usage-demo');
  const name = page.getByRole('textbox', { name: 'Name' });
  await expect(name).toHaveAttribute('placeholder', 'Jordan Lee');
  await name.fill('Jordan');
  await expect(name).toHaveValue('Jordan');
});

test('Basic: the preset’s look; Tab reaches it, its ring shows', async ({
  page,
}) => {
  await openStill(page, demo('basic'));
  const input = page.getByRole('textbox', { name: 'Text' });
  await expect(input).toHaveCSS('height', '32px');
  await expect(input).toHaveAttribute('data-slot', 'control');
  // The static build renders after the load: Tab once it's there.
  await expect(input).toBeVisible();
  await press(page, 'Tab');
  await expect(input).toBeFocused();
  await expect(input).not.toHaveCSS('box-shadow', 'none');
});

test('Field: the label points to it, the description describes it', async ({
  page,
}) => {
  await page.goto(demo('field'));
  const input = page.getByRole('textbox', { name: 'Username' });
  await expect(input).toHaveAccessibleDescription(
    'Choose a unique username for your account.',
  );
  // A click on the label focuses it.
  await page.getByText('Username', { exact: true }).click();
  await expect(input).toBeFocused();
});

test('Field Group: Submit sends the form, Reset empties it', async ({
  page,
}) => {
  await page.goto(demo('field-group'));
  const name = page.getByRole('textbox', { name: 'Name' });
  await name.fill('Jordan Lee');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('status')).toHaveText('Submitted: Jordan Lee');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(name).toHaveValue('');
  await expect(page.getByRole('status')).toHaveCount(0);
});

test('Disabled: disabled by the form, not focusable', async ({ page }) => {
  await page.goto(demo('disabled'));
  const input = page.getByRole('textbox', { name: 'Email' });
  await expect(input).toBeDisabled();
  await expect(input).toHaveCSS('opacity', '0.5');
  await page.locator('body').click({ position: { x: 1, y: 1 } });
  await press(page, 'Tab');
  await expect(input).not.toBeFocused();
});

test('Invalid: marked invalid once touched, the error read with it', async ({
  page,
}) => {
  await openStill(page, demo('invalid'));
  const input = page.getByRole('textbox', { name: 'Email' });
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(input).toHaveAccessibleDescription(
    'Enter a valid email address.',
  );
  const red = await computed(input, 'border-top-color');
  // Fixed, it is valid: the mark and the message go.
  await input.fill('jordan@example.com');
  await expect(input).not.toHaveAttribute('aria-invalid');
  await expect(page.getByText('Enter a valid email address.')).toHaveCount(0);
  expect(await computed(input, 'border-top-color')).not.toBe(red);
});

test('File: a file field, labelled, its button styled', async ({ page }) => {
  await page.goto(demo('file'));
  const input = page.getByLabel('Picture');
  await expect(input).toHaveAttribute('type', 'file');
  await input.setInputFiles({
    name: 'photo.png',
    mimeType: 'image/png',
    buffer: Buffer.from('89504e47', 'hex'),
  });
  expect(
    await input.evaluate((el: HTMLInputElement) => el.files?.[0]?.name),
  ).toBe('photo.png');
});

test('Inline: the input and its button on one line', async ({ page }) => {
  await page.goto(demo('inline'));
  const input = page.getByRole('searchbox', { name: 'Search' });
  const button = page.getByRole('button', { name: 'Search' });
  // Their middles level — read until the layout settles (fonts, the preset).
  const middle = async (target: typeof input) => {
    const found = await box(target);
    return found.y + found.height / 2;
  };
  await expect
    .poll(async () => Math.abs((await middle(input)) - (await middle(button))))
    .toBeLessThan(1);
});

test('Grid: two fields side by side', async ({ page }) => {
  await page.goto(demo('grid'));
  const first = page.getByRole('textbox', { name: 'First Name' });
  const last = page.getByRole('textbox', { name: 'Last Name' });
  const [a, b] = [await first.boundingBox(), await last.boundingBox()];
  expect(a?.y).toBe(b?.y);
  expect((a?.x ?? 0) < (b?.x ?? 0)).toBe(true);
});

test('Required: required by the form, its error once touched', async ({
  page,
}) => {
  await page.goto(demo('required'));
  const input = page.getByRole('textbox', { name: 'Required Field' });
  await expect(input).toHaveAttribute('required', '');
  await expect(input).not.toHaveAttribute('aria-invalid');
  await input.focus();
  await input.blur();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Fill this field out.')).toBeVisible();
});

test('Badge: a badge in the label, the input still named by it', async ({
  page,
}) => {
  await page.goto(demo('badge'));
  await expect(
    page.getByRole('textbox', { name: 'Webhook URL Beta' }),
  ).toHaveAttribute('type', 'url');
});

test('Input Group: the group draws the border, the input none', async ({
  page,
}) => {
  await page.goto(demo('input-group'));
  const input = page.getByRole('textbox', { name: 'Website URL' });
  await expect(input).toHaveCSS('border-top-width', '0px');
  await expect(page.getByText('https://')).toBeVisible();
});

test('Control Group: the input joined to its button', async ({ page }) => {
  await openStill(page, demo('control-group'));
  const input = page.getByRole('textbox', { name: 'Search' });
  await expect(input).toHaveCSS('border-top-right-radius', '0px');
  await expect(page.getByRole('button', { name: 'Search' })).toHaveCSS(
    'border-top-left-radius',
    '0px',
  );
});

test('Form: a required name, a valid email, a country; Submit, Cancel', async ({
  page,
}) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Enter your name.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Name' }).fill('Evil Rabbit');
  await page.getByRole('textbox', { name: 'Email' }).fill('rabbit@example.com');
  const country = page.getByRole('combobox', { name: 'Country' });
  await expect(country).toHaveText('United States');
  await country.click();
  await page.getByRole('option', { name: 'Morocco' }).click();
  await expect(country).toHaveText('Morocco');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('status')).toHaveText('Sent: Evil Rabbit');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('');
});

test('RTL: the fields from the right, the email typed left to right', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const name = page.getByRole('textbox', { name: 'الاسم' });
  await expectRtl(name);
  await expect(name).toHaveCSS('text-align', 'start');
  const mail = page.getByRole('textbox', { name: 'البريد الإلكتروني' });
  await expect(mail).toHaveCSS('direction', 'ltr');
  await expect(mail).toHaveAccessibleDescription(
    'سنرسل التحديثات إلى هذا العنوان.',
  );
});

test('On a phone: the demos fit, every target 24px @mobile', async ({
  page,
}) => {
  for (const name of ['field-group', 'inline', 'grid', 'form', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
});

test('On a phone: 16px text, so the page does not zoom on focus @mobile', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await expect(page.getByRole('textbox', { name: 'Text' })).toHaveCSS(
    'font-size',
    '16px',
  );
});
