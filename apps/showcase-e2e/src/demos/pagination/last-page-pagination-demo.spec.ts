import { test, expect } from '@playwright/test';

test.describe('Last Page Pagination Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination/last-page-pagination-demo');
  });

  test('should render pagination starting on page 10', async ({ page }) => {
    const nav = page.locator('nav[sc-pagination]');
    await expect(nav).toBeVisible();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/10/);
  });

  test('should disable Next button on last page', async ({ page }) => {
    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).toHaveAttribute('aria-disabled', 'true');
  });

  test('should enable Previous button on last page', async ({ page }) => {
    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).not.toHaveAttribute('aria-disabled');
  });

  test('should show left ellipsis only on last page', async ({ page }) => {
    // On page 10: [1, ..., 6, 7, 8, 9, 10]
    const ellipses = page.locator('span[sc-pagination-ellipsis]');
    await expect(ellipses).toHaveCount(1);
  });

  test('should always show page 1 and page 10', async ({ page }) => {
    const pageLinks = page.locator('button[sc-pagination-link]');
    await expect(pageLinks.first()).toHaveText(/1/);
    await expect(pageLinks.last()).toHaveText(/10/);
  });

  test('should navigate to previous page', async ({ page }) => {
    const previousBtn = page.getByRole('button', { name: 'Previous' });
    await previousBtn.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/9/);
  });

  test('should enable Next after navigating away from last page', async ({
    page,
  }) => {
    const previousBtn = page.getByRole('button', { name: 'Previous' });
    await previousBtn.click();

    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).not.toHaveAttribute('aria-disabled');
  });

  test('should navigate back to last page via Next', async ({ page }) => {
    const previousBtn = page.getByRole('button', { name: 'Previous' });
    await previousBtn.click();

    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/10/);
  });

  test('should navigate to page 1 by clicking the first page link', async ({
    page,
  }) => {
    const page1 = page.locator('button[sc-pagination-link]').first();
    await page1.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/1/);

    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).toHaveAttribute('aria-disabled', 'true');
  });

  test('should have proper aria labels on nav buttons', async ({ page }) => {
    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).toHaveAttribute(
      'aria-label',
      'Go to previous page',
    );

    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).toHaveAttribute('aria-label', 'Go to next page');
  });
});
