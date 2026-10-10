import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Basic Org Chart Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/org-chart/basic-org-chart-demo');
    await expect(
      page.getByRole('tree', { name: 'Organization chart' }),
    ).toBeVisible();
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('real tree items with levels; one tab stop', async ({ page }) => {
    const items = page.getByRole('treeitem');
    expect(await items.count()).toBeGreaterThan(1);
    const root = items.first();
    await expect(root).toHaveAttribute('aria-level', '1');
    await expect(root).toHaveAttribute('aria-expanded', 'true');
    await expect(items.nth(1)).toHaveAttribute('aria-level', '2');
    await expect(items.nth(1)).toHaveAttribute('tabindex', '-1');

    await press(page, 'Tab');
    await expect(root).toBeFocused();
    await press(page, 'ArrowDown');
    await expect(items.nth(1)).toBeFocused();
  });

  test('ArrowLeft / click collapse and expand', async ({ page }) => {
    const root = page.getByRole('treeitem').first();
    // nothing reported on load; a user collapse is
    await expect(page.getByText(/^Selected:/)).toHaveCount(0);
    const before = await page.getByRole('treeitem').count();
    await root.focus();
    await press(page, 'Tab'); // ensure roving state is on the root
    await press(page, 'Shift+Tab');
    await press(page, 'ArrowLeft');
    await expect(root).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('treeitem')).toHaveCount(1);
    await expect(
      page.getByText('Selected: Sarah Johnson', { exact: false }),
    ).toBeVisible();

    await root.locator('[data-slot=org-chart-card]').first().click();
    await expect(root).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('treeitem')).toHaveCount(before);
  });
});

test.describe('Non-Collapsible Org Chart Demo', () => {
  test('stays expanded', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/org-chart/non-collapsible-org-chart-demo');
    const root = page.getByRole('treeitem').first();
    await root.locator('[data-slot=org-chart-card]').first().click();
    await press(page, 'ArrowLeft');
    await expect(root).toHaveAttribute('aria-expanded', 'true');
    expect(errors).toEqual([]);
  });
});
