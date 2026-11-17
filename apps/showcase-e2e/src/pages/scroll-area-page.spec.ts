import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Scroll Area Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/scroll-area');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/scroll-area');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part', async ({ page }) => {
    await page.goto('/docs/components/scroll-area');
    const table = page.getByRole('region', { name: 'Scroll Area parts' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'ScScrollArea',
      'ScScrollAreaViewport',
      'ScScrollAreaViewportContent',
      'ScScrollAreaScrollbar, ScScrollAreaThumb',
      'ScScrollAreaCorner',
    ]);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/scroll-area');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
