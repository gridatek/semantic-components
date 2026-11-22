import { collectErrors, press, type } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/phone-input-next/${name}-demo`;
const trigger = (page: Page) =>
  page.locator('[data-slot=combobox-trigger]').first();
const flag = (page: Page) => trigger(page).locator('img');
const value = (page: Page) => page.getByTestId('value');

/** Opens the picker, searches, and picks the first match. */
async function pick(page: Page, query: string, name: RegExp): Promise<void> {
  await trigger(page).click();
  await type(page, query);
  await page.getByRole('option', { name }).click();
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(({ page }) => page.goto(demo('phone-input-next-usage')));

  test('the picker: named, its dial code and flag; a country picked', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Country +1' }),
    ).toBeVisible();
    await expect(flag(page)).toHaveAttribute('src', '/flags/US.svg');
    await pick(page, 'fra', /France/);
    await expect(trigger(page)).toContainText('+33');
    await expect(flag(page)).toHaveAttribute('src', '/flags/FR.svg');
  });

  test('the search: a name (accents ignored), initials, a code, a dial code', async ({
    page,
  }) => {
    await trigger(page).click();
    const options = page.getByRole('option');
    const search = page.getByRole('combobox', { name: 'Search countries' });
    await search.fill('cote');
    await expect(options).toHaveText([/Côte d’Ivoire/]);
    await search.fill('+33');
    await expect(options).toHaveText([/France/]);
    await search.fill('49');
    await expect(options).toHaveText([/Germany/]);
    await search.fill('fr');
    await expect(options.filter({ hasText: 'France' })).toHaveCount(1);
    await search.fill('uk');
    await expect(options.filter({ hasText: 'United Kingdom' })).toHaveCount(1);
  });

  test('formats as you type; the value is the whole number', async ({
    page,
  }) => {
    const input = page.getByLabel('Phone number');
    await input.click();
    await type(page, '2015550123');
    await expect(input).toHaveValue('(201) 555-0123');
    await expect(value(page)).toHaveText('Value: +12015550123');
  });

  test('a number typed with + chooses its country', async ({ page }) => {
    const input = page.getByLabel('Phone number');
    await input.click();
    await type(page, '+442079460958');
    await expect(flag(page)).toHaveAttribute('src', '/flags/GB.svg');
    await expect(trigger(page)).toContainText('+44');
    await expect(value(page)).toHaveText('Value: +442079460958');
  });

  test('another country keeps the digits typed', async ({ page }) => {
    const input = page.getByLabel('Phone number');
    await input.click();
    await type(page, '612345678');
    await pick(page, 'fra', /France/);
    await expect(input).toHaveValue('6 12 34 56 78');
    await expect(value(page)).toHaveText('Value: +33612345678');
  });

  test('a typed space shows where the format puts one; Backspace over formatting removes a digit', async ({
    page,
  }) => {
    await pick(page, 'fra', /France/);
    const input = page.getByLabel('Phone number');
    await input.click();
    await type(page, '6 ');
    await expect(input).toHaveValue('6 ');
    await type(page, '66 00 65 94');
    await expect(input).toHaveValue('6 66 00 65 94');
    // A space where the format has none is dropped.
    await input.fill('');
    await type(page, '66 ');
    await expect(input).toHaveValue('6 6');

    await pick(page, 'united states', /United States/);
    await input.fill('');
    await input.click();
    await type(page, '201');
    await expect(input).toHaveValue('(201)');
    // Deleting the ")" alone would only have it formatted back.
    await press(page, 'Backspace');
    await expect(input).toHaveValue('20');
  });
});

test('Preferred: these first, then the rest by name', async ({ page }) => {
  await page.goto(demo('preferred-phone-input-next'));
  await trigger(page).click();
  const options = page.getByRole('option');
  await expect(options.nth(0)).toContainText('France');
  await expect(options.nth(1)).toContainText('Belgium');
  await expect(options.nth(2)).toContainText('Switzerland');
  await expect(options.nth(3)).toContainText('Afghanistan');
});

test('Only some countries: the list is those', async ({ page }) => {
  await page.goto(demo('only-phone-input-next'));
  await trigger(page).click();
  await expect(page.getByRole('option')).toHaveText([
    /Denmark/,
    /Finland/,
    /Iceland/,
    /Norway/,
    /Sweden/,
  ]);
});

test('Example placeholder: the country’s example, as written', async ({
  page,
}) => {
  await page.goto(demo('example-phone-input-next'));
  const input = page.getByLabel('Phone number');
  await expect(input).toHaveAttribute('placeholder', '7400 123456');
  await pick(page, 'fra', /France/);
  await expect(input).toHaveAttribute('placeholder', '6 12 34 56 78');
});

test('Form: required, then strict; saved once valid', async ({ page }) => {
  await page.goto(demo('form-phone-input-next'));
  const input = page.getByLabel('Phone number');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Enter your phone number.')).toBeVisible();
  await input.click();
  await type(page, '1234567890');
  await input.blur();
  await expect(page.getByText('Enter a valid phone number.')).toBeVisible();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await input.fill('');
  await type(page, '2015550123');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('status')).toHaveText('Saved +12015550123.');
});

test('Disabled and read-only: shown, not changed', async ({ page }) => {
  await page.goto(demo('disabled-phone-input-next'));
  const disabled = page.getByLabel('Disabled');
  await expect(disabled).toHaveValue('(415) 555-0123');
  await expect(disabled).toBeDisabled();
  const readOnly = page.getByLabel('Read-only');
  await expect(readOnly).toHaveValue('020 7946 0958');
  await expect(readOnly).toHaveAttribute('readonly', '');
});

test('RTL: names in Arabic; the number and dial code left to right', async ({
  page,
}) => {
  await page.goto(demo('rtl-phone-input-next'));
  const input = page.getByLabel('رقم الهاتف');
  await expect(input).toHaveAttribute('dir', 'ltr');
  await expect(trigger(page).locator('[dir=ltr]')).toHaveText('+20');
  await trigger(page).click();
  await expect(page.getByRole('option').filter({ hasText: 'مصر' })).toHaveCount(
    1,
  );
});
