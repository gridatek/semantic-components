import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Badge Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/badge');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/badge');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: its inputs', async ({ page }) => {
    await page.goto('/docs/components/badge');
    const table = page.getByRole('region', { name: 'ScBadge inputs' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'variant',
      'class',
    ]);
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto('/docs/components/badge');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
