import { expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

test.describe('Navigation Tree Demo', () => {
  test('nav mode marks the current page with aria-current', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/tree/navigation-tree-demo');
    const current = page.locator('[role=treeitem][aria-current=page]');

    await expect(current).toHaveCount(1);
    await expect(current).toContainText('Installation');

    await page
      .locator('[data-slot=tree-item-trigger]')
      .filter({ hasText: 'Configuration' })
      .click();
    await expect(page.getByText('Current page: configuration')).toBeVisible();
    await expect(current).toHaveCount(1);
    await expect(current).toContainText('Configuration');
    expect(errors).toEqual([]);
  });
});
