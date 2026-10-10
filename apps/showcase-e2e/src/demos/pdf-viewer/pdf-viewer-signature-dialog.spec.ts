import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('PDF Viewer Signature Dialog', () => {
  test('tabs: one tab stop, arrows, linked panels', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/pdf-viewer/pdf-viewer-demo');
    await page.getByRole('button', { name: 'Signature' }).first().click();
    const tablist = page.getByRole('tablist', { name: 'Signature type' });
    await expect(tablist).toBeVisible();

    const tabs = tablist.getByRole('tab');
    await expect(tabs).toHaveText(['Type', 'Draw', 'Image']);
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(1)).toHaveAttribute('tabindex', '-1');

    await tabs.first().focus();
    await press(page, 'ArrowRight');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');

    const panelId = await tabs.nth(1).getAttribute('aria-controls');
    const panel = page.locator(`[id="${panelId}"]`);
    await expect(panel).toBeVisible();
    await expect(panel.locator('canvas')).toBeVisible();
    await expect(page.getByLabel('Thickness')).toBeVisible();
    expect(errors).toEqual([]);
  });
});
