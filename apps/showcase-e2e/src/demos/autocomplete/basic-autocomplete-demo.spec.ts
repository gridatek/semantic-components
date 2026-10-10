import { expect, test } from '@playwright/test';
import {
  activeDescendantText,
  collectErrors,
  press,
  type,
} from '../../interaction';

test.describe('Basic Autocomplete Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/autocomplete/basic-autocomplete-demo');
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('typing filters; arrows + Enter write the label', async ({ page }) => {
    const input = page.locator('input[scAutocompleteInput]');
    await expect(input).toHaveAttribute('role', 'combobox');
    await expect(input).toHaveAttribute('aria-autocomplete', 'list');

    await input.click();
    await type(page, 'fr');
    await expect(page.getByRole('option')).toHaveText(['France']);
    await press(page, 'ArrowDown');
    await expect.poll(() => activeDescendantText(input)).toBe('France');
    await expect(input).toBeFocused();
    await press(page, 'Enter');
    await expect(input).toHaveValue('France');
    await expect(page.getByRole('listbox')).toHaveCount(0);
  });

  test('click picks; Escape keeps the text; empty state', async ({ page }) => {
    const input = page.locator('input[scAutocompleteInput]');
    await input.click();
    await type(page, 'ge');
    await page.getByRole('option', { name: 'Germany' }).click();
    await expect(input).toHaveValue('Germany');
    await expect(input).toBeFocused();

    await press(page, 'ArrowDown');
    await expect(page.getByRole('option', { name: 'Germany' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await press(page, 'Escape');
    await expect(page.getByRole('listbox')).toHaveCount(0);
    await expect(input).toHaveValue('Germany');

    await page.keyboard.press('Control+A');
    await type(page, 'zzz');
    await expect(page.getByText('No results found')).toBeVisible();
  });

  test('clear button', async ({ page }) => {
    const input = page.locator('input[scAutocompleteInput]');
    const clear = page.getByRole('button', { name: 'Clear' });
    await expect(clear).toBeHidden();
    await input.click();
    await type(page, 'fr');
    await expect(clear).toBeVisible();
    await clear.click();
    await expect(input).toHaveValue('');
    await expect(input).toBeFocused();
    await expect(clear).toBeHidden();
  });
});
