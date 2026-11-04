import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Backdrop Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/backdrop');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/backdrop');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: its input', async ({ page }) => {
    await page.goto('/docs/components/backdrop');
    const table = page.getByRole('region', { name: 'ScBackdrop inputs' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'class',
    ]);
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto('/docs/components/backdrop');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
