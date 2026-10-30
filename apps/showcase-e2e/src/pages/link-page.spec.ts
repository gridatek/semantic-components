import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Link Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/link');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/link');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every input, with its type and default', async ({
    page,
  }) => {
    await page.goto('/docs/components/link');
    await expect(
      page.getByRole('heading', { name: 'API reference' }),
    ).toBeVisible();
    const table = page.getByRole('region', { name: 'ScLink inputs' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'variant',
      'size',
      'disabled',
      'class',
    ]);
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto('/docs/components/link');
    await expectNoHorizontalScroll(page);
  });
});
