import { type Page, expect, test } from '../../test';

const chips = (page: Page) => page.locator('[scComboboxChip]');
/** The chips, by their remove buttons: one each, named for it. */
const removes = (page: Page) => page.getByRole('button', { name: /^Remove / });
const option = (page: Page, name: string) =>
  page.getByRole('option', { name, exact: true });

test('Usage: options checked into chips, unchecked out; a search narrows the list', async ({
  page,
}) => {
  await page.goto('/demos/multiselect/multiselect-usage-demo');
  await expect(removes(page)).toHaveText(['Remove Bug']);
  const input = page.getByRole('combobox', { name: 'Labels' });
  await input.click();
  await expect(page.getByRole('listbox', { name: 'Labels' })).toBeVisible();
  await expect(option(page, 'Bug')).toHaveAttribute('aria-selected', 'true');

  await option(page, 'Feature').click();
  await expect(removes(page)).toHaveText(['Remove Bug', 'Remove Feature']);
  // The list stays open: the next one checked, Bug unchecked.
  await option(page, 'Bug').click();
  await expect(removes(page)).toHaveText(['Remove Feature']);

  await input.fill('des');
  await expect(page.getByRole('option')).toHaveText(['Design']);

  await page.getByRole('button', { name: 'Remove Feature' }).click();
  await expect(chips(page)).toHaveCount(0);
});

test('Form: one at least, three at most — the field says so', async ({
  page,
}) => {
  await page.goto('/demos/multiselect/form-multiselect-demo');
  const input = page.getByRole('combobox', { name: 'Reviewers' });
  await expect(input).toBeVisible();
  await input.focus();
  await input.blur();
  await expect(page.getByText('Pick one reviewer at least.')).toBeVisible();

  await input.click();
  for (const name of ['Ada', 'Grace', 'Linus', 'Margaret']) {
    await option(page, name).click();
  }
  await expect(chips(page)).toHaveCount(4);
  await expect(page.getByText('Three reviewers at most.')).toBeVisible();
  await page.getByRole('button', { name: 'Remove Margaret' }).click();
  await expect(page.getByText('Three reviewers at most.')).toHaveCount(0);
});

test('Select all: your buttons set the value, the count follows', async ({
  page,
}) => {
  await page.goto('/demos/multiselect/select-all-multiselect-demo');
  await expect(page.getByText('0 of 6 chosen')).toBeVisible();
  await page.getByRole('button', { name: 'Select all' }).click();
  await expect(chips(page)).toHaveCount(6);
  await expect(page.getByText('6 of 6 chosen')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Select all' })).toBeDisabled();
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(chips(page)).toHaveCount(0);
});

test('RTL: named and removed in Arabic', async ({ page }) => {
  await page.goto('/demos/multiselect/rtl-multiselect-demo');
  await expect(page.locator('[scComboboxChipRemove]')).toHaveText([
    'إزالة خطأ',
  ]);
  await expect(page.getByRole('combobox', { name: 'التصنيفات' })).toBeVisible();
  await page.getByRole('button', { name: 'إزالة خطأ' }).click();
  await expect(chips(page)).toHaveCount(0);
});
