import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Aspect Ratio Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/aspect-ratio');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/aspect-ratio');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: its inputs', async ({ page }) => {
    await page.goto('/docs/components/aspect-ratio');
    const table = page.getByRole('region', { name: 'ScAspectRatio inputs' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'ratio',
      'class',
    ]);
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto('/docs/components/aspect-ratio');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
