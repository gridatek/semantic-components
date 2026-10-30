import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Button Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/button');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/button');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API: every input, with its type and default', async ({ page }) => {
    await page.goto('/docs/components/button');
    await expect(page.getByRole('heading', { name: 'API' })).toBeVisible();
    const table = page.getByRole('region', { name: 'ScButton inputs' });
    await expect(table.getByRole('row')).toHaveCount(6);
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'variant',
      'size',
      'type',
      'disabled',
      'class',
    ]);
    await expect(
      table.getByRole('row', { name: /^type/ }).locator('td').nth(2),
    ).toHaveText("'button'");
  });

  test('API: the table scrolls in its own box on a phone, not the page @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/button');
    await page.getByRole('heading', { name: 'API' }).scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
