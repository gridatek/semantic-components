import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Simple Tree Demo', () => {
  test('multi-select with keyboard and mouse', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/tree/simple-tree-demo');
    await expect(page.getByRole('tree')).toBeVisible();
    const out = page.locator('.bg-muted');

    await expect(page.getByRole('tree')).toHaveAttribute(
      'aria-multiselectable',
      'true',
    );
    await expect(out).toContainText('Selected: apple');

    await press(page, 'Tab'); // the active item: apple
    await press(page, 'ArrowDown'); // banana
    await press(page, 'Space');
    await expect(out).toContainText('apple, banana');

    await page
      .locator('[data-slot=tree-item-trigger]')
      .filter({ hasText: 'Orange' })
      .click();
    await expect(out).toContainText('apple, banana, orange');
    await press(page, 'Space'); // toggle orange off
    await expect(out).toContainText('Selected: apple, banana');
    expect(errors).toEqual([]);
  });
});
