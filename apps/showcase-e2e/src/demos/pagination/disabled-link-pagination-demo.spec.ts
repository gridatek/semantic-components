import { test, expect } from '@playwright/test';

test.describe('Disabled Link Pagination Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination/disabled-link-pagination-demo');
  });

  test('should render pagination with anchor elements', async ({ page }) => {
    const nav = page.locator('nav[sc-pagination]');
    await expect(nav).toBeVisible();
  });

  test('should use anchor elements for page links', async ({ page }) => {
    const pageLinks = page.locator('a[sc-pagination-link]');
    const count = await pageLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const tagName = await pageLinks.nth(i).evaluate((el) => el.tagName);
      expect(tagName).toBe('A');
    }
  });

  test('should use anchor elements for Previous and Next', async ({ page }) => {
    const previousLink = page.locator('a[sc-pagination-previous]');
    const tagName = await previousLink.evaluate((el) => el.tagName);
    expect(tagName).toBe('A');

    const nextLink = page.locator('a[sc-pagination-next]');
    const nextTagName = await nextLink.evaluate((el) => el.tagName);
    expect(nextTagName).toBe('A');
  });

  test('should have href attributes on anchor links', async ({ page }) => {
    const pageLinks = page.locator('a[sc-pagination-link]');
    const count = await pageLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(pageLinks.nth(i)).toHaveAttribute('href', '#');
    }
  });

  test('should have data-slot attributes on page links', async ({ page }) => {
    const pageLinks = page.locator('a[sc-pagination-link]');
    const count = await pageLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(pageLinks.nth(i)).toHaveAttribute(
        'data-slot',
        'pagination-link',
      );
    }
  });

  test('should disable Previous on first page with aria-disabled', async ({
    page,
  }) => {
    const previousLink = page.locator('a[sc-pagination-previous]');
    await expect(previousLink).toHaveAttribute('aria-disabled', 'true');
  });

  test('should have href on Previous link even when disabled', async ({
    page,
  }) => {
    const previousLink = page.locator('a[sc-pagination-previous]');
    await expect(previousLink).toHaveAttribute('href', '#');
  });

  test('should not disable Next link on first page', async ({ page }) => {
    const nextLink = page.locator('a[sc-pagination-next]');
    await expect(nextLink).not.toHaveAttribute('aria-disabled');
  });

  test('should have aria-current on active page link', async ({ page }) => {
    const activePage = page.locator(
      'a[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveCount(1);
    await expect(activePage).toHaveText(/1/);
  });

  test('should navigate to page via anchor click', async ({ page }) => {
    const page2 = page.locator('a[sc-pagination-link]', {
      hasText: /^\s*2\s*$/,
    });
    await page2.click();

    const activePage = page.locator(
      'a[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/2/);
  });

  test('should disable Next link on last page', async ({ page }) => {
    const page3 = page.locator('a[sc-pagination-link]', {
      hasText: /^\s*3\s*$/,
    });
    await page3.click();

    const nextLink = page.locator('a[sc-pagination-next]');
    await expect(nextLink).toHaveAttribute('aria-disabled', 'true');
  });

  test('should have data-slot on Previous and Next', async ({ page }) => {
    const previousLink = page.locator('a[sc-pagination-previous]');
    await expect(previousLink).toHaveAttribute(
      'data-slot',
      'pagination-previous',
    );

    const nextLink = page.locator('a[sc-pagination-next]');
    await expect(nextLink).toHaveAttribute('data-slot', 'pagination-next');
  });
});
