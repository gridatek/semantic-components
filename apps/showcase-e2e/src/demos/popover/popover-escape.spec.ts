import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Popover', () => {
  test('opens again after Escape closed it', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/popover/basic-popover-demo');
    const trigger = page.getByRole('button', { name: 'Open popover' });
    const popover = page.getByRole('dialog');

    for (let i = 0; i < 2; i++) {
      await trigger.click();
      await expect(popover).toBeVisible();
      await press(page, 'Escape');
      await expect(popover).toHaveCount(0);
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    }
    expect(errors).toEqual([]);
  });

  test('gives focus back to its trigger when closed', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/popover/basic-popover-demo');
    const trigger = page.getByRole('button', { name: 'Open popover' });
    // By keyboard (WebKit doesn't focus a clicked button).
    await trigger.focus();
    await press(page, 'Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await press(page, 'Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(errors).toEqual([]);
  });
});
