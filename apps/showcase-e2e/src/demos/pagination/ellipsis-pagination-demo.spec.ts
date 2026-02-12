import { test, expect } from '@playwright/test';

test.describe('Ellipsis Pagination Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination/ellipsis-pagination-demo');
  });

  test('should render pagination navigation', async ({ page }) => {
    const nav = page.locator('nav[sc-pagination]');
    await expect(nav).toBeVisible();
    await expect(nav).toHaveAttribute('role', 'navigation');
    await expect(nav).toHaveAttribute('aria-label', 'pagination');
  });

  test('should render exactly 7 page items when on first page', async ({
    page,
  }) => {
    // 10 pages total (100 items / 10 per page), starting at page 1
    // Pattern: [1, 2, 3, 4, 5, ..., 10]
    const pageLinks = page.locator('button[sc-pagination-link]');
    await expect(pageLinks).toHaveCount(6);

    const ellipses = page.locator('span[sc-pagination-ellipsis]');
    await expect(ellipses).toHaveCount(1);
  });

  test('should render ellipsis with aria-hidden', async ({ page }) => {
    const ellipsis = page.locator('span[sc-pagination-ellipsis]');
    await expect(ellipsis.first()).toHaveAttribute('aria-hidden', 'true');
    await expect(ellipsis.first()).toHaveAttribute(
      'data-slot',
      'pagination-ellipsis',
    );
  });

  test('should render ellipsis SVG icon', async ({ page }) => {
    const ellipsis = page.locator('span[sc-pagination-ellipsis]');
    const svg = ellipsis.first().locator('svg');
    await expect(svg).toBeVisible();
  });

  test('should have sr-only text in ellipsis for accessibility', async ({
    page,
  }) => {
    const srOnly = page
      .locator('span[sc-pagination-ellipsis]')
      .first()
      .locator('.sr-only');
    await expect(srOnly).toHaveText('More pages');
  });

  test('should show both ellipses when navigating to middle page', async ({
    page,
  }) => {
    // Navigate to page 5 (middle)
    const page2 = page.locator('button[sc-pagination-link]', {
      hasText: /^\s*2\s*$/,
    });
    await page2.click();

    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();
    await nextBtn.click();
    await nextBtn.click();

    // Now on page 5: [1, ..., 4, 5, 6, ..., 10]
    const ellipses = page.locator('span[sc-pagination-ellipsis]');
    await expect(ellipses).toHaveCount(2);
  });

  test('should show only left ellipsis when near end', async ({ page }) => {
    // Navigate to page 10 (last page)
    // Click through several times to get to the end
    const nextBtn = page.getByRole('button', { name: 'Next' });
    for (let i = 0; i < 9; i++) {
      await nextBtn.click();
    }

    // On page 10: [1, ..., 6, 7, 8, 9, 10]
    const ellipses = page.locator('span[sc-pagination-ellipsis]');
    await expect(ellipses).toHaveCount(1);

    // Verify last page is active
    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/10/);
  });

  test('should always show first and last page numbers', async ({ page }) => {
    const pageLinks = page.locator('button[sc-pagination-link]');
    await expect(pageLinks.first()).toHaveText(/1/);
    await expect(pageLinks.last()).toHaveText(/10/);
  });

  test('should update active page on click', async ({ page }) => {
    const page2 = page.locator('button[sc-pagination-link]', {
      hasText: /^\s*2\s*$/,
    });
    await page2.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/2/);
  });
});
