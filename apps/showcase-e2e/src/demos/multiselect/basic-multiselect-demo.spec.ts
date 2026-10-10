import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Basic Multiselect Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/multiselect/basic-multiselect-demo');
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('keyboard toggles options and the popup stays open', async ({
    page,
  }) => {
    const trigger = page.locator('[scMultiselectTrigger]');
    const listbox = page.getByRole('listbox');
    const form = page.locator('pre');

    await expect(trigger).toHaveAttribute('role', 'combobox');
    await trigger.focus();
    await press(page, 'ArrowDown');
    await expect(listbox).toHaveAttribute('aria-multiselectable', 'true');

    await press(page, 'Enter'); // Important
    await press(page, 'ArrowDown');
    await press(page, 'ArrowDown');
    await press(page, 'Space'); // Work
    await expect(listbox).toBeVisible();
    await expect(trigger).toBeFocused();
    await expect(form).toContainText('"important"');
    await expect(form).toContainText('"work"');
    await expect(trigger).toContainText('Important + 1 more');

    await press(page, 'Home');
    await press(page, 'Enter'); // Important off
    await expect(form).not.toContainText('"important"');
    await expect(trigger).toContainText('Work');

    await press(page, 'Escape');
    await expect(listbox).toHaveCount(0);
  });

  test('mouse toggles; reopening keeps the selection', async ({ page }) => {
    const trigger = page.locator('[scMultiselectTrigger]');
    await trigger.click();
    await page.getByRole('option', { name: 'Travel' }).click();
    await page.getByRole('option', { name: 'Work' }).click();
    await expect(trigger).toContainText('Travel + 1 more');

    await page.mouse.click(5, 5);
    await expect(page.getByRole('listbox')).toHaveCount(0);
    await trigger.click();
    await expect(page.getByRole('option', { name: 'Travel' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });
});
