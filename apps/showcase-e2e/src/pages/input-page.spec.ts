import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Input Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/input');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/input');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every input, with its default', async ({ page }) => {
    await page.goto('/docs/components/input');
    const table = page.getByRole('region', { name: 'ScInput inputs' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'id',
      'aria-describedby',
      'disabled',
      'class',
    ]);
  });

  test('the page fits a phone, its table scrolling in its own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/input');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
