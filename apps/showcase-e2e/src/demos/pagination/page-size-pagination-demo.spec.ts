import { test, expect } from '@playwright/test';

test.describe('Page Size Pagination Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination/page-size-pagination-demo');
  });

  test('should render pagination with page size selector', async ({ page }) => {
    const nav = page.locator('nav[sc-pagination]');
    await expect(nav).toBeVisible();

    const pageSizeSelector = page.locator(
      'select[sc-pagination-page-size-select]',
    );
    await expect(pageSizeSelector).toBeVisible();
  });

  test('should render page size select element', async ({ page }) => {
    const select = page.locator('select[sc-pagination-page-size-select]');
    await expect(select).toBeVisible();
  });

  test('should have all page size options', async ({ page }) => {
    const options = page.locator(
      'select[sc-pagination-page-size-select] option',
    );
    await expect(options).toHaveCount(4);
    await expect(options.nth(0)).toHaveText('10');
    await expect(options.nth(1)).toHaveText('25');
    await expect(options.nth(2)).toHaveText('50');
    await expect(options.nth(3)).toHaveText('100');
  });

  test('should default to page size 10', async ({ page }) => {
    const select = page.locator('select[sc-pagination-page-size-select]');
    await expect(select).toHaveValue('10');
  });

  test('should display page info text', async ({ page }) => {
    const info = page.locator('text=Page 1 of 25 (250 items total)');
    await expect(info).toBeVisible();
  });

  test('should display items per page label', async ({ page }) => {
    const label = page.locator('text=Items per page:');
    await expect(label).toBeVisible();
  });

  test('should change page size and reset to page 1', async ({ page }) => {
    // Navigate to page 2 first
    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();

    // Change page size to 25
    const select = page.locator('select[sc-pagination-page-size-select]');
    await select.selectOption('25');

    // Should reset to page 1
    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/1/);

    // Total pages should update: 250 / 25 = 10
    const info = page.locator('text=Page 1 of 10 (250 items total)');
    await expect(info).toBeVisible();
  });

  test('should update total pages when changing page size to 50', async ({
    page,
  }) => {
    const select = page.locator('select[sc-pagination-page-size-select]');
    await select.selectOption('50');

    // 250 / 50 = 5 pages
    const info = page.locator('text=Page 1 of 5 (250 items total)');
    await expect(info).toBeVisible();
  });

  test('should update total pages when changing page size to 100', async ({
    page,
  }) => {
    const select = page.locator('select[sc-pagination-page-size-select]');
    await select.selectOption('100');

    // 250 / 100 = 3 pages
    const info = page.locator('text=Page 1 of 3 (250 items total)');
    await expect(info).toBeVisible();
  });

  test('should have data-slot on page size component', async ({ page }) => {
    const pageSizeSelector = page.locator(
      'select[sc-pagination-page-size-select]',
    );
    await expect(pageSizeSelector).toHaveAttribute(
      'data-slot',
      'pagination-page-size-select',
    );
  });

  test('should render Previous and Next with page size selector', async ({
    page,
  }) => {
    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).toBeVisible();

    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).toBeVisible();
  });
});
