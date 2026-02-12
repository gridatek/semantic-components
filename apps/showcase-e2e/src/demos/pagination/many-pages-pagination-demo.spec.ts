import { test, expect } from '@playwright/test';

test.describe('Many Pages Pagination Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination/many-pages-pagination-demo');
  });

  test('should render pagination navigation', async ({ page }) => {
    const nav = page.locator('nav[sc-pagination]');
    await expect(nav).toBeVisible();
    await expect(nav).toHaveAttribute('role', 'navigation');
  });

  test('should start on page 5 with both ellipses', async ({ page }) => {
    // 200 items / 10 per page = 20 pages, starting at page 5
    // Pattern: [1, ..., 4, 5, 6, ..., 20]
    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/5/);

    const ellipses = page.locator('span[sc-pagination-ellipsis]');
    await expect(ellipses).toHaveCount(2);
  });

  test('should always render exactly 7 total page slots', async ({ page }) => {
    // 7 slots = page links + ellipses
    const pageLinks = page.locator('button[sc-pagination-link]');
    const ellipses = page.locator('span[sc-pagination-ellipsis]');

    const pageCount = await pageLinks.count();
    const ellipsisCount = await ellipses.count();

    expect(pageCount + ellipsisCount).toBe(7);
  });

  test('should show first page (1) and last page (20)', async ({ page }) => {
    const pageLinks = page.locator('button[sc-pagination-link]');
    await expect(pageLinks.first()).toHaveText(/1/);
    await expect(pageLinks.last()).toHaveText(/20/);
  });

  test('should navigate forward and update active state', async ({ page }) => {
    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/6/);
  });

  test('should navigate backward and update active state', async ({ page }) => {
    const previousBtn = page.getByRole('button', { name: 'Previous' });
    await previousBtn.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/4/);
  });

  test('should show only right ellipsis near the start', async ({ page }) => {
    // Navigate to page 1
    const page1 = page.locator('button[sc-pagination-link]', {
      hasText: /^\s*1\s*$/,
    });
    await page1.click();

    // On page 1: [1, 2, 3, 4, 5, ..., 20]
    const ellipses = page.locator('span[sc-pagination-ellipsis]');
    await expect(ellipses).toHaveCount(1);
  });

  test('should show only left ellipsis near the end', async ({ page }) => {
    // Navigate to last page
    const lastPage = page.locator('button[sc-pagination-link]', {
      hasText: /^\s*20\s*$/,
    });
    await lastPage.click();

    // On page 20: [1, ..., 16, 17, 18, 19, 20]
    const ellipses = page.locator('span[sc-pagination-ellipsis]');
    await expect(ellipses).toHaveCount(1);
  });

  test('should disable Previous when on first page', async ({ page }) => {
    const page1 = page.locator('button[sc-pagination-link]', {
      hasText: /^\s*1\s*$/,
    });
    await page1.click();

    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).toHaveAttribute('aria-disabled', 'true');
  });

  test('should disable Next when on last page', async ({ page }) => {
    const lastPage = page.locator('button[sc-pagination-link]', {
      hasText: /^\s*20\s*$/,
    });
    await lastPage.click();

    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).toHaveAttribute('aria-disabled', 'true');
  });
});
