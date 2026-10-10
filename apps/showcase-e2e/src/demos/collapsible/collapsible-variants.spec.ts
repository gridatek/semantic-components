import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Collapsible Demos', () => {
  test('open demo toggles with Space', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/collapsible/open-collapsible-demo');
    const trigger = page.locator('[aria-expanded]').first();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await trigger.focus();
    await press(page, 'Space');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await press(page, 'Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(errors).toEqual([]);
  });

  test('disabled demo does not open', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/collapsible/disabled-collapsible-demo');
    const trigger = page.locator('[aria-expanded]').first();
    await trigger.focus();
    await press(page, 'Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(errors).toEqual([]);
  });
});
