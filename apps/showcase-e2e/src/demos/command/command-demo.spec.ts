import { expect, test } from '@playwright/test';
import { collectErrors, press, type } from '../../interaction';

test.describe('Command Demo', () => {
  test('filter, run with Enter (twice) and click', async ({ page }) => {
    const errors = collectErrors(page);
    const selected: string[] = [];
    page.on('console', (m) => {
      if (m.text().startsWith('Selected:')) selected.push(m.text());
    });
    await page.goto('/demos/command/command-demo');

    const input = page.locator('input[scCommandInput]');
    await expect(input).toHaveAttribute('role', 'combobox');
    await expect(page.locator('[scCommand]')).not.toHaveAttribute(
      'role',
      'combobox',
    );
    await press(page, 'Tab');
    await expect(input).toBeFocused();

    await type(page, 'bil');
    await expect(page.getByRole('option')).toHaveCount(1);
    await press(page, 'ArrowDown');
    await expect(page.getByRole('option', { name: /Billing/ })).toHaveAttribute(
      'data-active',
      'true',
    );
    await press(page, 'Enter');
    await expect.poll(() => selected).toEqual(['Selected: Billing']);
    await press(page, 'Enter');
    await expect.poll(() => selected.length).toBe(2);

    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.getByRole('option', { name: /Calculator/ }).click();
    await expect
      .poll(() => selected[selected.length - 1])
      .toBe('Selected: Calculator');
    expect(selected).toHaveLength(3);
    expect(errors).toEqual([]);
  });
});
