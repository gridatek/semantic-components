import { test, expect } from '@playwright/test';

test.describe('Buttons Pagination Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination/buttons-pagination-demo');
  });

  test('should render pagination with button elements', async ({ page }) => {
    const nav = page.locator('nav[sc-pagination]');
    await expect(nav).toBeVisible();

    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).toBeVisible();

    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).toBeVisible();
  });

  test('should use button elements for page links', async ({ page }) => {
    const pageLinks = page.locator('button[sc-pagination-link]');
    const count = await pageLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const tagName = await pageLinks.nth(i).evaluate((el) => el.tagName);
      expect(tagName).toBe('BUTTON');
    }
  });

  test('should use button elements for Previous and Next', async ({ page }) => {
    const previousBtn = page.locator('button[sc-pagination-previous]');
    const tagName = await previousBtn.evaluate((el) => el.tagName);
    expect(tagName).toBe('BUTTON');

    const nextBtn = page.locator('button[sc-pagination-next]');
    const nextTagName = await nextBtn.evaluate((el) => el.tagName);
    expect(nextTagName).toBe('BUTTON');
  });

  test('should not have href attributes on buttons', async ({ page }) => {
    const pageLinks = page.locator('button[sc-pagination-link]');
    const count = await pageLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(pageLinks.nth(i)).not.toHaveAttribute('href');
    }
  });

  test('should have data-slot attributes', async ({ page }) => {
    const pageLinks = page.locator('button[sc-pagination-link]');
    const count = await pageLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(pageLinks.nth(i)).toHaveAttribute(
        'data-slot',
        'pagination-link',
      );
    }
  });

  test('should render 3 page links for 30 items with pageSize 10', async ({
    page,
  }) => {
    const pageLinks = page.locator('button[sc-pagination-link]');
    await expect(pageLinks).toHaveCount(3);
  });

  test('should navigate between pages using buttons', async ({ page }) => {
    const page2 = page.locator('button[sc-pagination-link]', {
      hasText: /^\s*2\s*$/,
    });
    await page2.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/2/);

    const page3 = page.locator('button[sc-pagination-link]', {
      hasText: /^\s*3\s*$/,
    });
    await page3.click();

    await expect(activePage).toHaveText(/3/);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab');
    const firstLink = page.locator('button[sc-pagination-link]').first();
    await expect(firstLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(firstLink).toHaveAttribute('aria-current', 'page');
  });
});
