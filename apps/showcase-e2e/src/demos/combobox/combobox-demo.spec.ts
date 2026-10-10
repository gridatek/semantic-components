import { expect, test } from '@playwright/test';
import {
  activeDescendantText,
  collectErrors,
  press,
  type,
} from '../../interaction';

test.describe('Combobox Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/combobox/combobox-demo');
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('opening moves focus to the search box; Enter picks', async ({
    page,
  }) => {
    const trigger = page.locator('[scComboboxTrigger]');
    const search = page.locator('input[scComboboxSearch]');
    const dialog = page.getByRole('dialog');

    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await trigger.focus();
    await press(page, 'ArrowDown');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleName('Country');
    await expect(search).toBeFocused();

    await type(page, 'ge');
    await expect(page.getByRole('option')).toHaveCount(2);
    await press(page, 'ArrowDown');
    await expect.poll(() => activeDescendantText(search)).not.toBeNull();
    const active = (await activeDescendantText(search)) as string;
    await press(page, 'Enter');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(trigger).toContainText(active);
  });

  test('search resets on open; Escape closes; filtering keeps it open', async ({
    page,
  }) => {
    const trigger = page.locator('[scComboboxTrigger]');
    const search = page.locator('input[scComboboxSearch]');
    const dialog = page.getByRole('dialog');

    await trigger.click();
    await page.getByRole('option', { name: 'Albania' }).click();
    await expect(trigger).toContainText('Albania');

    await trigger.click();
    await expect(search).toHaveValue('');
    await expect(page.getByRole('option', { name: 'Albania' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    // filtering the selected option out must not close the popup
    await type(page, 'fra');
    await expect(dialog).toBeVisible();
    await press(page, 'Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(trigger).toContainText('Albania');
  });

  test('clear button and click outside', async ({ page }) => {
    const trigger = page.locator('[scComboboxTrigger]');
    const clear = page.getByRole('button', { name: 'Clear selection' });
    await expect(clear).toBeHidden();

    await trigger.click();
    await page.getByRole('option', { name: 'Albania' }).click();
    await expect(clear).toBeVisible();
    await clear.click();
    await expect(trigger).toContainText('Select a country...');
    await expect(trigger).toBeFocused();

    await trigger.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.mouse.click(5, 5);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
