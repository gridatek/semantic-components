import { expect, test } from '../../test';

const demo = (name: string) => `/demos/autocomplete-next/${name}`;

test.describe('Autocomplete Next demos', () => {
  test('usage: typing filters; arrows and Enter write the label', async ({
    page,
  }) => {
    await page.goto(demo('autocomplete-next-usage-demo'));
    const input = page.getByRole('combobox', { name: 'Country' });
    await expect(input).toHaveAttribute('aria-autocomplete', 'list');
    // A click doesn't open it (openOnInputClick off, as Base UI's).
    await input.click();
    await expect(page.getByRole('listbox')).toHaveCount(0);

    await input.pressSequentially('fr');
    await expect(page.getByRole('option')).toHaveText(['France']);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('France');
    await expect(page.getByRole('listbox')).toHaveCount(0);
    await expect(page.getByText('Value: “France”')).toBeVisible();
  });

  test('usage: free text stays, with no suggestion and after closing', async ({
    page,
  }) => {
    await page.goto(demo('autocomplete-next-usage-demo'));
    const input = page.getByRole('combobox', { name: 'Country' });
    await input.click();
    await input.pressSequentially('Atlantis');
    await expect(page.getByText('No country found.')).toBeVisible();
    await expect(page.getByText('Value: “Atlantis”')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('listbox')).toHaveCount(0);
    await expect(input).toHaveValue('Atlantis');
    await expect(page.getByText('Value: “Atlantis”')).toBeVisible();
  });

  test('usage: a click on a suggestion picks it', async ({ page }) => {
    await page.goto(demo('autocomplete-next-usage-demo'));
    const input = page.getByRole('combobox', { name: 'Country' });
    await input.click();
    await input.pressSequentially('ja');
    await page.getByRole('option', { name: 'Japan' }).click();
    await expect(input).toHaveValue('Japan');
    await expect(input).toBeFocused();
  });

  test('inline completion: the highlighted suggestion typed in, selected', async ({
    page,
  }) => {
    await page.goto(demo('inline-autocomplete-next-demo'));
    const input = page.getByRole('combobox', { name: 'Country' });
    await input.click();
    await input.pressSequentially('ge');
    await expect(input).toHaveValue(/^germany$/i);
    await expect(input).toHaveAttribute('aria-autocomplete', 'both');
    // The completed part is selected: typing on replaces it.
    await expect
      .poll(() =>
        input.evaluate((el: HTMLInputElement) =>
          el.value.slice(el.selectionStart ?? 0, el.selectionEnd ?? 0),
        ),
      )
      .toBe('rmany');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('Germany');
  });

  test('groups: suggestions under their labels', async ({ page }) => {
    await page.goto(demo('groups-autocomplete-next-demo'));
    const input = page.getByRole('combobox', { name: 'Food' });
    await input.click();
    await input.pressSequentially('ap');
    // Matches anywhere in a word: Grape too.
    await expect(page.getByRole('option')).toHaveText([
      'Apple',
      'Apricot',
      'Grape',
    ]);
    await expect(page.getByRole('group', { name: 'Fruits' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Vegetables' })).toHaveCount(
      0,
    );
  });

  test('async search: a status while searching, then the results', async ({
    page,
  }) => {
    await page.goto(demo('async-autocomplete-next-demo'));
    const input = page.getByRole('combobox', { name: 'City' });
    await input.click();
    await input.pressSequentially('ber');
    await expect(page.getByRole('option')).toHaveText(['Berlin']);
    await expect(page.locator('[scComboboxStatus]')).toHaveText('1 results');
  });

  test('auto highlight: Enter picks the first suggestion', async ({ page }) => {
    await page.goto(demo('auto-highlight-autocomplete-next-demo'));
    const input = page.getByRole('combobox', { name: 'Country' });
    await input.click();
    await input.pressSequentially('ita');
    await expect(page.getByRole('option')).toHaveText(['Italy']);
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('Italy');
  });

  test('limit: five suggestions, and how many there are', async ({ page }) => {
    await page.goto(demo('limit-autocomplete-next-demo'));
    const input = page.getByRole('combobox', { name: 'Country' });
    await input.click();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('option')).toHaveCount(5);
    await expect(
      page.getByText('5 of 20 — type more to narrow.'),
    ).toBeVisible();
    await input.pressSequentially('an');
    await expect(page.getByRole('option')).toHaveText([
      'Canada',
      'France',
      'Germany',
      'Japan',
      'Netherlands',
    ]);
  });

  test('form: required and maxLength from the schema, once touched', async ({
    page,
  }) => {
    await page.goto(demo('form-autocomplete-next-demo'));
    const input = page.getByRole('combobox', { name: 'Destination' });
    const errors = page.locator('[scFieldErrors]');
    await expect(input).toHaveAccessibleDescription(
      /Pick a country, or write your own\./,
    );
    await input.click();
    await input.blur();
    await expect(errors).toHaveText('Where are you going?');
    await expect(input).toHaveAttribute('aria-invalid', 'true');

    await input.fill('x'.repeat(41));
    await page.keyboard.press('Escape');
    await expect(errors).toHaveText('At most 40 characters.');

    await input.fill('');
    await input.pressSequentially('mor');
    await page.getByRole('option', { name: 'Morocco' }).click();
    await expect(errors).toBeEmpty();
    await expect(page.locator('pre')).toContainText('"destination": "Morocco"');
  });

  test('icon and clear: the clear button empties the text, focus back in', async ({
    page,
  }) => {
    await page.goto(demo('input-group-autocomplete-next-demo'));
    const input = page.getByRole('combobox', { name: 'Country' });
    await expect(input).toHaveValue('France');
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(input).toHaveValue('');
    await expect(input).toBeFocused();
    await expect(page.getByRole('button', { name: 'Clear' })).toBeHidden();
  });

  test('disabled: no focus, no text', async ({ page }) => {
    await page.goto(demo('disabled-autocomplete-next-demo'));
    const input = page.getByRole('combobox', { name: 'Country' });
    await expect(input).toBeDisabled();
    await expect(input).toHaveValue('Japan');
  });

  test('RTL: suggestions from the right; a pick writes the label', async ({
    page,
  }) => {
    await page.goto(demo('rtl-autocomplete-next-demo'));
    const input = page.getByRole('combobox', { name: 'المدينة' });
    await input.click();
    await input.pressSequentially('تو');
    await expect(page.getByRole('option')).toHaveText(['تونس']);
    await expect(page.getByRole('listbox')).toHaveCSS('direction', 'rtl');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('تونس');
  });
});
