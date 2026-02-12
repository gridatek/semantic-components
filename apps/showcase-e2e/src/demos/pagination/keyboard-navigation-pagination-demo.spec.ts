import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation Pagination Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination/keyboard-navigation-pagination-demo');
  });

  test('should render pagination with First and Last buttons', async ({
    page,
  }) => {
    const firstBtn = page.locator('button[sc-pagination-first]');
    await expect(firstBtn).toBeVisible();
    await expect(firstBtn).toHaveAttribute('data-slot', 'pagination-first');

    const lastBtn = page.locator('button[sc-pagination-last]');
    await expect(lastBtn).toBeVisible();
    await expect(lastBtn).toHaveAttribute('data-slot', 'pagination-last');
  });

  test('should render all navigation buttons', async ({ page }) => {
    const firstBtn = page.getByRole('button', { name: 'First' });
    await expect(firstBtn).toBeVisible();

    const previousBtn = page.getByRole('button', { name: 'Previous' });
    await expect(previousBtn).toBeVisible();

    const nextBtn = page.getByRole('button', { name: 'Next' });
    await expect(nextBtn).toBeVisible();

    const lastBtn = page.getByRole('button', { name: 'Last' });
    await expect(lastBtn).toBeVisible();
  });

  test('should have aria-labels on navigation buttons', async ({ page }) => {
    const firstBtn = page.locator('button[sc-pagination-first]');
    await expect(firstBtn).toHaveAttribute('aria-label', 'Go to first page');

    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).toHaveAttribute(
      'aria-label',
      'Go to previous page',
    );

    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).toHaveAttribute('aria-label', 'Go to next page');

    const lastBtn = page.locator('button[sc-pagination-last]');
    await expect(lastBtn).toHaveAttribute('aria-label', 'Go to last page');
  });

  test('should disable First and Previous on first page', async ({ page }) => {
    const firstBtn = page.locator('button[sc-pagination-first]');
    await expect(firstBtn).toHaveAttribute('aria-disabled', 'true');

    const previousBtn = page.locator('button[sc-pagination-previous]');
    await expect(previousBtn).toHaveAttribute('aria-disabled', 'true');
  });

  test('should not disable Next and Last on first page', async ({ page }) => {
    const nextBtn = page.locator('button[sc-pagination-next]');
    await expect(nextBtn).not.toHaveAttribute('aria-disabled');

    const lastBtn = page.locator('button[sc-pagination-last]');
    await expect(lastBtn).not.toHaveAttribute('aria-disabled');
  });

  test('should navigate to last page via Last button', async ({ page }) => {
    const lastBtn = page.getByRole('button', { name: 'Last' });
    await lastBtn.click();

    // 250 items / 10 per page = 25 pages
    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/25/);
  });

  test('should disable Next and Last on last page', async ({ page }) => {
    const lastBtn = page.getByRole('button', { name: 'Last' });
    await lastBtn.click();

    const nextBtnDisabled = page.locator('button[sc-pagination-next]');
    await expect(nextBtnDisabled).toHaveAttribute('aria-disabled', 'true');

    const lastBtnDisabled = page.locator('button[sc-pagination-last]');
    await expect(lastBtnDisabled).toHaveAttribute('aria-disabled', 'true');
  });

  test('should navigate to first page via First button', async ({ page }) => {
    // Go to a different page first
    const nextBtn = page.getByRole('button', { name: 'Next' });
    await nextBtn.click();
    await nextBtn.click();

    const firstBtn = page.getByRole('button', { name: 'First' });
    await firstBtn.click();

    const activePage = page.locator(
      'button[sc-pagination-link][aria-current="page"]',
    );
    await expect(activePage).toHaveText(/1/);
  });

  test('should render page size selector', async ({ page }) => {
    const pageSizeSelector = page.locator(
      'select[sc-pagination-page-size-select]',
    );
    await expect(pageSizeSelector).toBeVisible();

    const select = page.locator('select[sc-pagination-page-size-select]');
    await expect(select).toBeVisible();
  });

  test('should display page info text', async ({ page }) => {
    const info = page.locator('text=Page 1 of 25 (250 items total)');
    await expect(info).toBeVisible();
  });

  // WebKit (Safari) does not focus <select> elements via Tab by default
  test('should navigate via keyboard Tab through controls', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === 'webkit',
      'WebKit does not Tab-focus select elements by default',
    );

    // Tab to the page size select first (it's before the pagination list)
    const select = page.locator('select[sc-pagination-page-size-select]');

    // Tab into the pagination area
    await page.keyboard.press('Tab');
    await expect(select).toBeFocused();
  });

  test('should activate page link via keyboard Enter', async ({ page }) => {
    // On page 1, First and Previous buttons are disabled (not focusable)
    // So tabbing goes directly to the first page link
    const firstPageLink = page.locator('button[sc-pagination-link]').first();

    // Focus on first page link (disabled buttons are skipped in tab order)
    await firstPageLink.focus();
    await expect(firstPageLink).toBeFocused();

    // Tab to next page link
    await page.keyboard.press('Tab');
    const secondPageLink = page.locator('button[sc-pagination-link]').nth(1);
    await expect(secondPageLink).toBeFocused();
  });

  test('should change page size via keyboard', async ({ page }) => {
    const select = page.locator('select[sc-pagination-page-size-select]');
    await select.focus();
    await select.selectOption('25');

    // 250 / 25 = 10 pages
    const info = page.locator('text=Page 1 of 10 (250 items total)');
    await expect(info).toBeVisible();
  });

  test('should render keyboard navigation instructions', async ({ page }) => {
    const heading = page.locator('text=Keyboard Navigation');
    await expect(heading).toBeVisible();

    const tabInstruction = page.locator('text=Move between controls');
    await expect(tabInstruction).toBeVisible();

    const enterInstruction = page.locator('text=Activate button');
    await expect(enterInstruction).toBeVisible();
  });

  test('should render page link aria-labels', async ({ page }) => {
    const pageLinks = page.locator('button[sc-pagination-link]');
    const count = await pageLinks.count();
    for (let i = 0; i < count; i++) {
      const ariaLabel = await pageLinks.nth(i).getAttribute('aria-label');
      if (ariaLabel) {
        expect(ariaLabel).toMatch(/Go to page \d+/);
      }
    }
  });
});
