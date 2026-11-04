import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Breadcrumb Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/breadcrumb');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/breadcrumb');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part with its selector', async ({ page }) => {
    await page.goto('/docs/components/breadcrumb');
    const parts = page.getByRole('region', { name: 'Breadcrumb parts' });
    await expect(parts.getByRole('row').locator('td:first-child')).toHaveText([
      'ScBreadcrumb',
      'ScBreadcrumbList',
      'ScBreadcrumbItem',
      'ScBreadcrumbLink',
      'ScBreadcrumbPage',
      'ScBreadcrumbSeparator',
      'ScBreadcrumbEllipsis',
    ]);
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto('/docs/components/breadcrumb');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
