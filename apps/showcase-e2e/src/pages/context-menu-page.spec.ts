import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Context Menu Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/context-menu');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/context-menu');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part', async ({ page }) => {
    await page.goto('/docs/components/context-menu');
    const table = page.getByRole('region', { name: 'Context Menu parts' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'ScContextMenu',
      'ScContextMenuTrigger',
      'ScMenuPortal, ScMenu, ScMenuItem…',
    ]);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/context-menu');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
