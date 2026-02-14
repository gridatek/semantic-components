import { test, expect } from '@playwright/test';

test.describe('Basic Pagination Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination/basic-pagination-demo');
  });

  test('should render pagination navigation', async ({ page }) => {
    const nav = page.locator('nav[sc-pagination]');
    await expect(nav).toBeVisible();
    await expect(nav).toHaveAttribute('role', 'navigation');
    await expect(nav).toHaveAttribute('aria-label', 'pagination');
    await expect(nav).toHaveAttribute('data-slot', 'pagination');
  });

  test('should render pagination list', async ({ page }) => {
    const list = page.locator('ul[sc-pagination-list]');
    await expect(list).toBeVisible();
    await expect(list).toHaveAttribute('data-slot', 'pagination-list');
  });

  test('should render Previous and Next buttons', async ({ page }) => {
    const previousBtn = page.getByRole('button', { name: 'Previous' });
    await expect(previousBtn).toBeVisible();
    await expect(previousBtn).toHaveAttribute(
      'data-slot',
      'pagination-previous',
    );

    const nextBtn = page.getByRole('button', { name: 'Next' });
    await expect(nextBtn).toBeVisible();
    await expect(nextBtn).toHaveAttribute('data-slot', 'pagination-next');
  });

  test('should render page link buttons for 3 pages', async ({ page }) => {
    const pageLinks = page.locator('button[sc-pagination-link]');
    await expect(pageLinks).toHaveCount(3);

    await expect(pageLinks.nth(0)).toHaveText(/1/);
    await expect(pageLinks.nth(1)).toHaveText(/2/);
    await expect(pageLinks.nth(2)).toHaveText(/3/);
  });

  test('should have aria-current on the active page', async ({ page }) => {
    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveCount(1);
    await expect(activePage).toHaveText(/1/);
  });

  test('should apply outline variant to active page link', async ({ page }) => {
    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveClass(/border-border/);
  });

  test('should apply ghost variant to inactive page links', async ({
    page,
  }) => {
    const inactiveLinks = page.locator(
      'button[sc-pagination-link]:not([aria-current])',
    );
    const count = await inactiveLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(inactiveLinks.nth(i)).toHaveClass(/hover:bg-muted/);
    }
  });

  test('should disable Previous button on first page', async ({ page }) => {
    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).toHaveAttribute('aria-disabled', 'true');
  });

  test('should not disable Next button on first page', async ({ page }) => {
    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).not.toHaveAttribute('aria-disabled');
  });

  test('should navigate to next page when clicking Next', async ({ page }) => {
    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/2/);
  });

  test('should navigate to a specific page when clicking page link', async ({
    page,
  }) => {
    const page3Btn = page.locator('button[sc-pagination-link]').nth(2);
    await page3Btn.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/3/);
  });

  test('should disable Next button on last page', async ({ page }) => {
    const page3Btn = page.locator('button[sc-pagination-link]').nth(2);
    await page3Btn.click();

    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).toHaveAttribute('aria-disabled', 'true');
  });

  test('should enable Previous button after navigating away from first page', async ({
    page,
  }) => {
    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();

    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).not.toHaveAttribute('aria-disabled');
  });

  test('should render SVG icons in Previous and Next buttons', async ({
    page,
  }) => {
    const previousSvg = page
      .locator('button[sc-pagination-previous]')
      .locator('svg');
    await expect(previousSvg).toBeVisible();

    const nextSvg = page.locator('button[sc-pagination-next]').locator('svg');
    await expect(nextSvg).toBeVisible();
  });

  test('should have data-slot on pagination items', async ({ page }) => {
    const items = page.locator('li[sc-pagination-item]');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveAttribute(
        'data-slot',
        'pagination-item',
      );
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.keyboard.press('Tab');
    const firstPageLink = page.locator('button[sc-pagination-link]').first();
    await expect(firstPageLink).toBeFocused();
  });
});
