import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Pagination Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/pagination');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/pagination');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: each part, its inputs', async ({ page }) => {
    await page.goto('/docs/components/pagination');
    for (const [part, inputs] of [
      ['ScPagination', ['totalItems', 'pageSize', 'currentPage', 'class']],
      ['ScPaginationLink', ['page', 'size', 'disabled', 'type', 'class']],
      [
        'ScPaginationPrevious, ScPaginationNext',
        ['variant', 'size', 'disabled', 'type', 'class'],
      ],
      ['ScPaginationStatus', ['class']],
    ] as const) {
      const table = page.getByRole('region', { name: `${part} inputs` });
      await expect(table.getByRole('row').locator('td:first-child')).toHaveText(
        [...inputs],
      );
    }
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/pagination');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
