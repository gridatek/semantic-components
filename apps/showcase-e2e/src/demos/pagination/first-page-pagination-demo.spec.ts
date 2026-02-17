import { test, expect } from '@playwright/test';

test.describe('First Page Pagination Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination/first-page-pagination-demo');
  });

  test('should render pagination starting on page 1', async ({ page }) => {
    const nav = page.locator('nav[scPagination]');
    await expect(nav).toBeVisible();

    const activePage = page.locator(
      'button[scPaginationLink][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/1/);
  });

  test('should have 10 total pages (100 items / 10 per page)', async ({
    page,
  }) => {
    // On page 1: [1, 2, 3, 4, 5, ..., 10]
    const pageLinks = page.locator('button[scPaginationLink]');
    await expect(pageLinks.last()).toHaveText(/10/);
  });

  test('should disable Previous button on first page', async ({ page }) => {
    const previousBtn = page.locator('button[scPaginationPrevious]');
    await expect(previousBtn).toHaveAttribute('aria-disabled', 'true');
    await expect(previousBtn).toHaveAttribute(
      'aria-label',
      'Go to previous page',
    );
  });

  test('should enable Next button on first page', async ({ page }) => {
    const nextBtn = page.locator('button[scPaginationNext]');
    await expect(nextBtn).not.toHaveAttribute('aria-disabled');
    await expect(nextBtn).toHaveAttribute('aria-label', 'Go to next page');
  });

  test('should show right ellipsis only on first page', async ({ page }) => {
    const ellipses = page.locator('span[scPaginationEllipsis]');
    await expect(ellipses).toHaveCount(1);
  });

  test('should navigate to page 2 via Next button', async ({ page }) => {
    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();

    const activePage = page.locator(
      'button[scPaginationLink][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/2/);
  });

  test('should enable Previous after navigating away from page 1', async ({
    page,
  }) => {
    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();

    const previousBtn = page.locator('button[scPaginationPrevious]');
    await expect(previousBtn).not.toHaveAttribute('aria-disabled');
  });

  test('should navigate back to page 1 via Previous', async ({ page }) => {
    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();

    const previousBtn = page.getByRole('button', { name: 'Previous' });
    await previousBtn.click();

    const activePage = page.locator(
      'button[scPaginationLink][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/1/);
  });

  test('should render page items in list items', async ({ page }) => {
    const items = page.locator('li[scPaginationItem]');
    const count = await items.count();
    // Previous + page links + ellipsis + Next = at least 4
    expect(count).toBeGreaterThanOrEqual(4);
  });
});
