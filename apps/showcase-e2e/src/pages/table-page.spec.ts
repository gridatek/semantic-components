import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Table Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/table');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/table');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part with its selector', async ({ page }) => {
    await page.goto('/docs/components/table');
    const parts = page.getByRole('region', { name: 'Table parts' });
    await expect(parts.getByRole('row').locator('td:first-child')).toHaveText([
      'ScTableContainer',
      'ScTable',
      'ScTableCaption',
      'ScTableHeader',
      'ScTableBody',
      'ScTableFooter',
      'ScTableRow',
      'ScTableHeaderCell',
      'ScTableCell',
    ]);
  });

  test('links to the Data Table', async ({ page }) => {
    await page.goto('/docs/components/table');
    // In the intro, not the sidebar's.
    await page
      .locator('app-table-page')
      .getByRole('link', { name: 'Data Table', exact: true })
      .click();
    await expect(page).toHaveURL(/\/docs\/components\/data-table$/);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/table');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
